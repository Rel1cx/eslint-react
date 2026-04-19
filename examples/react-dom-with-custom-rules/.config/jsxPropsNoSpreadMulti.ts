import type { RuleFunction } from "@eslint-react/kit";

/** Disallow JSX prop spreading the same identifier multiple times. */
export function jsxPropsNoSpreadMulti(): RuleFunction {
  return (context) => ({
    JSXOpeningElement(node) {
      const seen = new Set<string>();

      // ─── Check each spread attribute ───────────────
      for (const attr of node.attributes) {
        if (attr.type !== "JSXSpreadAttribute") continue;

        // › Extract spread identifier name
        let spreadKey: string;
        if (attr.argument.type === "Identifier") {
          spreadKey = attr.argument.name;
        } else {
          spreadKey = context.sourceCode.getText(attr.argument);
        }

        // › Report duplicate spread
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
