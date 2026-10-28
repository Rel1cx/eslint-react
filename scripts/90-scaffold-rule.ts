import * as NodeRtm from "@effect/platform-node/NodeRuntime";
import * as NodeSrv from "@effect/platform-node/NodeServices";
import ansis from "ansis";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { DOMAIN_META_BY_KEY, PLUGIN_DOMAINS, type PluginDomain, buildConfigKey, buildPluginPrefix } from "./00-constants";

/**
 * Scaffolds a new rule for one of the plugin packages:
 *   1. creates `<rule>.ts` / `<rule>.spec.ts` / `<rule>.mdx` under `src/rules/<rule>/`
 *   2. registers the rule in the plugin's `src/plugin.ts` (import + `rules` entry)
 *
 * Must be run from the repository root.
 *
 * The line-editing helpers below assume `plugin.ts` contains:
 *   - one `import <camelName> from "./rules/<rule-name>/<rule-name>";` line per rule
 *   - a `rules: { ... }` object with one entry per line
 *   - rule imports and rules entries sorted alphabetically
 */

class ScaffoldError extends Data.Error<{ readonly message: string }> {}

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function generateRuleTs(ruleName: string): string {
  return [
    `import { type RuleContext, type RuleFeature } from "@eslint-react/eslint";`,
    ``,
    `import { createRule } from "@/utils/create-rule";`,
    ``,
    `export const RULE_NAME = "${ruleName}";`,
    ``,
    `export const RULE_FEATURES = [] as const satisfies RuleFeature[];`,
    ``,
    `export type MessageID = "default";`,
    ``,
    `export default createRule<[], MessageID>({`,
    `  meta: {`,
    `    type: "problem",`,
    `    docs: {`,
    `      description: "TODO: Add rule description.",`,
    `    },`,
    `    messages: {`,
    `      default: "TODO: Add error message.",`,
    `    },`,
    `    schema: [],`,
    `  },`,
    `  name: RULE_NAME,`,
    `  create,`,
    `});`,
    ``,
    `export function create(context: RuleContext<MessageID, []>) {`,
    `  return {`,
    `    // TODO: Add AST visitor methods.`,
    `  };`,
    `}`,
    ``,
  ].join("\n");
}

function generateRuleSpecTs(ruleName: string): string {
  return [
    `import tsx from "dedent";`,
    ``,
    `import { ruleTester } from "@local/testkit";`,
    `import rule, { RULE_NAME } from "./${ruleName}";`,
    ``,
    `ruleTester.run(RULE_NAME, rule, {`,
    `  invalid: [`,
    `    // TODO: Add invalid test cases.`,
    `  ],`,
    `  valid: [`,
    `    // TODO: Add valid test cases.`,
    `  ],`,
    `});`,
    ``,
  ].join("\n");
}

function generateRuleMdx(domain: PluginDomain, ruleName: string, description: string): string {
  const pluginPrefix = buildPluginPrefix(domain);
  const aggregatedKey = buildConfigKey(domain, ruleName);
  const pluginPkgName = DOMAIN_META_BY_KEY[domain].packageName;
  const pluginPkgUrl = `https://npmx.dev/package/${pluginPkgName}/v/latest`;
  const ruleDirUrl = `https://github.com/Rel1cx/eslint-react/tree/main/plugins/${pluginPkgName}/src/rules/${ruleName}`;

  return [
    `---`,
    `title: ${ruleName}`,
    // `JSON.stringify` produces a valid double-quoted YAML scalar for the frontmatter.
    `description: ${JSON.stringify(description)}`,
    `---`,
    ``,
    `**Full Name in [\`${pluginPkgName}\`](${pluginPkgUrl})**`,
    ``,
    "```plain copy",
    `${pluginPrefix}/${ruleName}`,
    "```",
    ``,
    `**Full Name in [\`@eslint-react/eslint-plugin\`](https://npmx.dev/package/@eslint-react/eslint-plugin/v/latest)**`,
    ``,
    "```plain copy",
    `${aggregatedKey}`,
    "```",
    ``,
    `## Rule Details`,
    ``,
    `TODO: Add rule details.`,
    ``,
    `## Examples`,
    ``,
    `### TODO: Add scenario title`,
    ``,
    `<!-- Describe the situation/context where the problematic pattern occurs -->`,
    ``,
    "```tsx",
    `// 🔴 Problem: Explain why this pattern is problematic`,
    "```",
    ``,
    `### TODO: Add scenario title`,
    ``,
    `<!-- Describe the recommended approach for this situation -->`,
    ``,
    "```tsx",
    `// 🟢 Recommended: Explain the correct pattern`,
    "```",
    ``,
    `### TODO: Add scenario title (optional)`,
    ``,
    `<!-- Describe cases where the pattern is acceptable -->`,
    ``,
    "```tsx",
    `// 🔵 OK: Explain when this pattern is fine`,
    "```",
    ``,
    `## Troubleshooting`,
    ``,
    `<!-- Optional: Address common questions or edge cases -->`,
    ``,
    `### Why is this pattern problematic?`,
    ``,
    `TODO: Add explanation.`,
    ``,
    `## Resources`,
    ``,
    `- [Rule Source](${ruleDirUrl}/${ruleName}.ts)`,
    `- [Test Source](${ruleDirUrl}/${ruleName}.spec.ts)`,
    ``,
    `## Further Reading`,
    ``,
    `- [React Docs: TODO](https://react.dev/...)`,
    `<!-- Links to relevant React documentation -->`,
    // Keep this trailing empty line: it preserves the final newline in the generated file.
    ``,
  ].join("\n");
}

