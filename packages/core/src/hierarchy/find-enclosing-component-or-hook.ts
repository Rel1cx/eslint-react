import * as AST from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import { AST_NODE_TYPES as T, type TSESTree } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { isComponentNameLoose } from "../component/component-name";
import { isHookName } from "../hook/hook-name";

export type FindEnclosingComponentOrHookFilter = (n: TSESTree.Node, name: string | null) => boolean;

/**
 * Find the enclosing React component or hook for a given AST node
 * @param node The AST node to start the search from
 * @param test Optional test function to customize component or hook identification
 * @returns The enclosing component or hook node, or `null` if none is found
 */
export function findEnclosingComponentOrHook(
  node: TSESTree.Node | unit,
  test: FindEnclosingComponentOrHookFilter = (n, name) => {
    if (name == null) return false;
    return isComponentNameLoose(name) || isHookName(name);
  },
) {
  const enclosingNode = AST.findParentNode(node, (n) => {
    if (!AST.isFunction(n)) return false;
    const name = match(AST.getFunctionId(n))
      .with({ type: T.Identifier }, (id) => id.name)
      .with({ type: T.MemberExpression, property: { type: T.Identifier } }, (me) => me.property.name)
      .otherwise(() => null);
    return test(n, name);
  });
  return AST.isFunction(enclosingNode) ? enclosingNode : unit;
}
