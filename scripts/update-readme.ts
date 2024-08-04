import { FileSystem } from "@effect/platform";
import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";

const source = "README.md";
const dest = ["packages/plugins/eslint-plugin/README.md"] as const;

const program = Effect.gen(function*(_) {
  const fs = yield* _(FileSystem.FileSystem);
  yield* _(Effect.all(dest.map((dest) => fs.copyFile(source, dest))));
});

NodeRuntime.runMain(program.pipe(Effect.provide(NodeFileSystem.layer)));
