import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "eslint" || specifier.startsWith("eslint/")) {
      throw new Error(`ESLint must not be loaded in this example (tried to load: ${specifier})`);
    }
    return nextResolve(specifier, context);
  },
});

const { default: plugin } = await import("@eslint-react/eslint-plugin");
const rules = plugin.rules ?? {};
if (Object.keys(rules).length === 0) {
  throw new Error("Expected @eslint-react/eslint-plugin to expose at least one rule");
}
console.log("OK: @eslint-react/eslint-plugin loaded with `eslint` resolution denied");
