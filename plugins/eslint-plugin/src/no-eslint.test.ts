import dedent from "dedent";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { registerHooks } from "node:module";
import { describe, it } from "vitest";

const loadWithoutESLint = dedent`
  import assert from "node:assert/strict";
  import { readFileSync } from "node:fs";
  import { createRequire, registerHooks } from "node:module";

  const message = "ESLint must not be loaded";
  registerHooks({
    resolve(specifier, context, nextResolve) {
      if (specifier === "eslint" || specifier.startsWith("eslint/")) {
        throw new Error(message);
      }
      return nextResolve(specifier, context);
    },
  });

  const require = createRequire(import.meta.url);
  for (const specifier of ["eslint", "eslint/use-at-your-own-risk"]) {
    assert.throws(() => require(specifier), { message });
    await assert.rejects(import(specifier), { message });
  }

  const { name } = JSON.parse(readFileSync("package.json", "utf8"));
  const { default: plugin } = await import(name);
  assert.ok(Object.keys(plugin.rules).length > 0);
  for (const rule of Object.values(plugin.rules)) {
    assert.equal(typeof rule.create, "function");
  }
`;

const pluginDirectories = readdirSync(new URL("../../", import.meta.url), { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(new URL(`../../${entry.name}/package.json`, import.meta.url)))
  .map((entry) => entry.name)
  .sort();

// `module.registerHooks` requires Node.js >= 22.15.0; skip on older runtimes.
describe.skipIf(typeof registerHooks !== "function")("plugin loading", () => {
  it.each(pluginDirectories)("loads %s without ESLint", (directory) => {
    execFileSync(process.execPath, ["--input-type=module", "--eval", loadWithoutESLint], {
      cwd: new URL(`../../${directory}/`, import.meta.url),
      stdio: "pipe",
      timeout: 10_000,
    });
  });
});
