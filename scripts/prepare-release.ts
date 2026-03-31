import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Command from "@effect/platform/Command";
import * as CommandExecutor from "@effect/platform/CommandExecutor";
import * as FileSystem from "@effect/platform/FileSystem";
import ansis from "ansis";
import * as Effect from "effect/Effect";

import { match } from "ts-pattern";
import { version } from "./lib/version";

const RE_STABLE = /^\d+\.\d+\.\d+$/u;
const RE_RC = /^\d+\.\d+\.\d+-rc\.\d+$/u;
const RE_BETA = /^\d+\.\d+\.\d+-beta\.\d+$/u;
const RE_NEXT = /^\d+\.\d+\.\d+-next\.\d+$/u;

function classifyVersion(v: string): "stable" | "rc" | "beta" | "next" | "unknown" {
  if (RE_STABLE.test(v)) return "stable";
  if (RE_RC.test(v)) return "rc";
  if (RE_BETA.test(v)) return "beta";
  if (RE_NEXT.test(v)) return "next";
  return "unknown";
}

function bumpPrerelease(current: string, channel: "rc" | "beta" | "next"): string {
  const re = new RegExp(`^(\\d+\\.\\d+\\.\\d+)-${channel}\\.(\\d+)$`, "u");
  const match = re.exec(current);
  if (match != null && match[1] != null && match[2] != null) {
    return `${match[1]}-${channel}.${Number(match[2]) + 1}`;
  }
  // Current version is not on this channel; derive from stable base
  const stableBase = current.replace(/-.*$/u, "");
  return `${stableBase}-${channel}.0`;
}

function bumpPatch(v: string): string {
  const base = v.replace(/-.*$/u, "");
  const parts = base.split(".");
  if (parts.length !== 3) return v;
  const [major, minor, patch] = parts;
  return `${major}.${minor}.${Number(patch) + 1}`;
}

function bumpMinor(v: string): string {
  const base = v.replace(/-.*$/u, "");
  const parts = base.split(".");
  if (parts.length !== 3) return v;
  const [major, minor] = parts;
  return `${major}.${Number(minor) + 1}.0`;
}

function bumpMajor(v: string): string {
  const base = v.replace(/-.*$/u, "");
  const parts = base.split(".");
  if (parts.length !== 3) return v;
  const [major] = parts;
  return `${Number(major) + 1}.0.0`;
}

const USAGE = [
  "",
  `${ansis.bold("Usage:")} tsx ./scripts/prepare-release.ts <version | bump-type>`,
  "",
  `${ansis.bold("Arguments:")}`,
  "  <version>      An explicit version string (e.g. 4.3.0, 4.3.0-beta.0)",
  "  <bump-type>    One of: patch, minor, major, rc, beta, next",
  "",
  `${ansis.bold("Examples:")}`,
  "  tsx ./scripts/prepare-release.ts 4.3.0",
  "  tsx ./scripts/prepare-release.ts patch",
  "  tsx ./scripts/prepare-release.ts beta",
  "",
].join("\n");

const resolveNewVersion = Effect.fnUntraced(
  function*(input: string) {
    const currentVersion = yield* version;
    yield* Effect.log(`Current version: ${ansis.cyan(currentVersion)}`);
    return yield* match(input)
      .with("patch", () => Effect.succeed(bumpPatch(currentVersion)))
      .with("minor", () => Effect.succeed(bumpMinor(currentVersion)))
      .with("major", () => Effect.succeed(bumpMajor(currentVersion)))
      .with("rc", () => Effect.succeed(bumpPrerelease(currentVersion, "rc")))
      .with("beta", () => Effect.succeed(bumpPrerelease(currentVersion, "beta")))
      .with("next", () => Effect.succeed(bumpPrerelease(currentVersion, "next")))
      .otherwise(Effect.fnUntraced(function*() {
        yield* Effect.logError(ansis.red(`Invalid version format: ${ansis.bold(input)}`));
        yield* Effect.logError(
          "Expected format: X.Y.Z, X.Y.Z-rc.N, X.Y.Z-beta.N, or X.Y.Z-next.N",
        );
        return yield* Effect.fail(new Error(`Invalid version format: ${input}`));
      }));
  },
);

const updateVersionFile = Effect.fnUntraced(
  function*(newVersion: string) {
    const fs = yield* FileSystem.FileSystem;
    yield* fs.writeFileString("VERSION", `${newVersion}\n`);
    yield* Effect.log(`Updated ${ansis.bold("VERSION")} file to ${ansis.green(newVersion)}`);
  },
);

const runUpdateAll = Effect.gen(function*() {
  const ce = yield* CommandExecutor.CommandExecutor;
  yield* Effect.log(ansis.bold("\nRunning update:version..."));
  yield* ce.string(Command.make("pnpm", "run", "update:version"));
  yield* Effect.log(ansis.green("  update:version completed."));

  yield* Effect.log(ansis.bold("Running update:readme..."));
  yield* ce.string(Command.make("pnpm", "run", "update:readme"));
  yield* Effect.log(ansis.green("  update:readme completed."));

  yield* Effect.log(ansis.bold("Running update:website..."));
  yield* ce.string(Command.make("pnpm", "run", "update:website"));
  yield* Effect.log(ansis.green("  update:website completed."));
});

const verifyGitClean = Effect.gen(function*() {
  const ce = yield* CommandExecutor.CommandExecutor;
  const status = yield* ce.string(Command.make("git", "status", "--porcelain"));
  if (status.trim().length > 0) {
    yield* Effect.logWarning(
      ansis.yellow("Working tree has uncommitted changes. The release commit will include all staged changes."),
    );
  }
});

const program = Effect.gen(function*() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    yield* Effect.log(USAGE);
    return;
  }

  const input = args[0]!;
  yield* Effect.log(ansis.bold("Preparing release...\n"));

  // 1. Resolve the new version
  const newVersion = yield* resolveNewVersion(input);
  const tag = classifyVersion(newVersion);
  yield* Effect.log(`New version: ${ansis.bold.green(newVersion)} (${tag})\n`);

  // 2. Verify git status
  yield* verifyGitClean;

  // 3. Update VERSION file
  yield* updateVersionFile(newVersion);

  // 4. Run update scripts (version, readme, website)
  yield* runUpdateAll;

  // 5. Print summary and next steps
  const commitMessage = `release: ${newVersion}`;
  const npmTag = tag === "stable" ? "latest" : tag;

  yield* Effect.log(ansis.bold("\n--- Release preparation complete ---\n"));
  yield* Effect.log(`  Version:        ${ansis.green(newVersion)}`);
  yield* Effect.log(`  npm tag:        ${ansis.cyan(npmTag)}`);
  yield* Effect.log(`  Commit message: ${ansis.cyan(commitMessage)}`);
  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Next steps:"));
  yield* Effect.log("");
  yield* Effect.log(`  1. Review the changes:`);
  yield* Effect.log(`     ${ansis.dim("git diff")}`);
  yield* Effect.log("");
  yield* Effect.log(`  2. Stage and commit:`);
  yield* Effect.log(`     ${ansis.dim("git add -A")}`);
  yield* Effect.log(`     ${ansis.dim(`git commit -m "${commitMessage}"`)}`);
  yield* Effect.log("");
  yield* Effect.log(`  3. Push to main to trigger publishing:`);
  yield* Effect.log(`     ${ansis.dim("git push origin main")}`);
  yield* Effect.log("");
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
