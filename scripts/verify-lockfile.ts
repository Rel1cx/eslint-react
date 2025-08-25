import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Command from "@effect/platform/Command";
import * as CommandExecutor from "@effect/platform/CommandExecutor";
import { Effect } from "effect";

const program = Effect.gen(function*() {
  const ce = yield* CommandExecutor.CommandExecutor;
  const diffOutput = yield* ce.lines(Command.make("git", "diff", "HEAD@{1}", "--stat", "--", "./pnpm-lock.yaml"));
  if (diffOutput.length === 0) {
    return;
  }
  yield* Effect.log(yield* ce.string(Command.make("pnpm", "nx", "reset")));
  yield* Effect.logWarning("Detected changes in pnpm-lock.yaml!");
  yield* Effect.logWarning("Please run `pnpm install --fix-lockfile && pnpm dedupe` to update local dependencies.");
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
