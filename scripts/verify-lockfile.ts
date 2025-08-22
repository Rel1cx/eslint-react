import { Command, CommandExecutor } from "@effect/platform";
import { NodeCommandExecutor, NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";
import * as Fn from "effect/Function";
import * as Layer from "effect/Layer";

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

const MainLive = Fn.pipe(
  NodeCommandExecutor.layer,
  Layer.provideMerge(NodeFileSystem.layer),
);

program.pipe(Effect.provide(MainLive), NodeRuntime.runMain);
