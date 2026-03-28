import type { RuleDefinition } from "@eslint-react/kit";

/** Options for {@link jsxFragments}. */
export type JsxsFragmentsOptions = {
  /** The mode to enforce: "syntax" (default, shorthand) or "element" (standard form). */
  mode?: "syntax" | "element";
};

/** Enforce shorthand or standard form for React fragments. */
export function jsxFragments({ mode = "syntax" }: JsxsFragmentsOptions = {}): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const name = node.name;
      if (name.type !== "JSXMemberExpression") return;
      if (name.object.type !== "JSXIdentifier" || name.object.name !== "React") return;
      if (name.property.type !== "JSXIdentifier" || name.property.name !== "Fragment") return;

      // Check if has key prop or other attributes
      const hasAttributes = node.attributes.length > 0;

      if (mode === "syntax" && !hasAttributes) {
        context.report({
          node,
          message: "Use shorthand fragment syntax '<>...</>' instead of '<React.Fragment>...</React.Fragment>'.",
          fix(fixer) {
            const src = context.sourceCode;
            const opening = node;
            const closing = node.parent?.closingElement;
            if (!closing) return null;
            const openingText = src.getText(opening).replace(/^<React\.Fragment/, "<>").replace(/>$/, ">");
            const closingText = src.getText(closing).replace(/^<\/React\.Fragment/, "</>").replace(/>$/, ">");
            return [fixer.replaceText(opening, openingText), fixer.replaceText(closing, closingText)];
          },
        });
      }
    },
  });
}
