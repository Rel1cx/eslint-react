import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import * as Effect from "effect/Effect";
// import { P, match } from "ts-pattern";

import { glob } from "./lib/glob";

// Collect .mdx files from every sub-plugin's rules directory
const DOCS_GLOB = ["plugins/eslint-plugin-react-*/src/rules/*/*.mdx"];
const RULE_RELATIONS_PATH = "docs/rule-relations-table.md";
// Parses rule file names like "dom-no-render" into plugin domain + rule name
const RE_RULE_PREFIX = /^(x|jsx|rsc|dom|web-api|naming-convention|debug)-(.+)$/u;
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

interface ChangelogVersion {
  title: string;
  body: string;
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
// Falls back to "react-x/<name>" for core-plugin rules (no prefix in filename).
const getFullRuleName = (meta: RuleMeta): string => {
  const [m0, m1, m2] = RE_RULE_PREFIX.exec(meta.name) ?? [];
  if (m0 == null || m1 == null || m2 == null) return `react-x/${meta.name}`;
  return `react-${m1}/${m2}`;
};

const generateSeeAlsoSection = (meta: RuleMeta, relations: RuleRelationsMap) => {
  const fullRuleName = getFullRuleName(meta);
  const references = relations.get(fullRuleName);

  if (references == null || references.length === 0) {
    return "";
  }

  // Convert canonical rule names to website file names for the link target.
  // "react-debug/function-component" -> "debug-function-component"
  // "react-x/no-clone-element"      -> "no-clone-element" (core plugin, omit "x-" prefix)
  const items = references.map((ref) => {
    const [targetPlugin = "", targetName = ""] = ref.targetRule.split("/");
    const prefix = targetPlugin.replace("react-", "");
    const targetFileName = prefix === "x" ? targetName : `${prefix}-${targetName}`;
    return [`- [\`${ref.targetRule}\`](./${targetFileName})\\`, `  ${ref.description}.`].join("\n");
  });

  return ["", "---", "", "## See Also", "", ...items, ""].join("\n");
};

// Determines the section order in the generated meta.json.
// Headings act as section dividers in the website sidebar.
const orderedCategories = [
  { key: "x", heading: "---X Rules---" },
  { key: "jsx", heading: "---JSX Rules---" },
  { key: "rsc", heading: "---RSC Rules---" },
  { key: "dom", heading: "---DOM Rules---" },
  { key: "web-api", heading: "---Web API Rules---" },
  { key: "naming-convention", heading: "---Naming Convention Rules---" },
  { key: "debug", heading: "---Debug Rules---" },
] as const satisfies { key: string; heading: string }[];

const collectDocs = Effect.gen(function*() {
  const path = yield* Path.Path;
  const docs = yield* Effect.sync(() => glob(DOCS_GLOB));
  return docs.map<RuleMeta>((doc) => {
    const catename = /^plugins\/eslint-plugin-react-([^/]+)/u.exec(doc)?.[1] ?? "";
    const basename = path.parse(path.basename(doc)).name;

    // Core plugin "x" uses flat names ("no-clone-element") while
    // sub-plugins prefix with their domain ("dom-no-render").
    const isPluginX = catename === "x";

    const name = isPluginX ? basename : `${catename}-${basename}`;
    const title = isPluginX ? basename : `${catename}/${basename}`;

    const destination = path.join("apps", "website", "content", "docs", "rules", `${name}.mdx`);

    return {
      name,
      title,
      destination,
      source: doc,
    };
  });
});

function parseChangelogVersions(content: string): ChangelogVersion[] {
  const lines = content.split("\n");
  const versions: Array<{ title: string; body: string[] }> = [];
  let current: { title: string; body: string[] } | null = null;

  for (const line of lines) {
    // eslint-disable-next-line regexp/no-super-linear-backtracking
    const match = /^## (\[.+\].*)$/.exec(line);
    if (match != null) {
      const [, title] = match;
      if (title == null) continue;
      if (current != null) versions.push(current);
      current = { title, body: [] };
    } else if (current != null) {
      current.body.push(line);
    }
  }
  if (current != null) versions.push(current);

  return versions
    .map((v) => ({
      title: v.title,
      body: v.body.join("\n").trim(),
    }))
    .filter((v) => v.body !== "");
}

function generateVersionsAccordion(versions: ChangelogVersion[]): string {
  const items = versions.map((v) => `<Accordion title="${v.title}">\n\n${v.body}\n\n</Accordion>`);

  return ["", "## Versions", "", "<Accordions>", ...items, "</Accordions>", ""].join("\n");
}

function addAccordionImport(content: string): string {
  if (content.includes('from "fumadocs-ui/components/accordion"')) return content;

  const frontmatterEnd = /^---\n[\s\S]*?\n---\n/.exec(content);
  if (frontmatterEnd != null) {
    const index = frontmatterEnd.index + frontmatterEnd[0].length;
    return `${content.slice(0, index)}import { Accordion, Accordions } from "fumadocs-ui/components/accordion";\n${
      content.slice(index)
    }`;
  }

  return `import { Accordion, Accordions } from "fumadocs-ui/components/accordion";\n\n${content}`;
}

function insertVersionsSection(content: string, versionsSection: string): string {
  const resourcesMatch = /\n## Resources\n/.exec(content);
  if (resourcesMatch != null) {
    const index = resourcesMatch.index;
    return `${content.slice(0, index)}${versionsSection}${content.slice(index)}`;
  }

  const seeAlsoMatch = /\n---\n\n## See Also\n/.exec(content);
  if (seeAlsoMatch != null) {
    const index = seeAlsoMatch.index;
    return `${content.slice(0, index)}${versionsSection}\n${content.slice(index)}`;
  }

  return `${content}${versionsSection}`;
}

const generateRuleVersions = Effect.fnUntraced(
  function*(meta: RuleMeta) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const changelogPath = path.join(path.dirname(meta.source), "CHANGELOG.md");
    const exists = yield* fs.exists(changelogPath);
    if (!exists) return "";

    const changelogContent = yield* fs.readFileString(changelogPath, "utf8");
    const versions = parseChangelogVersions(changelogContent);
    if (versions.length === 0) return "";

    return generateVersionsAccordion(versions);
  },
);

