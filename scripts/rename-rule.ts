import * as NodeContext from "@effect/platform-node/NodeContext";
import * as NodeRuntime from "@effect/platform-node/NodeRuntime";
import * as FileSystem from "@effect/platform/FileSystem";
import * as Path from "@effect/platform/Path";
import ansis from "ansis";
import * as Effect from "effect/Effect";

import { glob } from "./lib/glob";

const VALID_PLUGINS = ["x", "jsx", "rsc", "dom", "web-api", "naming-convention", "debug"] as const;

type PluginDomain = typeof VALID_PLUGINS[number];

const USAGE = [
  "Usage: tsx ./scripts/rename-rule.ts <plugin> <old-name> <new-name>",
  "",
  "Arguments:",
  "  plugin     Plugin domain: x, dom, jsx, rsc, web-api, naming-convention, debug",
  "  old-name   Current rule name (kebab-case, e.g. no-clone-element)",
  "  new-name   New rule name (kebab-case, e.g. no-clone-element-usage)",
  "",
  "Examples:",
  "  tsx ./scripts/rename-rule.ts x no-clone-element no-clone-element-usage",
  "  tsx ./scripts/rename-rule.ts dom no-render no-render-call",
].join("\n");

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

function buildConfigKey(domain: PluginDomain, ruleName: string): string {
  if (domain === "x") return `@eslint-react/${ruleName}`;
  return `@eslint-react/${domain}-${ruleName}`;
}

function buildPluginPrefix(domain: PluginDomain): string {
  return `react-${domain}`;
}

const parseArgs = Effect.gen(function*() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    yield* Effect.logError(USAGE);
    return yield* Effect.fail(new Error("Missing required arguments."));
  }

  const [pluginArg, oldName, newName] = args as [string, string, string];

  if (!VALID_PLUGINS.includes(pluginArg as PluginDomain)) {
    yield* Effect.logError(`Invalid plugin: ${pluginArg}`);
    yield* Effect.logError(`Valid plugins: ${VALID_PLUGINS.join(", ")}`);
    return yield* Effect.fail(new Error(`Invalid plugin: ${pluginArg}`));
  }

  if (!/^[a-z][a-z0-9-]*$/u.test(oldName)) {
    return yield* Effect.fail(new Error(`Invalid old rule name: ${oldName}. Must be kebab-case.`));
  }

  if (!/^[a-z][a-z0-9-]*$/u.test(newName)) {
    return yield* Effect.fail(new Error(`Invalid new rule name: ${newName}. Must be kebab-case.`));
  }

  if (oldName === newName) {
    return yield* Effect.fail(new Error("Old name and new name are the same."));
  }

  return {
    domain: pluginArg as PluginDomain,
    oldName,
    newName,
  };
});

const renameSourceFiles = Effect.fnUntraced(
  function*(domain: PluginDomain, oldName: string, newName: string) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const pluginDir = `plugins/eslint-plugin-react-${domain}`;
    const oldRuleDir = path.join(pluginDir, "src", "rules", oldName);
    const newRuleDir = path.join(pluginDir, "src", "rules", newName);

    const exists = yield* fs.exists(oldRuleDir);
    if (!exists) {
      return yield* Effect.fail(new Error(`Rule directory not found: ${oldRuleDir}`));
    }

    const newExists = yield* fs.exists(newRuleDir);
    if (newExists) {
      return yield* Effect.fail(new Error(`Target rule directory already exists: ${newRuleDir}`));
    }

    yield* fs.makeDirectory(newRuleDir, { recursive: true });

    const extensions = [".ts", ".spec.ts", ".mdx"];
    for (const ext of extensions) {
      const oldFile = path.join(oldRuleDir, `${oldName}${ext}`);
      const newFile = path.join(newRuleDir, `${newName}${ext}`);
      const fileExists = yield* fs.exists(oldFile);
      if (fileExists) {
        const content = yield* fs.readFileString(oldFile, "utf8");
        yield* fs.writeFileString(newFile, content);
        yield* Effect.log(ansis.green(`  Copied ${oldFile} -> ${newFile}`));
      } else {
        yield* Effect.logWarning(ansis.yellow(`  Source file not found (skipped): ${oldFile}`));
      }
    }

    yield* fs.remove(oldRuleDir, { recursive: true });
    yield* Effect.log(ansis.green(`  Removed old directory: ${oldRuleDir}`));

    return { pluginDir, newRuleDir };
  },
);

