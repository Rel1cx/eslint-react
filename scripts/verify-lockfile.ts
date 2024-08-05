/* eslint-disable no-console */
import { Command, CommandExecutor } from "@effect/platform";
import { BunCommandExecutor, BunFileSystem, BunRuntime } from "@effect/platform-bun";
// import { NodeCommandExecutor, NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";

const program = Effect.gen(function*(_) {
  const executor = yield* _(CommandExecutor.CommandExecutor);
  const command = Command.make("git", "diff", "HEAD@{1}", "--stat", "--", "./pnpm-lock.yaml");
  const output = yield* _(executor.lines(command));
  if (output.length === 0) return;
  yield* Effect.sync(() => {
    console.warn("Detected changes in pnpm-lock.yaml!");
    console.warn("Please run `pnpm install` to update local dependencies.");
  });
});

const runnable = program.pipe(
  Effect.provide(BunCommandExecutor.layer),
  Effect.provide(BunFileSystem.layer),
);

BunRuntime.runMain(runnable);
// NodeRuntime.runMain(runnable);
