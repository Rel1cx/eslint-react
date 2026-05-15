import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";

import * as Effect from "effect/Effect";
import * as NodeFs from "node:fs";
import * as NodePath from "node:path";

import { glob } from "./lib/glob";

/**
 * Cleanup script for vendored repositories under `.repos/`.
 *
 * Removes files and directories that have little reference value for coding agents
 * (CI configs, editor settings, lockfiles, media assets, build fixtures, devtools,
 * and peripheral/deprecated packages) while keeping core source code intact.
 *
 * **Note:** This cleanup is performed *after* the subtree is pulled. Subsequent
 * `git subtree pull` operations will restore the removed files, so you may need to
 * re-run this script after updating the vendored repository.
 *
 * Usage:
 *   vite-node ./scripts/cleanup-vendored-repositories.ts        # perform cleanup
 *   vite-node ./scripts/cleanup-vendored-repositories.ts --dry-run  # preview only
 */

const DRY_RUN = process.argv.includes("--dry-run");

const VENDORED_ROOT = ".repos/react";

/** Directories to remove entirely. */
const DIRECTORIES_TO_REMOVE = [
  // Root-level tooling / configuration
  ".claude",
  ".codesandbox",
  ".github",
  "flow-typed",
  // Large fixture directories (browser test environments, devtools fixtures, etc.)
  "fixtures",
  // React's own build / release / CI scripts
  "scripts",
  // Compiler tooling
  "compiler/apps",
  "compiler/.claude",
  "compiler/scripts",
  // React DevTools — independent product, not core runtime (saves ~6 MB)
  "packages/react-devtools",
  "packages/react-devtools-core",
  "packages/react-devtools-extensions",
  "packages/react-devtools-fusebox",
  "packages/react-devtools-inline",
  "packages/react-devtools-shared",
  "packages/react-devtools-shell",
  "packages/react-devtools-timeline",
  // Peripheral / internal / deprecated packages
  "packages/react-art",
  "packages/react-cache",
  "packages/react-debug-tools",
  "packages/react-flight-server-fb",
  "packages/react-markup",
  "packages/react-native-renderer",
  "packages/react-noop-renderer",
  "packages/react-server-dom-fb",
  "packages/react-suspense-test-utils",
  "packages/react-test-renderer",
  // Test utilities
  "packages/dom-event-testing-library",
  "packages/jest-react",
  "packages/internal-test-utils",
];

/** Specific files to remove. */
const FILES_TO_REMOVE = [
  // Root-level dotfiles / config
  ".editorconfig",
  ".eslintignore",
  ".eslintrc.js",
  ".git-blame-ignore-revs",
  ".gitattributes",
  ".gitignore",
  ".mailmap",
  ".nvmrc",
  ".prettierignore",
  ".prettierrc.js",
  ".watchmanconfig",
  // Governance / changelog docs
  "CHANGELOG.md",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "LICENSE",
  "MAINTAINERS",
  "SECURITY.md",
  "CLAUDE.md",
  // Build / CI / tooling files
  "babel.config.js",
  "babel.config-ts.js",
  "babel.config-react-compiler.js",
  "dangerfile.js",
  "flow-typed.config.json",
  "react.code-workspace",
  "ReactVersions.js",
  "yarn.lock",
  // Compiler root-level files
  "compiler/.eslintrc.js",
  "compiler/.gitignore",
  "compiler/CHANGELOG.md",
  "compiler/CLAUDE.md",
  "compiler/yarn.lock",
];

/** Glob patterns for files to remove across the entire vendored tree. */
const FILE_PATTERNS_TO_REMOVE = [
  "**/yarn.lock",
  "**/package-lock.json",
  "**/pnpm-lock.yaml",
  "**/*.png",
  "**/*.jpg",
  "**/*.jpeg",
  "**/*.gif",
  "**/*.svg",
  "**/*.mp4",
  "**/*.webm",
];

interface CleanupTarget {
  readonly type: "dir" | "file";
  readonly fullPath: string;
  readonly relativePath: string;
  readonly size: number;
}

/**
 * Check whether a relative path sits inside any directory that will be removed.
 * @param relativePath - The path relative to the vendored root to check.
 */
function isUnderRemovedDir(relativePath: string): boolean {
  return DIRECTORIES_TO_REMOVE.some(
    (dir) => relativePath === dir || relativePath.startsWith(`${dir}/`),
  );
}

