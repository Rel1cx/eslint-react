import { Command, CommandExecutor } from "@effect/platform";
import { NodeCommandExecutor, NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";

const command = Command.make("git", "diff", "HEAD@{1}", "--stat", "--", "./pnpm-lock.yaml");
const program = Effect.gen(function*() {
  const executor = yield* CommandExecutor.CommandExecutor;
  const output = yield* executor.lines(command);
  if (output.length === 0) {
    return;
  }
  yield* Effect.logWarning("Detected changes in pnpm-lock.yaml!");
  yield* Effect.logWarning("Please run `pnpm install --fix-lockfile && pnpm dedupe` to update local dependencies.");
});

program.pipe(
  Effect.provide(NodeCommandExecutor.layer),
  Effect.provide(NodeFileSystem.layer),
  NodeRuntime.runMain,
);
