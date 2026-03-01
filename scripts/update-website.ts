import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import * as Effect from "effect/Effect";

import { glob } from "./lib/glob";

const DOCS_GLOB = ["packages/plugins/eslint-plugin-react-*/src/rules/*/*.mdx"];
const RULE_RELATIONS_PATH = "docs/rule-relations-table.md";
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
  // Convert rule name like "class-component" to full name like "react-debug/class-component"
  // or "no-children-prop" to "react-x/no-children-prop"
  // Check if it's a plugin-specific rule (e.g., "dom-no-render" -> "react-dom/no-render")
  if (meta.name.startsWith("rsc-")) {
    return `react-rsc/${meta.name.slice(4)}`;
  }
  if (meta.name.startsWith("dom-")) {
    return `react-dom/${meta.name.slice(4)}`;
  }
  if (meta.name.startsWith("web-api-")) {
    return `react-web-api/${meta.name.slice(8)}`;
  }
  if (meta.name.startsWith("naming-convention-")) {
    return `react-naming-convention/${meta.name.slice(18)}`;
  }
  if (meta.name.startsWith("debug-")) {
    return `react-debug/${meta.name.slice(6)}`;
  }

  // Otherwise it's a react-x rule (either "x-" prefix or no prefix)
  if (meta.name.startsWith("x-")) {
    return `react-x/${meta.name.slice(2)}`;
  }
  return `react-x/${meta.name}`;
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
    const targetParts = ref.targetRule.split("/");
    const targetPlugin = targetParts[0] ?? "";
    const targetName = targetParts[1] ?? "";

    // Map plugin names to prefixes used in website
    const pluginPrefixMap: Record<string, string> = {
      "react-debug": "debug",
      "react-dom": "dom",
      "react-naming-convention": "naming-convention",
      "react-rsc": "rsc",
      "react-web-api": "web-api",
      "react-x": "x",
    };

    const prefix = pluginPrefixMap[targetPlugin];
    const targetFileName = prefix && prefix !== "x" ? `${prefix}-${targetName}` : targetName;

    return `- [\`${targetName}\`](./${targetFileName})\\
  ${ref.description}`;
  });

  return `\n---\n\n## See Also\n\n${items.join("\n")}\n`;
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
      return rules && rules.length > 0
        ? [
          ...acc,
          cat.heading,
          ...rules.toSorted((a, b) => a.localeCompare(b, "en")),
        ]
        : acc;
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