const updateRuleImplementation = Effect.fnUntraced(
  function*(domain: PluginDomain, oldName: string, newName: string) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const pluginDir = `plugins/eslint-plugin-react-${domain}`;
    const ruleFile = path.join(pluginDir, "src", "rules", newName, `${newName}.ts`);

    const exists = yield* fs.exists(ruleFile);
    if (!exists) {
      yield* Effect.logWarning(ansis.yellow(`  Rule file not found (skipped): ${ruleFile}`));
      return;
    }

    let content = yield* fs.readFileString(ruleFile, "utf8");
    content = content.replace(
      `export const RULE_NAME = "${oldName}"`,
      `export const RULE_NAME = "${newName}"`,
    );

    yield* fs.writeFileString(ruleFile, content);
    yield* Effect.log(ansis.green(`  Updated RULE_NAME in ${ruleFile}`));
  },
);

const updateTestFile = Effect.fnUntraced(
  function*(domain: PluginDomain, oldName: string, newName: string) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const pluginDir = `plugins/eslint-plugin-react-${domain}`;
    const specFile = path.join(pluginDir, "src", "rules", newName, `${newName}.spec.ts`);

    const exists = yield* fs.exists(specFile);
    if (!exists) {
      yield* Effect.logWarning(ansis.yellow(`  Test file not found (skipped): ${specFile}`));
      return;
    }

    let content = yield* fs.readFileString(specFile, "utf8");
    content = content.replace(
      `from "./${oldName}"`,
      `from "./${newName}"`,
    );

    yield* fs.writeFileString(specFile, content);
    yield* Effect.log(ansis.green(`  Updated import path in ${specFile}`));
  },
);

const updateDocumentation = Effect.fnUntraced(
  function*(domain: PluginDomain, oldName: string, newName: string) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const pluginDir = `plugins/eslint-plugin-react-${domain}`;
    const mdxFile = path.join(pluginDir, "src", "rules", newName, `${newName}.mdx`);

    const exists = yield* fs.exists(mdxFile);
    if (!exists) {
      yield* Effect.logWarning(ansis.yellow(`  Documentation file not found (skipped): ${mdxFile}`));
      return;
    }

    const pluginPrefix = buildPluginPrefix(domain);
    const oldAggregatedKey = buildConfigKey(domain, oldName);
    const newAggregatedKey = buildConfigKey(domain, newName);

    let content = yield* fs.readFileString(mdxFile, "utf8");

    content = content.replace(`title: ${oldName}`, `title: ${newName}`);
    content = content.replace(`${pluginPrefix}/${oldName}`, `${pluginPrefix}/${newName}`);
    content = content.replace(oldAggregatedKey, newAggregatedKey);
    content = content.replaceAll(
      `eslint-plugin-react-${domain}/src/rules/${oldName}/${oldName}.ts`,
      `eslint-plugin-react-${domain}/src/rules/${newName}/${newName}.ts`,
    );
    content = content.replaceAll(
      `eslint-plugin-react-${domain}/src/rules/${oldName}/${oldName}.spec.ts`,
      `eslint-plugin-react-${domain}/src/rules/${newName}/${newName}.spec.ts`,
    );

    yield* fs.writeFileString(mdxFile, content);
    yield* Effect.log(ansis.green(`  Updated documentation in ${mdxFile}`));
  },
);

