import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import * as Effect from "effect/Effect";

// List of all sub-plugins that have their own directory under plugins/
const VALID_PLUGINS = ["x", "jsx", "rsc", "dom", "web-api", "naming-convention", "debug"] as const;

type PluginDomain = typeof VALID_PLUGINS[number];

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function buildPluginPrefix(domain: PluginDomain): string {
  return `react-${domain}`;
}

// Build the aggregated config key. The "x" domain is the core plugin and uses the
// flat "@eslint-react/<rule>" namespace; all other sub-plugins prefix with their domain.
function buildConfigKey(domain: PluginDomain, ruleName: string): string {
  if (domain === "x") return `@eslint-react/${ruleName}`;
  return `@eslint-react/${domain}-${ruleName}`;
}

function buildPluginPackageName(domain: PluginDomain): string {
  return `eslint-plugin-react-${domain}`;
}

function generateRuleTs(ruleName: string): string {
  return [
    `import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";`,
    ``,
    `import { createRule } from "../../utils";`,
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
    `  defaultOptions: [],`,
    `});`,
    ``,
    `export function create(context: RuleContext<MessageID, []>) {`,
    `  return merge({`,
    `    // TODO: Add AST visitor methods.`,
    `  });`,
    `}`,
    ``,
  ].join("\n");
}

function generateRuleSpecTs(ruleName: string): string {
  return [
    `import tsx from "dedent";`,
    ``,
    `import { ruleTester } from "../../../../../../test";`,
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
  const pluginPkgName = buildPluginPackageName(domain);
  const ruleSourceUrl =
    `https://github.com/Rel1cx/eslint-react/tree/main/plugins/${pluginPkgName}/src/rules/${ruleName}/${ruleName}.ts`;
  const testSourceUrl =
    `https://github.com/Rel1cx/eslint-react/tree/main/plugins/${pluginPkgName}/src/rules/${ruleName}/${ruleName}.spec.ts`;

  return [
    `---`,
    `title: ${ruleName}`,
    `description: ${description}`,
    `---`,
    ``,
    `**Full Name in [\`${pluginPkgName}\`](https://npmx.dev/package/${pluginPkgName}/v/latest)**`,
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
    `## Common Violations`,
    ``,
    `### Invalid`,
    ``,
    "```tsx",
    `// TODO: Add invalid examples.`,
    "```",
    ``,
    `## Resources`,
    ``,
    `- [Rule Source](${ruleSourceUrl})`,
    `- [Test Source](${testSourceUrl})`,
    ``,
  ].join("\n");
}

// Find where to insert the new rule import in plugin.ts, maintaining
// alphabetical order within the contiguous block of rule imports.
// Falls back to after the last import if no rule imports exist yet.
function findImportInsertionIndex(lines: string[], importLine: string): number {
  let lastRuleImportIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]!.startsWith("import ") && lines[i]!.includes("./rules/")) {
      lastRuleImportIndex = i;
    }
  }
  // No existing rule imports: insert after the last regular import
  if (lastRuleImportIndex === -1) {
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i]!.startsWith("import ")) return i + 1;
    }
    return 0;
  }
  // Find the start of the contiguous rule-import block
  let firstRuleImportIndex = lastRuleImportIndex;
  for (let i = lastRuleImportIndex; i >= 0; i--) {
    if (lines[i]!.startsWith("import ") && lines[i]!.includes("./rules/")) {
      firstRuleImportIndex = i;
    } else if (!lines[i]!.startsWith("import ") && lines[i]!.trim() !== "" && !lines[i]!.startsWith("//")) {
      break;
    }
  }
  // Insert in alphabetical order within the rule-import block
  for (let i = firstRuleImportIndex; i <= lastRuleImportIndex; i++) {
    if (lines[i]!.startsWith("import ") && lines[i]!.includes("./rules/")) {
      if (importLine.localeCompare(lines[i]!) < 0) return i;
    }
  }
  return lastRuleImportIndex + 1;
}

// Find where to insert the new rule entry inside the `rules: { ... }` object
// in plugin.ts, maintaining alphabetical order by rule name.
// Uses brace-depth tracking to locate the rules object boundaries,
// then scans entries within to find the correct insertion point.
function findRulesEntryInsertionIndex(lines: string[], entryKey: string): number {
  // Locate the opening of the `rules: { ... }` object
  let rulesStartIndex = -1;
  let rulesEndIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*rules:\s*\{/u.test(lines[i]!)) {
      rulesStartIndex = i;
      break;
    }
  }
  if (rulesStartIndex === -1) return -1;
  // Find the matching closing brace via depth tracking
  let depth = 0;
  for (let i = rulesStartIndex; i < lines.length; i++) {
    for (const ch of lines[i]!) {
      if (ch === "{") depth += 1;
      if (ch === "}") depth -= 1;
    }
    if (depth === 0) {
      rulesEndIndex = i;
      break;
    }
  }
  if (rulesEndIndex === -1) return -1;
  // Insert in alphabetical order, skipping blank lines and comments
  for (let i = rulesStartIndex + 1; i < rulesEndIndex; i++) {
    const line = lines[i]!.trim();
    if (line === "" || line.startsWith("//") || line.startsWith("/*")) continue;
    const keyMatch = /^(?:\[?")?([^"[\]]+)(?:"\]?)?:/u.exec(line);
    if (keyMatch?.[1] != null) {
      if (entryKey.localeCompare(keyMatch[1]) < 0) return i;
    }
  }
  return rulesEndIndex;
}

