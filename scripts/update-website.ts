// import { FileSystem } from "@effect/platform";
// // import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
// import { BunFileSystem, BunRuntime } from "@effect/platform-bun";
// import CodeBlockWriter from "code-block-writer";
// import { Effect } from "effect";
// import path from "pathe";
// import * as R from "remeda";
// import { globSync } from "tinyglobby";

// const docs = globSync(["packages/plugins/eslint-plugin-react-*/src/rules/*.md"]);
// const order = ["dom", "hooks-extra", "naming-convention", "debug"] as const;
// const [
//   files,
//   rules,
// ] = Array.from(docs).reduce<readonly [[string, string][], [string, string][]]>(
//   ([files, rules], doc) => {
//     const namespace = /^packages\/plugins\/eslint-plugin-react-([^/]+)/u.exec(doc)?.[1] ?? "";
//     const basename = path.parse(path.basename(doc)).name;
//     const isCoreRule = namespace === "x";
//     const name = isCoreRule ? basename : `${namespace}-${basename}`;
//     const title = isCoreRule ? basename : `${namespace}/${basename}`;
//     const dest = path.join("website", "pages", "rules", `${name}.mdx`);
//     return [[...files, [doc, dest]], [...rules, [name, title]]] as const;
//   },
//   [[], []],
// );
// const metaFile = path.join("website", "pages", "docs", "rules", "_meta.ts");
// const metaContent = {
//   overview: {
//     title: "Overview",
//     theme: {
//       layout: "full",
//     },
//   },
//   // eslint-disable-next-line perfectionist/sort-objects
//   "---": {
//     type: "separator",
//   },
//   ...R.fromEntries(
//     rules
//       .sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true }))
//       .sort(([a], [b]) => order.findLastIndex((x) => a.startsWith(x)) - order.findLastIndex((x) => b.startsWith(x))),
//   ),
// };
// const writer = new CodeBlockWriter({
//   indentNumberOfSpaces: 2,
//   newLine: "\n",
//   useSingleQuote: false,
//   useTabs: false,
// });
// writer.write("export default").block(() => {
//   for (const [key, value] of Object.entries(metaContent)) {
//     writer.writeLine(`${JSON.stringify(key)}: ${JSON.stringify(value)},`);
//   }
// });

// const program = Effect.gen(function*(_) {
//   const fs = yield* _(FileSystem.FileSystem);
//   yield* _(Effect.orDie(fs.writeFileString(metaFile, writer.toString())));
//   yield* _(Effect.all(files.map(([src, dest]) => fs.copyFile(src, dest))));
// });

// const runnable = program.pipe(Effect.provide(BunFileSystem.layer));

// BunRuntime.runMain(runnable);
// // NodeRuntime.runMain(runnable);
