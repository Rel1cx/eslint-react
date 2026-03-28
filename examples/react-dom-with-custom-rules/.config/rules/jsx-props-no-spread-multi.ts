import type { RuleDefinition } from "@eslint-react/kit";

/** Disallow JSX prop spreading the same identifier multiple times. */
export function jsxPropsNoSpreadMulti(): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const seen = new Set<string>();
      for (const attr of node.attributes) {
        if (attr.type !== "JSXSpreadAttribute") continue;

        let spreadKey: string;
        if (attr.argument.type === "Identifier") {
          spreadKey = attr.argument.name;
        } else {
          spreadKey = context.sourceCode.getText(attr.argument);
        }

        if (seen.has(spreadKey)) {
          context.report({
            node: attr,
            message: `Spreading the same expression "${spreadKey}" multiple times is not allowed.`,
          });
        } else {
          seen.add(spreadKey);
        }
      }
    },
  });
}
