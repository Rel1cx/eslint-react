import * as ast from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { isComponentNameLoose } from "../component/component-name";
import { isHookName } from "../hook/hook-name";

export type FindEnclosingComponentOrHookFilter = (n: TSESTree.Node, name: string | null) => boolean;

/**
 * Find the enclosing React component or hook for a given AST node
 * @param node The AST node to start the search from
 * @param test Optional test function to customize component or hook identification
 * @returns The enclosing component or hook node, or `null` if none is ASAST.
 */
export function findEnclosingComponentOrHook(
  node: TSESTree.Node | unit,
  test: FindEnclosingComponentOrHookFilter = (n, name) => {
    if (name == null) return false;
    return isComponentNameLoose(name) || isHookName(name);
  },
) {
  const enclosingNode = ast.findParentNode(node, (n) => {
    if (!ast.isFunction(n)) return false;
    const name = match(ast.getFunctionId(n))
      .with({ type: AST.Identifier }, (id) => id.name)
      .with({ type: AST.MemberExpression, property: { type: AST.Identifier } }, (me) => me.property.name)
      .otherwise(() => null);
    return test(n, name);
  });
  return ast.isFunction(enclosingNode) ? enclosingNode : unit;
}
