import { FileSystem } from "@effect/platform";
import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";

const source = "README.md";

const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  yield* Effect.orDie(fs.copyFile(source, "packages/plugins/eslint-plugin/README.md"));
});

const runnable = program.pipe(
  Effect.provide(NodeFileSystem.layer),
);

NodeRuntime.runMain(runnable);
// BunRuntime.runMain(runnable);
