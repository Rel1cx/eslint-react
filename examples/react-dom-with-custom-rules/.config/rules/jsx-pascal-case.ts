import type { RuleDefinition } from "@eslint-react/kit";

/** Options for {@link jsxPascalCase}. */
export type JsxPascalCaseOptions = {
  /** Allow all-uppercase component names like `<XML />`. */
  allowAllCaps?: boolean;
  /** Allow leading underscores in component names like `<_Component />`. */
  allowLeadingUnderscore?: boolean;
};

/** Enforce PascalCase for user-defined JSX components. */
export function jsxPascalCase(
  { allowAllCaps = false, allowLeadingUnderscore = false }: JsxPascalCaseOptions = {},
): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const name = node.name;
      if (name.type !== "JSXIdentifier") return;

      const componentName = name.name;

      // Ignore DOM elements (lowercase first letter)
      const firstChar = componentName[0];
      if (firstChar === undefined) return;
      if (firstChar === firstChar.toLowerCase()) return;

      // Check for leading underscore
      if (componentName.startsWith("_")) {
        if (!allowLeadingUnderscore) {
          context.report({
            node: name,
            message: `Component name "${componentName}" should not start with an underscore.`,
          });
        }
        return;
      }

      // Check for all caps
      if (componentName === componentName.toUpperCase()) {
        if (!allowAllCaps) {
          context.report({
            node: name,
            message: `Component name "${componentName}" should use PascalCase, not all uppercase.`,
          });
        }
        return;
      }

      // Check PascalCase: first letter uppercase, rest can be mixed but no underscores
      const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/;
      if (!pascalCaseRegex.test(componentName)) {
        context.report({
          node: name,
          message: `Component name "${componentName}" should be in PascalCase.`,
        });
      }
    },
  });
}
