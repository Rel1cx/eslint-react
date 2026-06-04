import type { TSESTreeJSXElementLike } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { cleanJSXTextValue } from "./clean-jsx-text";
import { isEmptyStringExpression } from "./is-whitespace";

/**
 * Get the **meaningful** children of a JSX element or fragment.
 *
 * Mirrors Babel's `buildChildren` helper:
 * 1. Iterate over `element.children`.
 * 2. Skip `JSXText` nodes that clean to nothing (padding whitespace).
 * 3. Skip `JSXExpressionContainer` nodes whose expression is empty.
 * 4. Skip `JSXEmptyExpression` nodes.
 * 5. Collect everything else.
 *
 * @param element - A `JSXElement` or `JSXFragment` node.
 * @returns An array of children nodes that contribute to rendered output.
 *
 * @example
 * ```ts
 * import { getChildren } from "@eslint-react/jsx";
 *
 * // <div>
 * //   <span />
 * // </div>
 * //
 * // Raw children: [JSXText("\n  "), JSXElement(<span />), JSXText("\n")]
 * // getChildren:  [JSXElement(<span />)]
 *
 * const meaningful = getChildren(node);
 * ```
 */
export function getChildren(element: TSESTreeJSXElementLike): TSESTree.JSXChild[] {
  const elements: TSESTree.JSXChild[] = [];

  for (const child of element.children) {
    if (child.type === AST.JSXText) {
      // Padding whitespace (whitespace containing a newline) that React trims away.
      if (cleanJSXTextValue(child) == null && child.value.includes("\n")) continue;
      elements.push(child);
      continue;
    }

    if (child.type === AST.JSXExpressionContainer) {
      const { expression } = child;
      if (expression.type === AST.JSXEmptyExpression) continue;
      // { "" } produces no DOM node.
      if (isEmptyStringExpression(child)) continue;
      elements.push(child);
      continue;
    }

    elements.push(child);
  }

  return elements;
}
