import type { RuleFunction } from "@eslint-react/kit";

/** Disallow JSX prop spreading the same identifier multiple times. */
export function jsxPropsNoSpreadMulti(): RuleFunction {
  return (context, { ast }) => ({
    JSXOpeningElement(node) {
      const seen = new Set<string>();

      for (const attr of node.attributes) {
        // Guard: only spread attributes are relevant
        if (attr.type !== "JSXSpreadAttribute") continue;

        // Use the identifier name for plain spreads, otherwise the source text as the key
        const argument = ast.unwrap(attr.argument);
        const spreadKey = argument.type === "Identifier" ? argument.name : context.sourceCode.getText(attr.argument);

        // Report: duplicate spread
        if (seen.has(spreadKey)) {
          context.report({
            message: `Spreading the same expression "${spreadKey}" multiple times is not allowed.`,
            node: attr,
          });
          continue;
        }

        seen.add(spreadKey);
      }
    },
  });
}
