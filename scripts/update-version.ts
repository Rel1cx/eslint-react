// import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { BunFileSystem, BunRuntime } from "@effect/platform-bun";
import { Effect } from "effect";

import { glob } from "./lib/glob";
import { readJsonFile, writeJsonFile } from "./lib/json";
import { version } from "./version";

const GLOB_PACKAGE_JSON = ["package.json", "packages/**/package.json"];

const mkTask = (path: string) =>
  Effect.gen(function*() {
    const packageJson = yield* readJsonFile(path);
    const packageJsonUpdated = {
      ...packageJson ?? {},
      version: yield* version,
    };
    yield* writeJsonFile(path, packageJsonUpdated);
    yield* Effect.log(`Updated ${path} to version ${packageJsonUpdated.version}`);
  });

const program = Effect.gen(function*() {
  const paths = yield* glob(GLOB_PACKAGE_JSON);
  yield* Effect.all(paths.map(mkTask));
  yield* Effect.log("Done");
});

const runnable = program.pipe(Effect.provide(BunFileSystem.layer));

BunRuntime.runMain(runnable);
// NodeRuntime.runMain(runnable);
