import { NodeFileSystem, NodeRuntime } from "@effect/platform-node";
import { Effect, Function as F, Predicate } from "effect";
import { match, P } from "ts-pattern";

import { glob } from "./lib/glob";
import { readJsonFile, writeJsonFile } from "./lib/json";
import { version } from "./version";

const GLOB_PACKAGE_JSON = ["package.json", "packages/**/package.json"];

const mkTask = (path: string) =>
  Effect.gen(function*() {
    const packageJson = yield* readJsonFile(path);
    if (!Predicate.isObject(packageJson)) {
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
  yield* Effect.all(paths.map(mkTask), { concurrency: 8 });
});

const runnable = program.pipe(
  Effect.provide(NodeFileSystem.layer),
);

NodeRuntime.runMain(runnable);
// BunRuntime.runMain(runnable);
