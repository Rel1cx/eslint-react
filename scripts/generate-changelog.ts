import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as Command from "@effect/platform/Command";
import * as CommandExecutor from "@effect/platform/CommandExecutor";
import * as FileSystem from "@effect/platform/FileSystem";
import ansis from "ansis";
import * as Effect from "effect/Effect";

import { version } from "./lib/version";

const CHANGELOG_PATH = "CHANGELOG.md";

const CATEGORY_MAP: Record<string, { emoji: string; heading: string }> = {
  feat: { emoji: "✨", heading: "New" },
  fix: { emoji: "🐞", heading: "Fixes" },
  perf: { emoji: "🪄", heading: "Improvements" },
  refactor: { emoji: "🪄", heading: "Improvements" },
  docs: { emoji: "📝", heading: "Documentation" },
  breaking: { emoji: "💥", heading: "Breaking Changes" },
};

const CATEGORY_ORDER = ["breaking", "feat", "fix", "perf", "docs"] as const;

interface ParsedCommit {
  category: string;
  hash: string;
  isBreaking: boolean;
  message: string;
  scope: string | undefined;
}

function parseCommitLine(line: string): ParsedCommit | undefined {
  // Format: "<hash> <type>(<scope>): <message>" or "<hash> <type>: <message>"
  // eslint-disable-next-line regexp/no-super-linear-backtracking
  const match = /^([a-f0-9]+)\s+(\w+)(?:\(([^)]*)\))?(!)?:\s*(.+)$/u.exec(line.trim());
  if (match == null) return undefined;
  const [, hash, type, scope, bang, message] = match;
  if (hash == null || type == null || message == null) return undefined;
  const isBreaking = bang === "!";
  const category = isBreaking ? "breaking" : type;
  return { category, scope, message, hash, isBreaking };
}

function groupCommits(commits: ParsedCommit[]): Map<string, ParsedCommit[]> {
  const groups = new Map<string, ParsedCommit[]>();
  for (const commit of commits) {
    const key = commit.isBreaking ? "breaking" : commit.category;
    const list = groups.get(key) ?? [];
    list.push(commit);
    groups.set(key, list);
  }
  return groups;
}

function formatDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatCommit(commit: ParsedCommit): string {
  const scope = commit.scope != null ? `**${commit.scope}:** ` : "";
  return `- ${scope}${commit.message} (\`${commit.hash}\`)`;
}

function generateChangelogEntry(ver: string, grouped: Map<string, ParsedCommit[]>): string {
  const lines: string[] = [];

  lines.push(`## v${ver} (${formatDate()})`);
  lines.push("");

  for (const category of CATEGORY_ORDER) {
    const commits = grouped.get(category);
    if (commits == null || commits.length === 0) continue;
    const meta = CATEGORY_MAP[category];
    if (meta == null) continue;
    lines.push(`### ${meta.emoji} ${meta.heading}`);
    lines.push("");
    for (const commit of commits) {
      lines.push(formatCommit(commit));
    }
    lines.push("");
  }

  lines.push(
    `**Full Changelog**: https://github.com/Rel1cx/eslint-react/compare/v<previous>...v${ver}`,
  );
  lines.push("");

  return lines.join("\n");
}

const getFromVersion = Effect.gen(function*() {
  const args = process.argv.slice(2);
  if (args[0] != null && args[0].length > 0) {
    return args[0].replace(/^v/, "");
  }
  // Try to find the latest git tag
  const ce = yield* CommandExecutor.CommandExecutor;
  const tags = yield* ce.string(Command.make("git", "tag", "--sort=-v:refname", "--list", "v*")).pipe(
    Effect.map((s) => s.trim()),
    Effect.catchAll(() => Effect.succeed("")),
  );
  const latestTag = tags.split("\n").at(0)?.trim() ?? "";
  if (latestTag.length === 0) {
    return yield* Effect.fail(
      new Error("No git tags found. Please specify a from-version: tsx ./scripts/generate-changelog.ts <from-version>"),
    );
  }
  return latestTag;
});

const getCommitsSince = Effect.fnUntraced(
  function*(ref: string) {
    const ce = yield* CommandExecutor.CommandExecutor;
    const output = yield* ce.string(
      Command.make("git", "log", `${ref}..HEAD`, "--oneline", "--no-merges", "--pretty=format:%h %s"),
    ).pipe(
      Effect.map((s) => s.trim()),
      Effect.catchAll(() => Effect.succeed("")),
    );
    if (output.length === 0) return [];
    return output.split("\n").filter((line) => line.trim().length > 0);
  },
);

const program = Effect.gen(function*() {
  yield* Effect.log(ansis.bold("Generating changelog entry...\n"));

  const currentVersion = yield* version;
  yield* Effect.log(`Current version: ${ansis.bold(currentVersion)}`);

  const fromVersion = yield* getFromVersion;
  yield* Effect.log(`Collecting commits since: ${ansis.bold(fromVersion)}\n`);

  const commitLines = yield* getCommitsSince(fromVersion);
  if (commitLines.length === 0) {
    yield* Effect.logWarning(ansis.yellow("No commits found since the specified version."));
    return;
  }
  yield* Effect.log(`Found ${ansis.bold(commitLines.length.toString())} commit(s).\n`);

  const parsed: ParsedCommit[] = [];
  const skipped: string[] = [];
  for (const line of commitLines) {
    const commit = parseCommitLine(line);
    if (commit != null) {
      parsed.push(commit);
    } else {
      skipped.push(line);
    }
  }

  if (skipped.length > 0) {
    yield* Effect.log(ansis.yellow(`Skipped ${skipped.length} non-conventional commit(s):`));
    for (const line of skipped) {
      yield* Effect.log(ansis.dim(`  ${line}`));
    }
    yield* Effect.log("");
  }

  if (parsed.length === 0) {
    yield* Effect.logWarning(ansis.yellow("No conventional commits found to generate changelog from."));
    return;
  }

  const grouped = groupCommits(parsed);
  const entry = generateChangelogEntry(currentVersion, grouped);

  yield* Effect.log(ansis.bold("Generated changelog entry:\n"));
  yield* Effect.log(ansis.cyan(entry));

  // Prepend to CHANGELOG.md
  const fs = yield* FileSystem.FileSystem;
  const existingChangelog = yield* fs.readFileString(CHANGELOG_PATH, "utf8").pipe(
    Effect.catchAll(() => Effect.succeed("")),
  );

  const marker = "# Changelog";
  const hasMarker = existingChangelog.startsWith(marker);
  const newChangelog = hasMarker
    ? `${marker}\n\n${entry}\n${existingChangelog.slice(marker.length + 1)}`
    : `${marker}\n\n${entry}\n${existingChangelog}`;

  yield* fs.writeFileString(CHANGELOG_PATH, newChangelog);
  yield* Effect.log(ansis.bold.green(`\nChangelog entry prepended to ${CHANGELOG_PATH}.`));
  yield* Effect.log(ansis.yellow("Please review and edit the generated entry before committing."));
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
