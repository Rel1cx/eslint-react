import { FileSystem } from "@effect/platform";
// import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { BunFileSystem, BunRuntime } from "@effect/platform-bun";
import { Effect } from "effect";

import { LoggerLive } from "./services/LoggerLive";

const source = "README.md";

const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  yield* Effect.orDie(fs.copyFile(source, "packages/plugins/eslint-plugin/README.md"));
});

const runnable = program.pipe(
  Effect.provide(BunFileSystem.layer),
  Effect.provide(LoggerLive),
);

BunRuntime.runMain(runnable);
// NodeRuntime.runMain(runnable);
