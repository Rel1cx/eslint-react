import type { TSESTree } from "@typescript-eslint/types";
import { isMatching } from "ts-pattern";

import { NodeType } from "../node";

export function unsafeIsToStringCall(node: TSESTree.Node): node is
  & TSESTree.CallExpression
  & {
    callee:
      & TSESTree.MemberExpression
      & { property: TSESTree.Identifier & { name: "toString" } };
  }
{
  return isMatching({
    type: NodeType.CallExpression,
    callee: {
      type: NodeType.MemberExpression,
      property: {
        type: NodeType.Identifier,
        name: "toString",
      },
    },
  }, node);
}

export function unsafeIsStringCall(node: TSESTree.Node): node is
  & TSESTree.CallExpression
  & {
    callee: TSESTree.Identifier & { name: "String" };
  }
{
  return isMatching({
    type: NodeType.CallExpression,
    callee: {
      type: NodeType.Identifier,
      name: "String",
    },
  }, node);
}

/**
 * Unsafe check whether given node or its parent is directly inside `Array.from` call
 * @param node The AST node to check
 * @returns `true` if node is directly inside `Array.from` call, `false` if not
 */
export function unsafeIsArrayFromCall(node: TSESTree.Node | null): node is TSESTree.CallExpression {
  return isMatching({
    type: NodeType.CallExpression,
    callee: {
      type: NodeType.MemberExpression,
      property: {
        name: "from",
      },
    },
  }, node);
}
/**
 * Unsafe check whether given node or its parent is directly inside `map` call
 * ```jsx
 * _ = <div>{items.map(item => <li />)}</div>
 * `                   ^^^^^^^^^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns `true` if node is directly inside `map` call, `false` if not
 */
export function unsafeIsMapCall(node: TSESTree.Node | null): node is TSESTree.CallExpression {
  return isMatching({
    callee: {
      type: NodeType.MemberExpression,
      property: {
        name: "map",
      },
    },
  }, node);
}
