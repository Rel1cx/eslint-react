import type { RuleFunction } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

/** Ensure <title> has a single string child. */
export function noMultipleChildrenInTitle(): RuleFunction {
  return (context) => {
    // Fast path: skip if `<title` is not present in the file
    if (!context.sourceCode.text.includes("<title")) return {};

    return {
      JSXElement(node) {
        const name = node.openingElement.name;

        // Guard: only the `<title>` element is relevant
        if (name.type !== "JSXIdentifier" || name.name !== "title") return;

        const significantChildren = node.children.filter(isSignificantChild);

        // Guard: a single significant child (or none) is fine
        if (significantChildren.length <= 1) return;

        context.report({
          message: [
            "The <title> component must have a single string child.",
            "Use string interpolation instead.",
          ].join(" "),
          node,
        });
      },
    };
  };
}

/**
 * Check whether a JSX child contributes rendered content
 * (whitespace-only JSX text and empty expressions do not)
 * @param child The JSX child to inspect
 * @returns True when the child renders content
 */
function isSignificantChild(child: TSESTree.JSXElement["children"][number]) {
  if (child.type === "JSXText") {
    return trimLikeReact(child.value).length > 0;
  }
  if (child.type === "JSXExpressionContainer") {
    return child.expression.type !== "JSXEmptyExpression";
  }
  return true;
}

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