const isImportLine = (line: string): boolean => line.startsWith("import ");
const isRuleImportLine = (line: string): boolean => isImportLine(line) && line.includes("./rules/");

/**
 * Regular expression for matching the line that opens the `rules: { ... }` object.
 * No `g` flag: `.test()` must stay stateless.
 */
const RE_RULES_OBJECT = /^\s*rules:\s*\{/u;

/**
 * Regular expression for matching a rule entry line,
 * e.g. `"no-foo": noFoo,` / `noFoo: noFoo,` / `["no-foo"]: noFoo,`.
 * No `g` flag: `.exec()` must stay stateless.
 */
const RE_RULE_ENTRY_KEY = /^(?:\[?")?([^"[\]]+)(?:"\]?)?:/u;

// Keep `localeCompare` (not `<`) to preserve the existing ordering semantics.
const isAlphabeticallyBefore = (a: string, b: string): boolean => a.localeCompare(b) < 0;

// Locate the insertion point for a new rule import in plugin.ts.
// Rule imports form a contiguous block; insert in alphabetical order within it,
// or after the last import when no rule imports exist yet.
function findRuleImportInsertionIndex(lines: readonly string[], importLine: string): number {
  const ruleImportIndices: number[] = [];
  for (const [i, line] of lines.entries()) {
    if (isRuleImportLine(line)) ruleImportIndices.push(i);
  }

  if (ruleImportIndices.length === 0) {
    const lastImportIndex = lines.findLastIndex(isImportLine);
    return lastImportIndex === -1 ? 0 : lastImportIndex + 1;
  }

  const lastRuleImportIndex = ruleImportIndices[ruleImportIndices.length - 1]!;

  // Walk back over the contiguous block: rule imports, other imports, blank lines, `//` comments.
  let firstRuleImportIndex = lastRuleImportIndex;
  for (let i = lastRuleImportIndex; i >= 0; i--) {
    const line = lines[i]!;
    if (isRuleImportLine(line)) {
      firstRuleImportIndex = i;
    } else if (!isImportLine(line) && line.trim() !== "" && !line.startsWith("//")) {
      break;
    }
  }

  // Comparing full lines is equivalent to comparing identifiers here,
  // because all rule import lines share the same `import ` prefix.
  const insertIndex = ruleImportIndices.find(
    (i) => i >= firstRuleImportIndex && isAlphabeticallyBefore(importLine, lines[i]!),
  );
  return insertIndex ?? lastRuleImportIndex + 1;
}

// Returns the index of the line containing the `}` that closes the `{` opened
// on `openLineIndex`, or -1 if it is never closed.
// Every brace character is counted, including ones inside strings and comments;
// that is intentionally the behavior this script has always relied on.
function findClosingBraceLine(lines: readonly string[], openLineIndex: number): number {
  let depth = 0;
  for (let i = openLineIndex; i < lines.length; i++) {
    for (const ch of lines[i]!) {
      if (ch === "{") depth += 1;
      if (ch === "}") depth -= 1;
    }
    if (depth === 0) return i;
  }
  return -1;
}

// Locate the line where the new `"rule-name": ruleName,` entry belongs inside
// the `rules: { ... }` object of plugin.ts. Returns -1 when that object is missing.
function findRuleEntryInsertionIndex(lines: readonly string[], ruleName: string): number {
  const rulesStartIndex = lines.findIndex((line) => RE_RULES_OBJECT.test(line));
  if (rulesStartIndex === -1) return -1;

  const rulesEndIndex = findClosingBraceLine(lines, rulesStartIndex);
  if (rulesEndIndex === -1) return -1;

  // Entries are sorted alphabetically; skip blank lines and comments.
  for (let i = rulesStartIndex + 1; i < rulesEndIndex; i++) {
    const line = lines[i]!.trim();
    if (line === "" || line.startsWith("//") || line.startsWith("/*")) continue;
    const existingKey = RE_RULE_ENTRY_KEY.exec(line)?.[1];
    if (existingKey != null && isAlphabeticallyBefore(ruleName, existingKey)) return i;
  }
  return rulesEndIndex;
}

function isPluginDomain(value: string): value is PluginDomain {
  return PLUGIN_DOMAINS.some((domain) => domain === value);
}

const USAGE = [
  "Usage: nub ./scripts/90-scaffold-rule.ts <plugin> <rule-name> [description]",
  `  plugin: ${PLUGIN_DOMAINS.join(", ")}`,
  "  rule-name: kebab-case rule name (e.g. no-foo-bar)",
  "  description: optional rule description",
].join("\n");

const parseArgs = Effect.gen(function*() {
  const [pluginArg, ruleName, ...descParts] = process.argv.slice(2);

  if (pluginArg == null || ruleName == null) {
    return yield* new ScaffoldError({ message: `Missing required arguments.\n${USAGE}` });
  }

  // Keep `||`: an all-empty description must still fall back to the TODO text.
  const description = descParts.join(" ") || "TODO: Add rule description.";

  if (!isPluginDomain(pluginArg)) {
    return yield* new ScaffoldError({ message: `Invalid plugin "${pluginArg}". Must be one of: ${PLUGIN_DOMAINS.join(", ")}` });
  }

  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/u.test(ruleName)) {
    return yield* new ScaffoldError({ message: `Invalid rule name "${ruleName}". Must be kebab-case (e.g. no-foo-bar).` });
  }

  return { domain: pluginArg, ruleName, description };
});

const writeCreatedFile = Effect.fnUntraced(
  function*(filePath: string, content: string) {
    const fs = yield* FileSystem.FileSystem;
    yield* fs.writeFileString(filePath, content);
    yield* Effect.log(ansis.green(`  Created ${filePath}`));
  },
);

const createRuleFiles = Effect.fnUntraced(
  function*(domain: PluginDomain, ruleName: string, description: string) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const pluginPkgName = DOMAIN_META_BY_KEY[domain].packageName;
    const rulesDir = path.join("plugins", pluginPkgName, "src", "rules", ruleName);

    if (yield* fs.exists(rulesDir)) {
      return yield* new ScaffoldError({ message: `Rule directory already exists: ${rulesDir}` });
    }

    yield* fs.makeDirectory(rulesDir, { recursive: true });
    yield* Effect.log(ansis.green(`  Created ${rulesDir}/`));

    yield* writeCreatedFile(path.join(rulesDir, `${ruleName}.ts`), generateRuleTs(ruleName));
    yield* writeCreatedFile(path.join(rulesDir, `${ruleName}.spec.ts`), generateRuleSpecTs(ruleName));
    yield* writeCreatedFile(path.join(rulesDir, `${ruleName}.mdx`), generateRuleMdx(domain, ruleName, description));

    return path.join("plugins", pluginPkgName, "src", "plugin.ts");
  },
);

