import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Command from "@effect/platform/Command";
import * as CommandExecutor from "@effect/platform/CommandExecutor";
import ansis from "ansis";
import { compare } from "compare-versions";
import * as Effect from "effect/Effect";

interface DevToolRequirement {
  readonly name: string;
  readonly args: readonly string[];
  readonly command: string;
  readonly requiredVersion: string;
  readonly versionPattern: RegExp;
}

const DEVTOOLS: readonly DevToolRequirement[] = [
  {
    name: "node",
    command: "node",
    args: ["--version"],
    versionPattern: /v(\S+)/,
    requiredVersion: "25.9.0",
  },
  {
    name: "pnpm",
    command: "pnpm",
    args: ["--version"],
    versionPattern: /(\S+)/,
    requiredVersion: "10.33.2",
  },
  {
    name: "sentrux",
    command: "sentrux",
    args: ["--version"],
    versionPattern: /sentrux\s+(\S+)/,
    requiredVersion: "0.5.7",
  },
];

const checkDevTool = Effect.fnUntraced(
  function*(tool: DevToolRequirement) {
    const ce = yield* CommandExecutor.CommandExecutor;
    const output = yield* ce.string(Command.make(tool.command, ...tool.args));
    const actualVersion = tool.versionPattern.exec(output)?.[1];
    if (actualVersion == null) {
      yield* Effect.logError(
        ansis.red(`  ${ansis.bold(tool.name)}: could not parse version from output: ${output.trim()}`),
      );
      return false;
    }
    const ok = compare(actualVersion, tool.requiredVersion, ">=");
    yield* (ok ? Effect.log : Effect.logError)(
      (ok ? ansis.green : ansis.red)(
        `  ${ansis.bold(tool.name)}: ${
          ok
            ? `${actualVersion} >= ${tool.requiredVersion}`
            : `required >= ${tool.requiredVersion}, found ${actualVersion}`
        }`,
      ),
    );
    return ok;
  },
);

const program = Effect.gen(function*() {
  yield* Effect.log(ansis.bold("Verifying devtools..."));
  yield* Effect.log("");

  let passed = 0;
  let failed = 0;

  for (const tool of DEVTOOLS) {
    const result = yield* Effect.catchAll(
      checkDevTool(tool),
      (error) =>
        Effect.gen(function*() {
          yield* Effect.logError(
            ansis.red(`  ${ansis.bold(tool.name)}: failed to run command — ${error}`),
          );
          return false;
        }),
    );

    if (result) {
      passed += 1;
    } else {
      failed += 1;
    }
  }

  yield* Effect.log("");

  if (failed === 0) {
    yield* Effect.log(ansis.bold.green(`All ${passed} devtool(s) satisfied.`));
  } else {
    yield* Effect.log(ansis.bold.red(`${failed} devtool(s) missing or out of date.`));
    return yield* Effect.fail(new Error("Devtools verification failed."));
  }
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
