import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Incomplete but sufficient stringification of JSX name nodes.
 *
 * Handles the four name-bearing JSX node shapes that appear in practice:
 *
 * - `JSXIdentifier`        -> `"div"`, `"Button"`
 * - `JSXNamespacedName`    -> `"svg:path"`
 * - `JSXMemberExpression`  -> `"Foo.Bar.Baz"`
 * - `JSXText`              -> raw text content
 *
 * And the structural nodes whose stringification is occasionally useful:
 *
 * - `JSXOpeningElement`    -> `"<div>"`
 * - `JSXClosingElement`    -> `"</div>"`
 * - `JSXOpeningFragment`   -> `"<>"`
 * - `JSXClosingFragment`   -> `"</>"`
 *
 * @param node
 * @internal
 */
export function toString(
  node:
    | TSESTree.JSXIdentifier
    | TSESTree.JSXNamespacedName
    | TSESTree.JSXMemberExpression
    | TSESTree.JSXOpeningElement
    | TSESTree.JSXClosingElement
    | TSESTree.JSXOpeningFragment
    | TSESTree.JSXClosingFragment
    | TSESTree.JSXText,
): string {
  switch (node.type) {
    case AST.JSXIdentifier:
      return node.name;
    case AST.JSXNamespacedName:
      return `${node.namespace.name}:${node.name.name}`;
    case AST.JSXMemberExpression:
      return `${toString(node.object)}.${toString(node.property)}`;
    case AST.JSXText:
      return node.value;
    case AST.JSXOpeningElement:
      return `<${toString(node.name)}>`;
    case AST.JSXClosingElement:
      return `</${toString(node.name)}>`;
    case AST.JSXOpeningFragment:
      return "<>";
    case AST.JSXClosingFragment:
      return "</>";
  }
}
