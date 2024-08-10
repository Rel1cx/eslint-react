import { Command, CommandExecutor } from "@effect/platform";
import { BunCommandExecutor, BunFileSystem, BunRuntime } from "@effect/platform-bun";
// import { NodeCommandExecutor, NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";

import { LoggerLive } from "./services/LoggerLive";

const command = Command.make("git", "diff", "HEAD@{1}", "--stat", "--", "./pnpm-lock.yaml");
const program = Effect.gen(function*() {
  const executor = yield* CommandExecutor.CommandExecutor;
  const output = yield* executor.lines(command);
  if (output.length === 0) return;
  yield* Effect.logWarning("Detected changes in pnpm-lock.yaml!");
  yield* Effect.logWarning("Please run `pnpm install` to update local dependencies.");
});

const runnable = program.pipe(
  Effect.provide(BunCommandExecutor.layer),
  Effect.provide(BunFileSystem.layer),
  Effect.provide(LoggerLive),
);

BunRuntime.runMain(runnable);
// NodeRuntime.runMain(runnable);
