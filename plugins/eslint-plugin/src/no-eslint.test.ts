import dedent from "dedent";
import { execFileSync } from "node:child_process";
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

const pluginDirectories = [
  "eslint-plugin",
  "eslint-plugin-react-debug",
  "eslint-plugin-react-dom",
  "eslint-plugin-react-jsx",
  "eslint-plugin-react-naming-convention",
  "eslint-plugin-react-rsc",
  "eslint-plugin-react-web-api",
  "eslint-plugin-react-x",
];

describe("plugin loading", () => {
  it.each(pluginDirectories)("loads %s without ESLint", (directory) => {
    execFileSync(process.execPath, ["--input-type=module", "--eval", loadWithoutESLint], {
      cwd: new URL(`../../${directory}/`, import.meta.url),
      stdio: "pipe",
      timeout: 10_000,
    });
  });
});
