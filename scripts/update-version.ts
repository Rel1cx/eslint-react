import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect } from "effect";

import { glob } from "./lib/glob";
import { readJsonFile, writeJsonFile } from "./lib/json";
import { version } from "./version";

const GLOB_PACKAGE_JSON = "packages/**/package.json";

const makeTask = (path: string) =>
  Effect.gen(function*() {
    const packageJson = yield* readJsonFile(path);
    const packageJsonUpdated = {
      ...packageJson ?? {},
      version: yield* version,
    };
    yield* writeJsonFile(path, packageJsonUpdated);
  });

const program = Effect.gen(function*() {
  const paths = yield* glob(GLOB_PACKAGE_JSON);
  yield* Effect.all(paths.map(makeTask));
});

NodeRuntime.runMain(program.pipe(Effect.provide(NodeFileSystem.layer)));
