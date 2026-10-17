import type { RuleFunction } from "@eslint-react/kit";

/** Options for {@link jsxPascalCase}. */
export type JsxPascalCaseOptions = {
  /** Allow all-uppercase component names like `<XML />`. */
  allowAllCaps?: boolean;
  /** Allow leading underscores in component names like `<_Component />`. */
  allowLeadingUnderscore?: boolean;
};

/** Matches a PascalCase identifier like `MyComponent`. */
const PASCAL_CASE_PATTERN = /^[A-Z][a-zA-Z0-9]*$/;

/** Enforce PascalCase for user-defined JSX components. */
export function jsxPascalCase(options: JsxPascalCaseOptions = {}): RuleFunction {
  const { allowAllCaps = false, allowLeadingUnderscore = false } = options;
  return (context) => ({
    JSXOpeningElement(node) {
      const name = node.name;

      // Guard: must be simple identifier
      if (name.type !== "JSXIdentifier") return;

      const componentName = name.name;

      if (componentName.startsWith("_")) {
        if (!allowLeadingUnderscore) {
          context.report({
            message: `Component name "${componentName}" should not start with an underscore.`,
            node: name,
          });
        }
        return;
      }

      // Guard: ignore DOM elements (lowercase)
      const firstChar = componentName[0];
      if (firstChar == null) return;
      if (firstChar === firstChar.toLowerCase()) return;

      if (componentName === componentName.toUpperCase()) {
        if (!allowAllCaps) {
          context.report({
            message: `Component name "${componentName}" should use PascalCase, not all uppercase.`,
            node: name,
          });
        }
        return;
      }

      if (!PASCAL_CASE_PATTERN.test(componentName)) {
        context.report({
          message: `Component name "${componentName}" should be in PascalCase.`,
          node: name,
        });
      }
    },
  });
}
