import * as NodeFileSystem from "@effect/platform-node/NodeFileSystem";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import ansis from "ansis";
import * as Effect from "effect/Effect";
import { isMatching, match, P } from "ts-pattern";

import { ignores } from "./effects/ignores";
import { version } from "./effects/version";
import { glob } from "./utils/glob";

const GLOB_PACKAGE_JSON = [
  "package.json",
  "packages/*/package.json",
  "packages/*/*/package.json",
];

function update(path: string) {
  return Effect.gen(function*() {
    const fs = yield* FileSystem.FileSystem;
    const packageJsonText = yield* fs.readFileString(path, "utf8");
    const packageJson = JSON.parse(packageJsonText);
    if (!isMatching({ version: P.string }, packageJson)) {
      yield* Effect.fail(new Error(`Invalid package.json at ${path}: invalid or missing version field`));
    }
    const newVersion = yield* version;
    const oldVersion = match(packageJson)
      .with({ version: P.select(P.string) }, (v) => v)
      .otherwise(() => "0.0.0");
    if (oldVersion === newVersion) {
      yield* Effect.log(ansis.greenBright(`Skipping ${path} as it's already on version ${newVersion}`));
      return false;
    }
    const packageJsonUpdated = {
      ...packageJson,
      version: newVersion,
    };
    yield* fs.writeFileString(path, `${JSON.stringify(packageJsonUpdated, null, 2)}\n`);
    yield* Effect.log(`Updated ${path} to version ${packageJsonUpdated.version}`);
    return true;
  });
}

const program = Effect.gen(function*() {
  const ignorePatterns = yield* ignores;
  return yield* Effect.all(glob(GLOB_PACKAGE_JSON, ignorePatterns).map(update), { concurrency: 8 });
});

program.pipe(
  Effect.provide(NodeFileSystem.layer),
  NodeRuntime.runMain,
);
