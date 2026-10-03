import * as NodeRtm from "@effect/platform-node/NodeRuntime";
import * as NodeSrv from "@effect/platform-node/NodeServices";
import ansis from "ansis";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { DOMAIN_METAS, PLUGIN_DOMAINS, type PluginDomain, buildRuleFileName, parseRuleFileName } from "./00-constants";
import { glob } from "./01-helpers";

// Collect .mdx files from every sub-plugin's rules directory
const DOCS_GLOB = ["plugins/eslint-plugin-react-*/src/rules/*/*.mdx"];
const RULE_RELATIONS_PATH = "docs/rule-relations-table.md";
// Captures the table body (rows) from the "## Detailed References" section
const RE_DETAILED_REFERENCES = /## Detailed References[\s\S]*?\n\|[^\n]+\|\n\|[-\s|]+\|\n([\s\S]*?)(?=\n##|$)/u;

interface RuleMeta {
  name: string;
  title: string;
  destination: string;
  source: string;
}

interface RuleReference {
  description: string;
  targetRule: string;
}

type RuleRelationsMap = Map<string, RuleReference[]>;

function parseRuleRelations(content: string): RuleRelationsMap {
  const relations: RuleRelationsMap = new Map();
  const match = RE_DETAILED_REFERENCES.exec(content);
  if (match?.[1] == null) return relations;

  const tableBody = match[1];
  const rows = tableBody.split("\n").filter((line) => line.trim().startsWith("|"));

  for (const row of rows) {
    const cells = row.split("|").map((cell) => cell.trim()).filter(Boolean);
    const [rawSource, rawTarget, rawDesc] = cells;
    if (rawSource == null || rawTarget == null || rawDesc == null) continue;

    const sourceRule = rawSource.replace(/`/g, "").trim();
    const targetRule = rawTarget.replace(/`/g, "").trim();
    const description = rawDesc.trim();

    if (sourceRule == null || targetRule == null) continue;

    const refs = relations.get(sourceRule) ?? [];
    refs.push({ description, targetRule });
    relations.set(sourceRule, refs);
  }

  return relations;
}

const loadRuleRelations = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const content = yield* fs.readFileString(RULE_RELATIONS_PATH, "utf8");
  return parseRuleRelations(content);
});

// Convert a file-based rule name ("dom-no-render") to the canonical
// "react-<domain>/<name>" form used in rule-relations-table.md.
const getFullRuleName = (meta: RuleMeta): string => {
  const parsed = parseRuleFileName(meta.name);
  if (parsed == null) return `react-x/${meta.name}`;
  return `react-${parsed.domain}/${parsed.ruleName}`;
};

const generateSeeAlsoSection = (meta: RuleMeta, relations: RuleRelationsMap) => {
  const fullRuleName = getFullRuleName(meta);
  const references = relations.get(fullRuleName);

  if (references == null || references.length === 0) {
    return "";
  }

  // Convert canonical rule names to website file names for the link target.
  const items = references.map((ref) => {
    const [targetPlugin = "", targetName = ""] = ref.targetRule.split("/");
    const domain = targetPlugin.replace("react-", "");
    const targetFileName = PLUGIN_DOMAINS.includes(domain as PluginDomain)
      ? buildRuleFileName(domain as PluginDomain, targetName)
      : ref.targetRule.replace("react-", "");
    return [`- [\`${ref.targetRule}\`](./${targetFileName})\\`, `  ${ref.description}.`].join("\n");
  });

  return ["", "---", "", "## See Also", "", ...items, ""].join("\n");
};

// Determines the section order in the generated meta.json.
// Headings act as section dividers in the website sidebar.
const orderedCategories = DOMAIN_METAS.map((meta) => ({
  key: meta.key,
  heading: `---${meta.heading}---`,
})) as { key: PluginDomain; heading: string }[];

const collectDocs = Effect.gen(function*() {
  const path = yield* Path.Path;
  const docs = yield* Effect.sync(() => glob(DOCS_GLOB));
  return docs.map<RuleMeta>((doc) => {
    const catename = /^plugins\/eslint-plugin-react-([^/]+)/u.exec(doc)?.[1] ?? "";
    const basename = path.parse(path.basename(doc)).name;
    const domain = (PLUGIN_DOMAINS.includes(catename as PluginDomain) ? catename : "x") as PluginDomain;

    const name = buildRuleFileName(domain, basename);
    const title = domain === "x" ? basename : `${domain}/${basename}`;

    const destination = path.join("apps", "website", "content", "docs", "rules", `${name}.mdx`);

    return {
      name,
      title,
      destination,
      source: doc,
    };
  });
});

