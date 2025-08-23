import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";

const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const source = "README.md";
  const destination = "packages/plugins/eslint-plugin/README.md";

  // Ensure the destination directory exists
  yield* fs.makeDirectory("packages/plugins/eslint-plugin", { recursive: true });

  // Copy the README file
  yield* fs.copyFile(source, destination);

  yield* Effect.log(`Copied ${source} to ${destination}`);
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
