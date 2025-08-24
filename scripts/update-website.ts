import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import * as Effect from "effect/Effect";

import { glob } from "./utils/glob";

const DOCS_GLOB = ["packages/plugins/eslint-plugin-react-*/src/rules/*.mdx"];

interface RuleMeta {
  name: string;
  title: string;
  destination: string;
  source: string;
}

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

    const sortAsc = (arr: readonly string[]): string[] => [...arr].sort((a, b) => a.localeCompare(b, "en"));

    const orderedCategories: Array<{
      key: string;
      heading: string;
    }> = [
      { key: "x", heading: "---X Rules---" },
      { key: "dom", heading: "---DOM Rules---" },
      { key: "web-api", heading: "---Web API Rules---" },
      { key: "naming-convention", heading: "---Naming Convention Rules---" },
      { key: "debug", heading: "---Debug Rules---" },
    ];

    const pages = orderedCategories.reduce<string[]>((acc, cat) => {
      const rules = grouped[cat.key];
      if (rules && rules.length > 0) {
        acc.push(cat.heading);
        acc.push(...sortAsc(rules));
      }
      return acc;
    }, ["overview"]);

    const jsonContent = JSON.stringify({ pages }, null, 2) + "\n";

    const dir = path.dirname(targetPath);
    yield* fs.makeDirectory(dir, { recursive: true });
    yield* fs.writeFileString(targetPath, jsonContent);
    yield* Effect.log(ansis.magenta(`Generated rules meta -> ${targetPath}`));

    return { pages, path: targetPath };
  });
}

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

  yield* processChangelog;

  yield* Effect.log(ansis.bold.green("Documentation processing completed."));
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