const copyRuleDoc = Effect.fnUntraced(
  function*(meta: RuleMeta, relations: RuleRelationsMap) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const dir = path.dirname(meta.destination);
    yield* fs.makeDirectory(dir, { recursive: true });
    const content = yield* fs.readFileString(meta.source, "utf8");

    const contentWithSeeAlsoSection = content + generateSeeAlsoSection(meta, relations);
    yield* fs.writeFileString(meta.destination, contentWithSeeAlsoSection);
    yield* Effect.logDebug(ansis.green(`Copied ${meta.source} -> ${meta.destination}`));
    return meta;
  },
);

const generateRuleMetaJson = Effect.fnUntraced(
  function*(metas: RuleMeta[]) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const targetPath = path.join("apps", "website", "content", "docs", "rules", "meta.json");
    interface Grouped {
      readonly [k: string]: readonly string[];
    }

    const grouped = metas.reduce<Grouped>((acc, meta) => {
      const catename = meta.title.includes("/") ? meta.title.split("/", 1)[0] : "x";
      if (catename == null || catename === "") return acc;
      const list = acc[catename] ?? [];
      return {
        ...acc,
        [catename]: [...list, meta.name],
      };
    }, {});

    const pages = orderedCategories.reduce<string[]>((acc, cat) => {
      const rules = grouped[cat.key];
      if (rules == null || rules.length === 0) return acc;

      // Sort rules alphabetically
      const sortedRules = rules.toSorted((a, b) => a.localeCompare(b, "en"));

      return [
        ...acc,
        cat.heading,
        ...sortedRules,
      ];
    }, []);

    const jsonContent = JSON.stringify({ pages }, null, 2) + "\n";
    yield* fs.makeDirectory(path.dirname(targetPath), { recursive: true });
    yield* fs.writeFileString(targetPath, jsonContent);
    yield* Effect.log(ansis.magenta(`Generated rules meta -> ${targetPath}`));

    return { pages, path: targetPath };
  },
);

const processChangelog = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const changelogPath = "CHANGELOG.md";
  const targetPath = path.join("apps", "website", "content", "docs", "changelog.md");

  const source = yield* fs.readFileString(changelogPath, "utf8");
  // Wrap with Docusaurus frontmatter and strip the top-level "# Changelog"
  // heading since the website layout provides its own title.
  const wrapped = [
    "---",
    "title: Changelog",
    "---",
    "",
    source.replace(/^# Changelog\n\n/m, ""),
  ].join("\n");

  const dir = path.dirname(targetPath);
  yield* fs.makeDirectory(dir, { recursive: true });
  yield* fs.writeFileString(targetPath, wrapped);
  yield* Effect.log(ansis.cyan(`Processed changelog -> ${targetPath}`));
});

const program = Effect.gen(function*() {
  yield* Effect.log(ansis.bold("Processing rule documentation..."));

  // Pass 1: Collect rule documentation metadata and relations
  const metas = yield* collectDocs;
  const relations = yield* loadRuleRelations;

  yield* Effect.log(
    metas.length === 0
      ? ansis.yellow("No documentation files found.")
      : `Found ${ansis.bold(metas.length.toString())} rule documentation file(s).`,
  );

  yield* Effect.log(`Loaded ${ansis.bold(relations.size.toString())} rule relations.`);

  // Pass 2: Copy rule docs to website with See Also sections
  yield* Effect.forEach(metas, (meta) => copyRuleDoc(meta, relations), { concurrency: 8 });

  // Pass 3: Generate rules meta.json and process changelog (independent)
  yield* Effect.all([generateRuleMetaJson(metas), processChangelog], { concurrency: 2 });

  // Pass 6: Update documentation resources
  // yield* updateDocsResources;

  yield* Effect.log(ansis.bold.green("Documentation processing completed."));
});

program.pipe(Effect.provide(NodeSrv.layer), NodeRtm.runMain);