const updatePluginRegistration = Effect.fnUntraced(
  function*(domain: PluginDomain, oldName: string, newName: string) {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    const pluginDir = `plugins/eslint-plugin-react-${domain}`;
    const pluginFile = path.join(pluginDir, "src", "plugin.ts");

    const exists = yield* fs.exists(pluginFile);
    if (!exists) {
      yield* Effect.logWarning(ansis.yellow(`  Plugin file not found (skipped): ${pluginFile}`));
      return;
    }

    const oldCamel = kebabToCamel(oldName);
    const newCamel = kebabToCamel(newName);

    let content = yield* fs.readFileString(pluginFile, "utf8");

    content = content.replace(
      `import ${oldCamel} from "./rules/${oldName}/${oldName}"`,
      `import ${newCamel} from "./rules/${newName}/${newName}"`,
    );
    content = content.replace(
      `"${oldName}": ${oldCamel}`,
      `"${newName}": ${newCamel}`,
    );
    content = content.replace(
      `["${oldName}"]: ${oldCamel}`,
      `["${newName}"]: ${newCamel}`,
    );
    if (!oldName.includes("-")) {
      content = content.replace(
        new RegExp(`(\\s)${oldName}: ${oldCamel}`, "u"),
        `$1${newName}: ${newCamel}`,
      );
    }

    yield* fs.writeFileString(pluginFile, content);
    yield* Effect.log(ansis.green(`  Updated plugin registration in ${pluginFile}`));
  },
);

const updateAggregatedConfigs = Effect.fnUntraced(
  function*(domain: PluginDomain, oldName: string, newName: string) {
    const fs = yield* FileSystem.FileSystem;

    const oldConfigKey = buildConfigKey(domain, oldName);
    const newConfigKey = buildConfigKey(domain, newName);

    const configGlob = ["plugins/eslint-plugin/src/configs/*.ts"];
    const configFiles = glob(configGlob);

    let updatedCount = 0;

    for (const configFile of configFiles) {
      const content = yield* fs.readFileString(configFile, "utf8");
      if (!content.includes(oldConfigKey)) continue;

      const updated = content.replaceAll(oldConfigKey, newConfigKey);
      yield* fs.writeFileString(configFile, updated);
      yield* Effect.log(ansis.green(`  Updated config key in ${configFile}`));
      updatedCount += 1;
    }

    if (updatedCount === 0) {
      yield* Effect.log(ansis.yellow("  No aggregated config files contained the old rule key."));
    }

    return updatedCount;
  },
);

const updateSubPluginConfigs = Effect.fnUntraced(
  function*(domain: PluginDomain, oldName: string, newName: string) {
    const fs = yield* FileSystem.FileSystem;

    const pluginPrefix = buildPluginPrefix(domain);
    const oldSubKey = `${pluginPrefix}/${oldName}`;
    const newSubKey = `${pluginPrefix}/${newName}`;

    const configGlob = [`plugins/eslint-plugin-react-${domain}/src/configs/*.ts`];
    const configFiles = glob(configGlob);

    let updatedCount = 0;

    for (const configFile of configFiles) {
      const content = yield* fs.readFileString(configFile, "utf8");
      if (!content.includes(oldSubKey) && !content.includes(`"${oldName}"`)) continue;

      let updated = content.replaceAll(oldSubKey, newSubKey);
      updated = updated.replaceAll(`"${oldName}"`, `"${newName}"`);
      yield* fs.writeFileString(configFile, updated);
      yield* Effect.log(ansis.green(`  Updated sub-plugin config in ${configFile}`));
      updatedCount += 1;
    }

    return updatedCount;
  },
);

const updateRuleRelationsTable = Effect.fnUntraced(
  function*(domain: PluginDomain, oldName: string, newName: string) {
    const fs = yield* FileSystem.FileSystem;
    const relationsPath = "docs/rule-relations-table.md";

    const exists = yield* fs.exists(relationsPath);
    if (!exists) return;

    const pluginPrefix = buildPluginPrefix(domain);
    const oldFullName = `${pluginPrefix}/${oldName}`;
    const newFullName = `${pluginPrefix}/${newName}`;

    const content = yield* fs.readFileString(relationsPath, "utf8");
    if (!content.includes(oldFullName)) return;

    const updated = content.replaceAll(oldFullName, newFullName);
    yield* fs.writeFileString(relationsPath, updated);
    yield* Effect.log(ansis.green(`  Updated rule relations table in ${relationsPath}`));
  },
);

