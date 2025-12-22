import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import pluginMod from "@eslint-react/eslint-plugin";
import ansis from "ansis";
import { identity } from "effect";
import * as Effect from "effect/Effect";
import { P, match } from "ts-pattern";

import { glob } from "./lib/glob";

const DOCS_GLOB = ["packages/plugins/eslint-plugin-react-*/src/rules/*.mdx"];

interface RuleMeta {
  name: string;
  title: string;
  destination: string;
  source: string;
}

const orderedCategories = [
  { key: "x", heading: "---X Rules---" },
  { key: "dom", heading: "---DOM Rules---" },
  { key: "web-api", heading: "---Web API Rules---" },
  { key: "hooks-extra", heading: "---Hooks Extra Rules---" },
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

function copyRuleDoc(meta: RuleMeta) {
  return Effect.gen(function*() {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const dir = path.dirname(meta.destination);
    yield* fs.makeDirectory(dir, { recursive: true });
    const content = yield* fs.readFileString(meta.source, "utf8");
    yield* fs.writeFileString(meta.destination, content);
    yield* Effect.log(ansis.green(`Copied ${meta.source} -> ${meta.destination}`));
    return meta;
  });
}

function generateRuleMetaJson(metas: RuleMeta[]) {
  return Effect.gen(function*() {
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
          ...[...rules].sort((a, b) => a.localeCompare(b, "en")),
        ]
        : acc;
    }, ["overview"]);

    const jsonContent = JSON.stringify({ pages }, null, 2) + "\n";
    yield* fs.makeDirectory(path.dirname(targetPath), { recursive: true });
    yield* fs.writeFileString(targetPath, jsonContent);
    yield* Effect.log(ansis.magenta(`Generated rules meta -> ${targetPath}`));

    return { pages, path: targetPath };
  });
}

// Process the rules overview file
const processRulesOverview = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const targetPath = path.join("apps", "website", "content", "docs", "rules", "overview.mdx");
  const markdownTables = [[""], [""], [""], [""], [""], [""]];
  for (const doc of glob(DOCS_GLOB)) {
    const catename = /^packages\/plugins\/eslint-plugin-react-([^/]+)/u.exec(doc)?.[1] ?? "";
    const basename = path.parse(path.basename(doc)).name;
    const filename = path.resolve(doc).replace(/\.mdx$/u, ".ts");
    const rulename = `${catename}/${basename}`;
    const tableIndex = orderedCategories.findIndex((c) => c.key === catename);
    const tableLines = markdownTables[tableIndex] ?? [];
    const { default: ruleModule, RULE_FEATURES, RULE_NAME } = yield* Effect.tryPromise(() => import(filename));
    const description = match(ruleModule)
      .with({ meta: { docs: { description: P.select(P.string) } } }, identity)
      .otherwise(() => "No description available.");
    const isPluginX = catename === "x";
    const entryInRecommended = pluginMod
      .configs
      .recommended
      .rules
      ?.[isPluginX ? `@eslint-react/${RULE_NAME}` : `@eslint-react/${catename}/${RULE_NAME}`];
    const entryInStrict = pluginMod
      .configs
      .strict
      .rules
      ?.[isPluginX ? `@eslint-react/${RULE_NAME}` : `@eslint-react/${catename}/${RULE_NAME}`];
    const getSeverity = (entry: unknown): number =>
      match(entry)
        .with("off", () => 0)
        .with("warn", () => 1)
        .with("error", () => 2)
        .with(P.number, (n) => n)
        .with(P.array(), ([s]) => getSeverity(s))
        .otherwise(() => 0);
    const getSeverityIcon = (severity: number) => {
      return match(severity)
        .with(0, () => "0️⃣")
        .with(1, () => "1️⃣")
        .with(2, () => "2️⃣")
        .otherwise(() => "0️⃣");
    };
    const getFeatureIcon = (feature: unknown) => {
      return match(feature)
        .with("CFG", () => "⚙️")
        .with("DBG", () => "🐞")
        .with("FIX", () => "🔧")
        .with("MOD", () => "🔄")
        .with("TSC", () => "💭")
        .with("EXP", () => "🧪")
        .otherwise(() => "");
    };
    const severityInRecommended = getSeverity(entryInRecommended);
    const severityInStrict = getSeverity(entryInStrict);
    tableLines.push(
      [
        `[${basename}](${catename === "x" ? "" : catename + "-"}${basename})`,
        `${getSeverity(entryInRecommended)} ${getSeverity(entryInStrict)}`,
        `${RULE_FEATURES.map((f: string) => "`" + getFeatureIcon(f) + "`").join(" ")}`,
      ].join(" | "),
    );
    // yield* Effect.log(markdownTables);
    // TODO: Not implemented yet.
  }
});

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

  yield* Effect.log(
    metas.length === 0
      ? ansis.yellow("No documentation files found.")
      : `Found ${ansis.bold(metas.length.toString())} rule documentation file(s).`,
  );

  yield* Effect.forEach(metas, copyRuleDoc, { concurrency: 8 });

  yield* generateRuleMetaJson(metas);

  yield* processRulesOverview;

  yield* processChangelog;

  yield* Effect.log(ansis.bold.green("Documentation processing completed."));
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
