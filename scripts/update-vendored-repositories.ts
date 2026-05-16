import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Command from "@effect/platform/Command";
import * as CommandExecutor from "@effect/platform/CommandExecutor";
import * as FileSystem from "@effect/platform/FileSystem";
import ansis from "ansis";
import * as Effect from "effect/Effect";

/**
 * Update script for vendored repositories under `.repos/`.
 *
 * Pulls the latest changes for each configured subtree using shallow fetches,
 * then automatically runs the cleanup script to trim unnecessary files.
 *
 * Usage:
 *   vite-node ./scripts/update-vendored-repositories.ts
 *   vite-node ./scripts/update-vendored-repositories.ts --dry-run
 */

const DRY_RUN = process.argv.includes("--dry-run");

function checkWorkingTreeClean() {
  return Effect.gen(function*() {
    const ce = yield* CommandExecutor.CommandExecutor;
    const exitCode = yield* ce.exitCode(
      Command.make("git", "diff-index", "--quiet", "HEAD", "--"),
    );
    if (exitCode !== 0) {
      yield* Effect.log(
        ansis.red("✗ Working tree has modifications. Commit or stash them before updating subtrees."),
      );
      return yield* Effect.fail(new Error("Dirty working tree"));
    }
  });
}

interface VendoredRepo {
  readonly name: string;
  readonly branch: string;
  readonly prefix: string;
  readonly url: string;
  /** Optional pinned commit SHA to verify after fetch */
  readonly commit?: string;
}

const REPOSITORIES: readonly VendoredRepo[] = [
  {
    name: "facebook/react",
    prefix: ".repos/react",
    url: "https://github.com/facebook/react.git",
    branch: "main",
    commit: "f2bbb2770407b8045b229d7e95f8be44b3c65894",
  },
];

function pullSubtree(repo: VendoredRepo) {
  return Effect.gen(function*() {
    const ce = yield* CommandExecutor.CommandExecutor;
    const fs = yield* FileSystem.FileSystem;

    yield* Effect.log(ansis.bold(`\n▶ Updating ${repo.name}`));
    yield* Effect.log(`  prefix: ${repo.prefix}`);
    yield* Effect.log(`  url:    ${repo.url}`);
    yield* Effect.log(`  branch: ${repo.branch}`);

    // Verify the subtree directory exists
    const exists = yield* fs.exists(repo.prefix);
    if (!exists) {
      yield* Effect.log(
        ansis.yellow(`  ⚠️  Subtree not found at ${repo.prefix}. Skipping. Run the add command first.`),
      );
      return false;
    }

    if (DRY_RUN) {
      yield* Effect.log(ansis.yellow("  ⚠️  Dry run — no commands were executed."));
      return false;
    }

    // 1. Shallow fetch
    yield* Effect.log(ansis.gray("  → Fetching latest commit (depth=1)..."));
    const fetchResult = yield* ce.exitCode(
      Command.make("git", "fetch", "--depth=1", repo.url, repo.branch),
    );
    if (fetchResult !== 0) {
      yield* Effect.log(ansis.red(`  ✗ git fetch failed with exit code ${fetchResult}`));
      return false;
    }
    const fetchedCommit = (yield* ce.string(
      Command.make("git", "rev-parse", "FETCH_HEAD"),
    )).trim();
    if (repo.commit && fetchedCommit !== repo.commit) {
      yield* Effect.log(
        ansis.red(
          `  ✗ Fetched commit ${fetchedCommit} does not match pinned commit ${repo.commit}. Update the commit field in the script to intentionally upgrade.`,
        ),
      );
      return false;
    }
    yield* Effect.log(ansis.green(`  ✓ Fetched ${fetchedCommit.slice(0, 7)}`));

    // 2. Subtree pull
    yield* Effect.log(ansis.gray("  → Pulling subtree..."));
    const pullResult = yield* ce.exitCode(
      Command.make(
        "git",
        "subtree",
        "pull",
        `--prefix=${repo.prefix}`,
        repo.url,
        repo.branch,
        "--squash",
      ),
    );
    if (pullResult !== 0) {
      // Check for unresolved merge conflicts
      const conflictFiles = yield* ce.string(
        Command.make("git", "diff", "--name-only", "--diff-filter=U"),
      );
      if (conflictFiles.trim().length > 0) {
        yield* Effect.log(
          ansis.yellow(`  ⚠️  Merge conflicts detected. Resolving with -X theirs strategy...`),
        );
        // Accept all upstream (theirs) changes for the subtree
        yield* ce.exitCode(Command.make("git", "checkout", "--theirs", "--", repo.prefix));
        yield* ce.exitCode(Command.make("git", "add", "--", repo.prefix));
        // Complete the merge
        const commitResult = yield* ce.exitCode(
          Command.make("git", "commit", "-m", `Merge subtree update for ${repo.prefix}`),
        );
        if (commitResult !== 0) {
          yield* Effect.log(ansis.red(`  ✗ Failed to commit merge resolution`));
          return false;
        }
        yield* Effect.log(ansis.green("  ✓ Subtree updated (conflicts auto-resolved with -X theirs)"));
        return true;
      }
      yield* Effect.log(ansis.red(`  ✗ git subtree pull failed with exit code ${pullResult}`));
      return false;
    }
    yield* Effect.log(ansis.green("  ✓ Subtree updated"));

    return true;
  });
}

function runCleanup() {
  return Effect.gen(function*() {
    const ce = yield* CommandExecutor.CommandExecutor;

    yield* Effect.log(ansis.bold("\n▶ Running cleanup script"));

    if (DRY_RUN) {
      yield* Effect.log(ansis.yellow("  ⚠️  Dry run — skipping cleanup."));
      return;
    }

    const result = yield* ce.exitCode(
      Command.make("vite-node", "./scripts/cleanup-vendored-repositories.ts"),
    );

    if (result !== 0) {
      yield* Effect.log(ansis.red(`  ✗ Cleanup script exited with code ${result}`));
      return yield* Effect.fail(new Error("Cleanup script failed"));
    }

    yield* Effect.log(ansis.green("  ✓ Cleanup completed"));
  });
}

const program = Effect.gen(function*() {
  if (REPOSITORIES.length === 0) {
    yield* Effect.log(ansis.yellow("No vendored repositories configured."));
    return;
  }

  yield* checkWorkingTreeClean();

  yield* Effect.log(
    ansis.bold(`Updating ${REPOSITORIES.length} vendored repository(s)...`),
  );

  const results = yield* Effect.all(
    REPOSITORIES.map(pullSubtree),
    { concurrency: 1 }, // serial: subtrees share git state
  );

  const updatedCount = results.filter(Boolean).length;

  if (updatedCount === 0) {
    yield* Effect.log(ansis.yellow("\nNo repositories were updated."));
    return;
  }

  // Run cleanup after all successful pulls
  yield* runCleanup();

  yield* Effect.log(ansis.bold(`\n✅ Done. ${updatedCount} repository(s) updated.`));
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
