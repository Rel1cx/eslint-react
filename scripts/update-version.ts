import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import ansis from "ansis";
import * as Effect from "effect/Effect";
import * as Fn from "effect/Function";
import { P, isMatching, match } from "ts-pattern";

import { glob } from "./lib/glob";
import { ignores } from "./lib/ignores";
import { version } from "./lib/version";

const GLOB_PACKAGE_JSON = [
  "package.json",
  "packages/*/package.json",
  "packages/*/*/package.json",
];

function processPackageJson(filename: string) {
  return Effect.gen(function*() {
    const fs = yield* FileSystem.FileSystem;
    const packageJsonText = yield* fs.readFileString(filename, "utf8");
    const packageJson = JSON.parse(packageJsonText);
    if (!isMatching({ version: P.string }, packageJson)) {
      return yield* Effect.fail(new Error(`Invalid package.json at ${filename}: invalid or missing version field`));
    }
    const newVersion = yield* version;
    const oldVersion = match(packageJson)
      .with({ version: P.select(P.string) }, Fn.identity)
      .otherwise(() => "0.0.0");
    if (oldVersion === newVersion) {
      yield* Effect.log(ansis.greenBright(`Skipping ${filename} as it's already on version ${newVersion}`));
      return false;
    }
    const packageJsonUpdated = {
      ...packageJson,
      version: newVersion,
    };
    yield* fs.writeFileString(filename, `${JSON.stringify(packageJsonUpdated, null, 2)}\n`);
    yield* Effect.log(`Updated ${filename} to version ${packageJsonUpdated.version}`);
    return true;
  });
}

const program = Effect.gen(function*() {
  const ignorePatterns = yield* ignores;
  const packageJsonFiles = glob(GLOB_PACKAGE_JSON, ignorePatterns);
  return yield* Effect.all(packageJsonFiles.map(processPackageJson), { concurrency: 8 });
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
