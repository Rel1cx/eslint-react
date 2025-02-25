import * as AST from "@eslint-react/ast";
import { dual } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isFromReact, isFromReactMember } from "./is-from-react";

export declare namespace isCallFromReact {
  type ReturnType = {
    (context: RuleContext): (node: TSESTree.Node) => node is TSESTree.CallExpression;
    (context: RuleContext, node: TSESTree.Node): node is TSESTree.CallExpression;
  };
}

export function isCallFromReact(name: string): isCallFromReact.ReturnType {
  return dual(2, (context: RuleContext, node: TSESTree.Node): node is TSESTree.CallExpression => {
    if (node.type !== T.CallExpression) return false;
    if (!AST.isOneOf([T.Identifier, T.MemberExpression])(node.callee)) return false;
    return isFromReact(name)(context, node.callee);
  });
}

export declare namespace isCallFromReactMember {
  type ReturnType = {
    (context: RuleContext): (node: TSESTree.Node) => node is
      & TSESTree.CallExpression
      & { callee: TSESTree.MemberExpression };
    (context: RuleContext, node: TSESTree.Node): node is
      & TSESTree.CallExpression
      & { callee: TSESTree.MemberExpression };
  };
}

export function isCallFromReactMember(
  pragmaMemberName: string,
  name: string,
): isCallFromReactMember.ReturnType {
  return dual(2, (context: RuleContext, node: TSESTree.Node): node is
    & TSESTree.CallExpression
    & { callee: TSESTree.MemberExpression } =>
  {
    if (node.type !== T.CallExpression) return false;
    if (!AST.is(T.MemberExpression)(node.callee)) return false;
    return isFromReactMember(pragmaMemberName, name)(context, node.callee);
  });
}