/**
 * Recursively calculate the total byte size of a file or directory.
 * @param targetPath - The absolute path to the file or directory.
 */
function getSizeSync(targetPath: string): number {
  const stat = NodeFs.statSync(targetPath, { throwIfNoEntry: false });
  if (stat == null) return 0;
  if (stat.isFile()) return stat.size;
  if (stat.isDirectory()) {
    let total = 0;
    const entries = NodeFs.readdirSync(targetPath, { withFileTypes: true });
    for (const entry of entries) {
      total += getSizeSync(NodePath.join(targetPath, entry.name));
    }
    return total;
  }
  return 0;
}

function formatSize(bytes: number): string {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  if (bytes > 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;

  const rootExists = yield* fs.exists(VENDORED_ROOT);
  if (!rootExists) {
    yield* Effect.log(ansis.yellow(`⚠️  Vendored repository not found at ${VENDORED_ROOT}, skipping cleanup.`));
    return;
  }

  const targets: CleanupTarget[] = [];

  // 1. Explicit directories
  for (const dir of DIRECTORIES_TO_REMOVE) {
    const fullPath = path.join(VENDORED_ROOT, dir);
    const exists = yield* fs.exists(fullPath);
    if (exists) {
      const size = yield* Effect.sync(() => getSizeSync(fullPath));
      targets.push({ type: "dir", relativePath: dir, fullPath, size });
    }
  }

  // 2. Explicit files
  for (const file of FILES_TO_REMOVE) {
    if (isUnderRemovedDir(file)) continue;
    const fullPath = path.join(VENDORED_ROOT, file);
    const exists = yield* fs.exists(fullPath);
    if (exists) {
      const size = yield* Effect.sync(() => getSizeSync(fullPath));
      targets.push({ type: "file", relativePath: file, fullPath, size });
    }
  }

  // 3. Pattern-matched files
  const seenPaths = new Set(targets.map((t) => t.fullPath));
  for (const pattern of FILE_PATTERNS_TO_REMOVE) {
    const matches = glob([path.join(VENDORED_ROOT, pattern)]);
    for (const fullPath of matches) {
      if (seenPaths.has(fullPath)) continue;
      const relativePath = path.relative(VENDORED_ROOT, fullPath);
      if (isUnderRemovedDir(relativePath)) continue;
      const size = yield* Effect.sync(() => getSizeSync(fullPath));
      targets.push({ type: "file", relativePath, fullPath, size });
      seenPaths.add(fullPath);
    }
  }

  if (targets.length === 0) {
    yield* Effect.log(ansis.green("✅ Nothing to clean up. The vendored repository is already trimmed."));
    return;
  }

  const sorted = targets.toSorted((a, b) => b.size - a.size);
  const totalSize = sorted.reduce((sum, t) => sum + t.size, 0);
  const totalDirs = sorted.filter((t) => t.type === "dir").length;
  const totalFiles = sorted.filter((t) => t.type === "file").length;

  yield* Effect.log(ansis.bold(`Cleanup targets in ${VENDORED_ROOT}:`));
  yield* Effect.log(`  ${ansis.cyan(`${totalDirs} directories`)} + ${ansis.cyan(`${totalFiles} files`)}`);
  yield* Effect.log(`  Estimated savings: ${ansis.green(formatSize(totalSize))}`);
  yield* Effect.log("");

  // Print top items
  const previewLimit = 20;
  for (const t of sorted.slice(0, previewLimit)) {
    const icon = t.type === "dir" ? "📁" : "📄";
    yield* Effect.log(`  ${icon} ${t.relativePath} ${ansis.gray(`(${formatSize(t.size)})`)}`);
  }
  if (sorted.length > previewLimit) {
    yield* Effect.log(`  ... and ${sorted.length - previewLimit} more items`);
  }
  yield* Effect.log("");

  if (DRY_RUN) {
    yield* Effect.log(ansis.yellow("⚠️  Dry run mode — no files were actually deleted."));
    yield* Effect.log(ansis.gray("   Remove --dry-run to perform the cleanup."));
    return;
  }

  // Perform deletion
  let removedCount = 0;
  for (const t of sorted) {
    yield* fs.remove(t.fullPath, { recursive: true });
    removedCount++;
  }

  yield* Effect.log(ansis.green(`✅ Successfully removed ${removedCount} items.`));
  yield* Effect.log(ansis.green(`   Freed approximately ${formatSize(totalSize)}.`));
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
