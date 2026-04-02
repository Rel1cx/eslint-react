import * as ast from "@eslint-react/ast";
import type { TSESTreeJSXAttributeLike } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/shared";
import { resolve } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { getAttributeName } from "./get-attribute-name";

/**
 * Find a JSX attribute (or spread attribute containing the property) by name
 * on a given element.
 *
 * Returns the **last** matching attribute to mirror React's behaviour where
 * later props win, or `undefined` when the attribute is not present.
 *
 * Spread attributes are resolved when possible: if the spread argument is an
 * identifier that resolves to an object expression, the object's properties
 * are searched for a matching key.
 *
 * @param context - The ESLint rule context (needed for variable resolution in
 *                  spread attributes).
 * @param element - The `JSXElement` node to search.
 * @param name    - The attribute name to look for (e.g. `"className"`).
 * @returns The matching `JSXAttribute` or `JSXSpreadAttribute`, or
 *          `undefined` when not found.
 *
 * @example
 * ```ts
 * const attr = findAttribute(context, node, "sandbox");
 * if (attr != null) {
 *   // attribute (or spread containing it) exists on the element
 * }
 * ```
 */
export function findAttribute(
  context: RuleContext,
  element: TSESTree.JSXElement,
  name: string,
): TSESTreeJSXAttributeLike | undefined {
  return element.openingElement.attributes.findLast((attr) => {
    if (attr.type === AST.JSXAttribute) {
      return getAttributeName(attr) === name;
    }

    // --- JSXSpreadAttribute ---
    switch (attr.argument.type) {
      case AST.Identifier: {
        const initNode = resolve(context, attr.argument);
        if (initNode?.type === AST.ObjectExpression) {
          return ast.findProperty(initNode.properties, name) != null;
        }
        return false;
      }
      case AST.ObjectExpression:
        return ast.findProperty(attr.argument.properties, name) != null;
    }

    return false;
  });
}