const updatePluginTs = Effect.fnUntraced(
  function*(pluginTsPath: string, ruleName: string) {
    const fs = yield* FileSystem.FileSystem;
    const lines = (yield* fs.readFileString(pluginTsPath, "utf8")).split("\n");

    const camelName = kebabToCamel(ruleName);
    const importLine = `import ${camelName} from "./rules/${ruleName}/${ruleName}";`;
    // 4-space indent matches the existing entries inside `rules: { ... }`.
    const ruleEntryLine = `    "${ruleName}": ${camelName},`;

    const importIndex = findRuleImportInsertionIndex(lines, importLine);
    const entryIndex = findRuleEntryInsertionIndex(lines, ruleName);
    if (entryIndex === -1) {
      return yield* new ScaffoldError({ message: `Could not find rules object in ${pluginTsPath}` });
    }

    // Insert the later line first so the earlier index stays valid.
    lines.splice(entryIndex, 0, ruleEntryLine);
    lines.splice(importIndex, 0, importLine);

    yield* fs.writeFileString(pluginTsPath, lines.join("\n"));
    yield* Effect.log(ansis.green(`  Updated ${pluginTsPath}`));
  },
);

const program = Effect.gen(function*() {
  const { domain, ruleName, description } = yield* parseArgs;
  const pluginPkgName = DOMAIN_META_BY_KEY[domain].packageName;
  const ruleDir = `plugins/${pluginPkgName}/src/rules/${ruleName}`;

  yield* Effect.log(ansis.bold(`Scaffolding rule ${ansis.cyan(ruleName)} in ${ansis.cyan(pluginPkgName)}...`));

  const pluginTsPath = yield* createRuleFiles(domain, ruleName, description);
  yield* updatePluginTs(pluginTsPath, ruleName);

  yield* Effect.log(ansis.bold.green(`Rule ${ruleName} scaffolded successfully!`));
  yield* Effect.log(ansis.bold("Next steps:"));
  yield* Effect.log(`  1. Implement the rule logic in ${ruleDir}/${ruleName}.ts`);
  yield* Effect.log(`  2. Add test cases in ${ruleDir}/${ruleName}.spec.ts`);
  yield* Effect.log(`  3. Write documentation in ${ruleDir}/${ruleName}.mdx`);
  yield* Effect.log(`  4. Add the rule to the appropriate preset configs if needed`);
  yield* Effect.log(`  5. Run ${ansis.cyan("node --run build")} and ${ansis.cyan("node --run test")} to verify`);
});

program.pipe(Effect.provide(NodeSrv.layer), NodeRtm.runMain);
