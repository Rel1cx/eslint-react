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
    function reportSyntaxPreferred(node: TSESTree.JSXOpeningElement, pattern: "React.Fragment" | "Fragment") {
      const hasAttributes = node.attributes.length > 0;
      if (hasAttributes) return;
      context.report({
        node,
        message: `Use shorthand fragment syntax '<>...</>' instead of '<${pattern}>...</${pattern}'.`,
        fix(fixer) {
          const closing = node.parent?.closingElement;
          if (!closing) return null;
          return [fixer.replaceText(node, "<>"), fixer.replaceText(closing, "</>")];
        },
      });
    }

    return {
      JSXOpeningElement(node) {
        const name = node.name;

        // Handle standalone <Fragment> (JSXIdentifier)
        if (name.type === "JSXIdentifier" && name.name === "Fragment") {
          if (mode === "syntax") {
            reportSyntaxPreferred(node, "Fragment");
          }
          return;
        }

        // Handle <React.Fragment> (JSXMemberExpression)
        if (name.type !== "JSXMemberExpression") return;
        if (name.object.type !== "JSXIdentifier" || name.object.name !== "React") return;
        if (name.property.type !== "JSXIdentifier" || name.property.name !== "Fragment") return;

        if (mode === "syntax") {
          reportSyntaxPreferred(node, "React.Fragment");
        }
      },
      JSXFragment(node) {
        if (mode === "element") {
          context.report({
            node,
            message: "Use '<React.Fragment>...</React.Fragment>' instead of shorthand '<>...</>'.",
            fix(fixer) {
              return [
                fixer.replaceText(node.openingFragment, "<React.Fragment>"),
                fixer.replaceText(node.closingFragment, "</React.Fragment>"),
              ];
            },
          });
        }
      },
    };
  };
}
