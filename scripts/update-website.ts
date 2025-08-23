import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import * as Effect from "effect/Effect";

import { glob } from "./utils/glob";

/**
 * Build script for processing and copying documentation to the website
 *
 * This script (Effect version):
 * 1. Collects rule documentation from ESLint Plugins
 * 2. Copies them to the website with proper naming
 * 3. Processes the changelog
 * 4. (TODO) Generates meta.json / rules data
 */

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
    // Ensure destination directory exists
    yield* fs.makeDirectory(dir, { recursive: true });
    const content = yield* fs.readFileString(meta.source, "utf8");
    yield* fs.writeFileString(meta.destination, content);
    yield* Effect.log(ansis.green(`Copied ${meta.source} -> ${meta.destination}`));
    return meta;
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

  // Copy in parallel with limited concurrency (adjust if needed)
  yield* Effect.forEach(metas, copyRuleDoc, { concurrency: 8 });

  // (Optional) Generate rules metadata JSON (still TODO)
  // const rulesData = metas.map(({ name, title }) => ({ name, title }));
  // const rulesDataPath = path.join("apps", "website", "content", "docs", "rules", "data.json");
  // yield* FileSystem.FileSystem.flatMap(fs =>
  //   fs.makeDirectory(path.dirname(rulesDataPath), { recursive: true }).pipe(
  //     Effect.zipRight(
  //       fs.writeFileString(rulesDataPath, JSON.stringify(rulesData, null, 2) + "\n")
  //     ),
  //     Effect.tap(() => Effect.log(ansis.magenta(`Generated ${rulesDataPath}`)))
  //   )
  // );

  yield* processChangelog;

  yield* Effect.log(ansis.bold.green("Documentation processing completed."));
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
