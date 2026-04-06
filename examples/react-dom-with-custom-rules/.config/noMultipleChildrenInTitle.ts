import type { RuleFunction } from "@eslint-react/kit";

/** Ensure <title> has a single string child. */
export function noMultipleChildrenInTitle(): RuleFunction {
  /** Trim leading / trailing whitespace the same way React does when rendering JSX text. */
  function trimLikeReact(text: string): string {
    const leadingSpaces = /^\s*/.exec(text)?.[0] ?? "";
    const trailingSpaces = /\s*$/.exec(text)?.[0] ?? "";

    const start = leadingSpaces.includes("\n") ? leadingSpaces.length : 0;
    const end = trailingSpaces.includes("\n")
      ? text.length - trailingSpaces.length
      : text.length;

    return text.slice(start, end);
  }
  return (context) => ({
    JSXElement(node) {
      if (node.openingElement.name.type === "JSXIdentifier" && node.openingElement.name.name === "title") {
        const significantChildren = node.children.filter((child) => {
          if (child.type === "JSXText") {
            return trimLikeReact(child.value).length > 0;
          }
          if (child.type === "JSXExpressionContainer") {
            return child.expression.type !== "JSXEmptyExpression";
          }
          return true;
        });

        if (significantChildren.length > 1) {
          context.report({
            node,
            message: "The <title> component must have a single string child. Use string interpolation instead.",
          });
        }
      }
    },
  });
}
