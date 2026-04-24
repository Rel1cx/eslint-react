import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Command from "@effect/platform/Command";
import * as CommandExecutor from "@effect/platform/CommandExecutor";
import { Effect } from "effect";

const program = Effect.gen(function*() {
  const ce = yield* CommandExecutor.CommandExecutor;
  const diffOutput = yield* ce.lines(Command.make("git", "diff", "--stat", "--", "./pnpm-lock.yaml"));
  if (diffOutput.length === 0) {
    return;
  }
  yield* Effect.logError("Detected changes in pnpm-lock.yaml!");
  return yield* Effect.fail(
    new Error("Please run `pnpm install --fix-lockfile && pnpm dedupe` to update local dependencies."),
  );
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
