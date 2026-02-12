import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Command from "@effect/platform/Command";
import * as CommandExecutor from "@effect/platform/CommandExecutor";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import { Effect } from "effect";

const snapshots = [
  ["./examples/react-dom-with-samples", "./test/snapshots/examples/react-dom-with-samples.json"],
] as const;

const program = Effect.gen(function*() {
  const path = yield* Path.Path;
  const fs = yield* FileSystem.FileSystem;
  const ce = yield* CommandExecutor.CommandExecutor;
  for (const [project, output] of snapshots) {
    const stdout = yield* ce.string(
      Command.make(
        "pnpm",
        "--filter",
        project,
        "exec",
        "eslint",
        "-f",
        "json-with-metadata",
        "-o",
        path.relative(project, output),
      ),
    );
    yield* Effect.logDebug(stdout);
    yield* fs.exists(output);
    yield* ce.string(Command.make("dprint", "fmt", output));
  }
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
