// import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { BunFileSystem, BunRuntime } from "@effect/platform-bun";
import { Effect, Function as F } from "effect";
import * as R from "remeda";
import { match, P } from "ts-pattern";

import { glob } from "./lib/glob";
import { readJsonFile, writeJsonFile } from "./lib/json";
import { LoggerLive } from "./services/LoggerLive";
import { version } from "./version";

const GLOB_PACKAGE_JSON = ["package.json", "packages/**/package.json"];

const mkTask = (path: string) =>
  Effect.gen(function*() {
    const packageJson = yield* readJsonFile(path);
    if (!R.isObjectType(packageJson)) {
      return yield* Effect.die(`Invalid package.json at ${path}`);
    }
    const newVersion = yield* version;
    const oldVersion = match(packageJson)
      .with({ version: P.select(P.string) }, F.identity)
      .otherwise(F.constant("0.0.0"));
    if (oldVersion === newVersion) {
      return yield* Effect.logDebug(`Skipping ${path} as it's already on version ${newVersion}`);
    }
    const packageJsonUpdated = {
      ...packageJson,
      version: newVersion,
    };
    yield* writeJsonFile(path, packageJsonUpdated);
    yield* Effect.log(`Updated ${path} to version ${packageJsonUpdated.version}`);
  });

const program = Effect.gen(function*() {
  const paths = yield* glob(GLOB_PACKAGE_JSON);
  yield* Effect.all(paths.map(mkTask));
});

const runnable = program.pipe(
  Effect.provide(BunFileSystem.layer),
  Effect.provide(LoggerLive),
);

BunRuntime.runMain(runnable);
// NodeRuntime.runMain(runnable);