const verifyNoLeftovers = Effect.fnUntraced(
  function*(domain: PluginDomain, oldName: string) {
    const pluginDir = `plugins/eslint-plugin-react-${domain}`;
    const aggregatedDir = "plugins/eslint-plugin";

    const allFiles = [
      ...glob([`${pluginDir}/src/**/*.ts`]),
      ...glob([`${pluginDir}/src/**/*.mdx`]),
      ...glob([`${aggregatedDir}/src/configs/*.ts`]),
      ...glob(["docs/*.md"]),
    ];

    const fs = yield* FileSystem.FileSystem;
    const leftovers: string[] = [];

    for (const file of allFiles) {
      const content = yield* fs.readFileString(file, "utf8");
      if (
        content.includes(`"${oldName}"`)
        || content.includes(`/${oldName}/`)
        || content.includes(`/${oldName}.`)
        || content.includes(`RULE_NAME = "${oldName}"`)
      ) {
        leftovers.push(file);
      }
    }

    return leftovers;
  },
);

const program = Effect.gen(function*() {
  const { domain, oldName, newName } = yield* parseArgs;
  const pluginPrefix = buildPluginPrefix(domain);

  yield* Effect.log(ansis.bold(`Renaming rule: ${pluginPrefix}/${oldName} -> ${pluginPrefix}/${newName}`));
  yield* Effect.log("");

  yield* Effect.log(ansis.bold("Step 1: Renaming source files..."));
  yield* renameSourceFiles(domain, oldName, newName);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Step 2: Updating rule implementation..."));
  yield* updateRuleImplementation(domain, oldName, newName);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Step 3: Updating test file..."));
  yield* updateTestFile(domain, oldName, newName);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Step 4: Updating documentation..."));
  yield* updateDocumentation(domain, oldName, newName);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Step 5: Updating plugin registration..."));
  yield* updatePluginRegistration(domain, oldName, newName);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Step 6: Updating aggregated plugin configs..."));
  yield* updateAggregatedConfigs(domain, oldName, newName);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Step 7: Updating sub-plugin configs..."));
  yield* updateSubPluginConfigs(domain, oldName, newName);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Step 8: Updating rule relations table..."));
  yield* updateRuleRelationsTable(domain, oldName, newName);

  yield* Effect.log("");
  yield* Effect.log(ansis.bold("Step 9: Checking for leftover references..."));
  const leftovers = yield* verifyNoLeftovers(domain, oldName);

  if (leftovers.length > 0) {
    yield* Effect.logWarning(ansis.yellow(`  Found ${leftovers.length} file(s) with possible leftover references:`));
    for (const file of leftovers) {
      yield* Effect.logWarning(ansis.yellow(`    - ${file}`));
    }
    yield* Effect.log(ansis.yellow("  Please review and update these files manually."));
  } else {
    yield* Effect.log(ansis.green("  No leftover references found."));
  }

  yield* Effect.log("");
  yield* Effect.log(
    ansis.bold.green(`Rule renamed successfully: ${pluginPrefix}/${oldName} -> ${pluginPrefix}/${newName}`),
  );
  yield* Effect.log(ansis.bold("Remaining manual steps:"));
  yield* Effect.log("  1. Update CHANGELOG.md with the rename entry");
  yield* Effect.log("  2. Run `pnpm run build` to verify the build");
  yield* Effect.log(`  3. Run \`pnpm vitest run src/rules/${newName}/${newName}.spec.ts\` to verify tests`);
  yield* Effect.log("  4. Run `pnpm run verify:rule-docs` to verify documentation");
});

program.pipe(Effect.provide(NodeContext.layer), NodeRuntime.runMain);