const copyRuleDoc = Effect.fnUntraced(
  function*(meta: RuleMeta, relations: RuleRelationsMap, versionsMap: Map<string, string>) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const dir = path.dirname(meta.destination);
    yield* fs.makeDirectory(dir, { recursive: true });
    let content = yield* fs.readFileString(meta.source, "utf8");

    const versionsSection = versionsMap.get(meta.name);
    if (versionsSection != null && versionsSection !== "") {
      content = addAccordionImport(content);
      content = insertVersionsSection(content, versionsSection);
    }

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

  // Pass 1: Collect rule documentation metadata, relations, and versions
  const metas = yield* collectDocs;
  const relations = yield* loadRuleRelations;

  yield* Effect.log(
    metas.length === 0
      ? ansis.yellow("No documentation files found.")
      : `Found ${ansis.bold(metas.length.toString())} rule documentation file(s).`,
  );

  yield* Effect.log(`Loaded ${ansis.bold(relations.size.toString())} rule relations.`);

  const versionsSections = yield* Effect.forEach(metas, (meta) => generateRuleVersions(meta), { concurrency: 8 });
  const versionsMap = versionsSections.reduce((map, section, i) => {
    const meta = metas[i];
    if (meta != null && section != null && section !== "") map.set(meta.name, section);
    return map;
  }, new Map<string, string>());

  yield* Effect.log(
    versionsMap.size === 0
      ? ansis.yellow("No rule changelogs found.")
      : `Generated versions sections for ${ansis.bold(versionsMap.size.toString())} rule(s).`,
  );

  // Pass 2: Copy rule docs to website with Versions and See Also sections
  yield* Effect.forEach(metas, (meta) => copyRuleDoc(meta, relations, versionsMap), { concurrency: 8 });

  // Pass 3: Generate rules meta.json and process changelog (independent)
  yield* Effect.all([generateRuleMetaJson(metas), processChangelog], { concurrency: 2 });

  // Pass 6: Update documentation resources
  // yield* updateDocsResources;

  yield* Effect.log(ansis.bold.green("Documentation processing completed."));
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
