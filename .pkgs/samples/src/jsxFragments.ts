import type { RuleFunction } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

/** Options for {@link jsxFragments}. */
export type JsxsFragmentsOptions = {
  /** The mode to enforce: "syntax" (default, shorthand) or "element" (standard form). */
  mode?: "syntax" | "element";
};

/** Enforce shorthand or standard form for React fragments. */
export function jsxFragments(options: JsxsFragmentsOptions = {}): RuleFunction {
  const { mode = "syntax" } = options;
  return (context) => {
    // Fast path: skip if the fragment form this mode targets is not present in the file
    const fragmentHint = mode === "syntax" ? "Fragment" : "<>";
    if (!context.sourceCode.text.includes(fragmentHint)) return {};

    /** Report a standard-form fragment (`<Fragment>` / `<React.Fragment>`) that should use shorthand syntax. */
    function reportSyntaxPreferred(node: TSESTree.JSXOpeningElement, pattern: "React.Fragment" | "Fragment") {
      // Guard: has key prop (legitimate use of standard form)
      const hasAttributes = node.attributes.length > 0;
      if (hasAttributes) return;

      context.report({
        fix(fixer) {
          const closing = node.parent.closingElement;
          if (closing == null) return null;
          return [fixer.replaceText(node, "<>"), fixer.replaceText(closing, "</>")];
        },
        message: `Use shorthand fragment syntax '<>...</>' instead of '<${pattern}>...</${pattern}'.`,
        node,
      });
    }

    return {
      JSXFragment(node) {
        if (mode !== "element") return;

        context.report({
          fix(fixer) {
            return [
              fixer.replaceText(node.openingFragment, "<React.Fragment>"),
              fixer.replaceText(node.closingFragment, "</React.Fragment>"),
            ];
          },
          message: "Use '<React.Fragment>...</React.Fragment>' instead of shorthand '<>...</>'.",
          node,
        });
      },
      JSXOpeningElement(node) {
        const name = node.name;

        if (name.type === "JSXIdentifier") {
          if (name.name === "Fragment" && mode === "syntax") {
            reportSyntaxPreferred(node, "Fragment");
          }
          return;
        }

        // Guard: only `<React.Fragment>` member expressions are relevant below
        if (name.type !== "JSXMemberExpression") return;
        if (name.object.type !== "JSXIdentifier" || name.object.name !== "React") return;
        if (name.property.name !== "Fragment") return;

        if (mode === "syntax") {
          reportSyntaxPreferred(node, "React.Fragment");
        }
      },
    };
  };
}
