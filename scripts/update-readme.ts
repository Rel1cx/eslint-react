import { FileSystem } from "@effect/platform";
// import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { BunFileSystem, BunRuntime } from "@effect/platform-bun";
import { Effect } from "effect";

const source = "README.md";
const dest = ["packages/plugins/eslint-plugin/README.md"] as const;

const program = Effect.gen(function*(_) {
  const fs = yield* _(FileSystem.FileSystem);
  yield* _(Effect.all(dest.map((dest) => fs.copyFile(source, dest))));
});

const runnable = program.pipe(Effect.provide(BunFileSystem.layer));

BunRuntime.runMain(runnable);
// NodeRuntime.runMain(runnable);
