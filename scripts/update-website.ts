import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import * as Effect from "effect/Effect";
import { P, match } from "ts-pattern";

import { glob } from "./lib/glob";

const DOCS_GLOB = ["packages/plugins/eslint-plugin-react-*/src/rules/*/*.mdx"];
const RULE_RELATIONS_PATH = "docs/rule-relations-table.md";
const RE_RULE_PREFIX = /^(x|naming-convention|web-api|rsc|dom|debug)-(.+)$/u;
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
  if (!match?.[1]) return relations;

  const tableBody = match[1];
  const rows = tableBody.split("\n").filter((line) => line.trim().startsWith("|"));

  for (const row of rows) {
    const cells = row.split("|").map((cell) => cell.trim()).filter(Boolean);
    if (cells.length < 3) continue;

    const sourceRule = cells[0]!.replace(/`/g, "").trim();
    const targetRule = cells[1]!.replace(/`/g, "").trim();
    const description = cells[2]!.trim();

    if (!sourceRule || !targetRule) continue;

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

const getFullRuleName = (meta: RuleMeta): string => {
  const [m0, m1, m2] = RE_RULE_PREFIX.exec(meta.name) ?? [];
  if (m0 == null || m1 == null || m2 == null) return `react-x/${meta.name}`;
  return `react-${m1}/${m2}`;
};

const generateSeeAlsoSection = (meta: RuleMeta, relations: RuleRelationsMap) => {
  const fullRuleName = getFullRuleName(meta);
  const references = relations.get(fullRuleName);

  if (!references || references.length === 0) {
    return "";
  }

  const items = references.map((ref) => {
    // Convert full rule name to website file name
    // e.g., "react-debug/function-component" -> "debug-function-component" or just "function-component"
    const [targetPlugin = "", targetName = ""] = ref.targetRule.split("/");
    const prefix = targetPlugin.replace("react-", "");
    const targetFileName = prefix === "x" ? targetName : `${prefix}-${targetName}`;
    return [`- [\`${ref.targetRule}\`](./${targetFileName})\\`, `  ${ref.description}.`].join("\n");
  });

  return ["", "---", "", "## See Also", "", ...items, ""].join("\n");
};

const orderedCategories = [
  { key: "x", heading: "---X Rules---" },
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
    const catename = /^packages\/plugins\/eslint-plugin-react-([^/]+)/u.exec(doc)?.[1] ?? "";
    const basename = path.parse(path.basename(doc)).name;

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
      if (catename == null) return acc;
      const list = acc[catename] ?? [];
      return {
        ...acc,
        [catename]: [...list, meta.name],
      };
    }, {});

    const pages = orderedCategories.reduce((acc, cat) => {
      const rules = grouped[cat.key];
      if (!rules || rules.length === 0) return acc;

      // Sort rules with jsx-* rules first
      const sortedRules = rules.toSorted((a, b) => {
        return match([a, b])
          .with([P.string.startsWith("jsx-"), P._], () => -1)
          .with([P._, P.string.startsWith("jsx-")], () => 1)
          .otherwise(() => a.localeCompare(b, "en"));
      });

      return [
        ...acc,
        cat.heading,
        ...sortedRules,
      ];
    }, ["overview"]);

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
  const wrapped = [
    "---",
    "title: Changelog",
    "---",
    "",
    source,
  ].join("\n");

  const dir = path.dirname(targetPath);
  yield* fs.makeDirectory(dir, { recursive: true });
  yield* fs.writeFileString(targetPath, wrapped);
  yield* Effect.log(ansis.cyan(`Processed changelog -> ${targetPath}`));
});

const program = Effect.gen(function*() {
  yield* Effect.log(ansis.bold("Processing rule documentation..."));

  const metas = yield* collectDocs;
  const relations = yield* loadRuleRelations;

  yield* Effect.log(
    metas.length === 0
      ? ansis.yellow("No documentation files found.")
      : `Found ${ansis.bold(metas.length.toString())} rule documentation file(s).`,
  );

  yield* Effect.log(`Loaded ${ansis.bold(relations.size.toString())} rule relations.`);

  yield* Effect.forEach(metas, (meta) => copyRuleDoc(meta, relations), { concurrency: 8 });

  yield* generateRuleMetaJson(metas);

  yield* processChangelog;

  yield* Effect.log(ansis.bold.green("Documentation processing completed."));
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