const parseArgs = Effect.gen(function*() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    yield* Effect.logError(
      ansis.red(
        `Usage: tsx ./scripts/scaffold-rule.ts <plugin> <rule-name> [description]\n`
          + `  plugin: ${VALID_PLUGINS.join(", ")}\n`
          + `  rule-name: kebab-case rule name (e.g. no-foo-bar)\n`
          + `  description: optional rule description`,
      ),
    );
    return yield* Effect.fail(new Error("Missing required arguments."));
  }

  const [pluginArg, ruleName, ...descParts] = args as [string, string, ...string[]];
  const description = descParts.join(" ") || "TODO: Add rule description.";

  if (!VALID_PLUGINS.includes(pluginArg as PluginDomain)) {
    return yield* Effect.fail(
      new Error(`Invalid plugin "${pluginArg}". Must be one of: ${VALID_PLUGINS.join(", ")}`),
    );
  }

  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/u.test(ruleName)) {
    return yield* Effect.fail(
      new Error(`Invalid rule name "${ruleName}". Must be kebab-case (e.g. no-foo-bar).`),
    );
  }

  return { domain: pluginArg as PluginDomain, ruleName, description };
});

const createRuleFiles = Effect.fnUntraced(
  function*(domain: PluginDomain, ruleName: string, description: string) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const pluginPkgName = buildPluginPackageName(domain);
    const pluginDir = path.join("plugins", pluginPkgName);
    const rulesDir = path.join(pluginDir, "src", "rules", ruleName);

    const exists = yield* fs.exists(rulesDir);
    if (exists) {
      return yield* Effect.fail(new Error(`Rule directory already exists: ${rulesDir}`));
    }

    yield* fs.makeDirectory(rulesDir, { recursive: true });
    yield* Effect.log(ansis.green(`  Created ${rulesDir}/`));

    const ruleTsPath = path.join(rulesDir, `${ruleName}.ts`);
    yield* fs.writeFileString(ruleTsPath, generateRuleTs(ruleName));
    yield* Effect.log(ansis.green(`  Created ${ruleTsPath}`));

    const ruleSpecTsPath = path.join(rulesDir, `${ruleName}.spec.ts`);
    yield* fs.writeFileString(ruleSpecTsPath, generateRuleSpecTs(ruleName));
    yield* Effect.log(ansis.green(`  Created ${ruleSpecTsPath}`));

    const ruleMdxPath = path.join(rulesDir, `${ruleName}.mdx`);
    yield* fs.writeFileString(ruleMdxPath, generateRuleMdx(domain, ruleName, description));
    yield* Effect.log(ansis.green(`  Created ${ruleMdxPath}`));

    return { pluginDir, pluginTsPath: path.join(pluginDir, "src", "plugin.ts"), rulesDir };
  },
);

const updatePluginTs = Effect.fnUntraced(
  function*(pluginTsPath: string, ruleName: string) {
    const fs = yield* FileSystem.FileSystem;
    const content = yield* fs.readFileString(pluginTsPath, "utf8");
    const lines = content.split("\n");

    const camelName = kebabToCamel(ruleName);
    const importLine = `import ${camelName} from "./rules/${ruleName}/${ruleName}";`;
    const rulesEntry = `    "${ruleName}": ${camelName},`;

    const importIndex = findImportInsertionIndex(lines, importLine);
    lines.splice(importIndex, 0, importLine);

    const entryIndex = findRulesEntryInsertionIndex(lines, ruleName);
    if (entryIndex === -1) {
      return yield* Effect.fail(new Error(`Could not find rules object in ${pluginTsPath}`));
    }
    lines.splice(entryIndex, 0, rulesEntry);

    yield* fs.writeFileString(pluginTsPath, lines.join("\n"));
    yield* Effect.log(ansis.green(`  Updated ${pluginTsPath}`));
  },
);

const program = Effect.gen(function*() {
  const { domain, ruleName, description } = yield* parseArgs;
  const pluginPkgName = buildPluginPackageName(domain);

  yield* Effect.log(ansis.bold(`Scaffolding rule ${ansis.cyan(ruleName)} in ${ansis.cyan(pluginPkgName)}...`));

  const { pluginTsPath } = yield* createRuleFiles(domain, ruleName, description);
  yield* updatePluginTs(pluginTsPath, ruleName);

  yield* Effect.log(ansis.bold.green(`Rule ${ruleName} scaffolded successfully!`));
  yield* Effect.log(ansis.bold("Next steps:"));
  yield* Effect.log(`  1. Implement the rule logic in plugins/${pluginPkgName}/src/rules/${ruleName}/${ruleName}.ts`);
  yield* Effect.log(`  2. Add test cases in plugins/${pluginPkgName}/src/rules/${ruleName}/${ruleName}.spec.ts`);
  yield* Effect.log(`  3. Write documentation in plugins/${pluginPkgName}/src/rules/${ruleName}/${ruleName}.mdx`);
  yield* Effect.log(`  4. Add the rule to the appropriate preset configs if needed`);
  yield* Effect.log(`  5. Run ${ansis.cyan("pnpm run build")} and ${ansis.cyan("pnpm run test")} to verify`);
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
