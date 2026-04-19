import type { RuleFunction } from "@eslint-react/kit";

/** Options for {@link jsxPascalCase}. */
export type JsxPascalCaseOptions = {
  /** Allow all-uppercase component names like `<XML />`. */
  allowAllCaps?: boolean;
  /** Allow leading underscores in component names like `<_Component />`. */
  allowLeadingUnderscore?: boolean;
};

/** Enforce PascalCase for user-defined JSX components. */
export function jsxPascalCase(options: JsxPascalCaseOptions = {}): RuleFunction {
  const { allowAllCaps = false, allowLeadingUnderscore = false } = options;
  const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/;
  return (context) => ({
    JSXOpeningElement(node) {
      const name = node.name;

      // › Guard: must be simple identifier
      if (name.type !== "JSXIdentifier") return;

      const componentName = name.name;

      // ─── Handle leading underscore ───────────────
      if (componentName.startsWith("_")) {
        if (!allowLeadingUnderscore) {
          context.report({
            node: name,
            message: `Component name "${componentName}" should not start with an underscore.`,
          });
        }
        return;
      }

      // › Guard: ignore DOM elements (lowercase)
      const firstChar = componentName[0];
      if (firstChar === undefined) return;
      if (firstChar === firstChar.toLowerCase()) return;

      // ─── Handle all-caps ─────────────────────────
      if (componentName === componentName.toUpperCase()) {
        if (!allowAllCaps) {
          context.report({
            node: name,
            message: `Component name "${componentName}" should use PascalCase, not all uppercase.`,
          });
        }
        return;
      }

      // ─── Validate PascalCase ─────────────────────
      if (!pascalCaseRegex.test(componentName)) {
        context.report({
          node: name,
          message: `Component name "${componentName}" should be in PascalCase.`,
        });
      }
    },
  });
}
