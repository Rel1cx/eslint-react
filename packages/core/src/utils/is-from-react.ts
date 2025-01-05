import * as AST from "@eslint-react/ast";
import { F } from "@eslint-react/eff";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isInitializedFromReact } from "./is-initialized-from-react";

/**
 * Checks if the given node is a call expression to the given function or method of the pragma
 * @param name The name of the function or method to check
 * @returns A predicate that checks if the given node is a call expression to the given function or method
 */
export function isFromReact(name: string) {
  return (
    node: TSESTree.Identifier | TSESTree.MemberExpression,
    context: RuleContext,
  ) => {
    const settings = getSettingsFromContext(context);
    const initialScope = context.sourceCode.getScope(node);
    if (node.type === AST_NODE_TYPES.MemberExpression) {
      return node.object.type === AST_NODE_TYPES.Identifier
        && node.property.type === AST_NODE_TYPES.Identifier
        && node.property.name === name
        && isInitializedFromReact(node.object.name, initialScope, settings);
    }
    if (node.name === name) return isInitializedFromReact(name, initialScope, settings);
    return false;
  };
}

/**
 * @internal
 * @param memberName The name of the member object
 * @param name The name of the member property
 * @returns A function that checks if a given node is a member expression of a Pragma member.
 */
export function isFromReactMember(
  memberName: string,
  name: string,
): (node: TSESTree.MemberExpression, context: RuleContext) => boolean {
  return (
    node: TSESTree.MemberExpression,
    context: RuleContext,
  ) => {
    const settings = getSettingsFromContext(context);
    const initialScope = context.sourceCode.getScope(node);
    if (node.property.type !== AST_NODE_TYPES.Identifier || node.property.name !== name) return false;
    if (node.object.type === AST_NODE_TYPES.Identifier && node.object.name === memberName) {
      return isInitializedFromReact(node.object.name, initialScope, settings);
    }
    if (
      node.object.type === AST_NODE_TYPES.MemberExpression
      && node.object.object.type === AST_NODE_TYPES.Identifier
      && isInitializedFromReact(node.object.object.name, initialScope, settings)
      && node.object.property.type === AST_NODE_TYPES.Identifier
    ) {
      return node.object.property.name === memberName;
    }
    return false;
  };
}

type IsCallFromReact = {
  (context: RuleContext): (node: TSESTree.Node) => node is TSESTree.CallExpression;
  (node: TSESTree.Node, context: RuleContext): node is TSESTree.CallExpression;
};

export function isCallFromReact(name: string): IsCallFromReact {
  return F.dual(2, (node: TSESTree.Node, context: RuleContext): node is TSESTree.CallExpression => {
    if (node.type !== AST_NODE_TYPES.CallExpression) return false;
    if (!AST.isOneOf([AST_NODE_TYPES.Identifier, AST_NODE_TYPES.MemberExpression])(node.callee)) return false;
    return isFromReact(name)(node.callee, context);
  });
}

type IsCallFromReactMember = {
  (context: RuleContext): (node: TSESTree.Node) => node is
    & TSESTree.CallExpression
    & { callee: TSESTree.MemberExpression };
  (
    node: TSESTree.Node,
    context: RuleContext,
  ): node is
    & TSESTree.CallExpression
    & { callee: TSESTree.MemberExpression };
};

export function isCallFromReactMember(
  pragmaMemberName: string,
  name: string,
): IsCallFromReactMember {
  return F.dual(2, (
    node: TSESTree.Node,
    context: RuleContext,
  ): node is
    & TSESTree.CallExpression
    & { callee: TSESTree.MemberExpression } =>
  {
    if (node.type !== AST_NODE_TYPES.CallExpression) return false;
    if (!AST.is(AST_NODE_TYPES.MemberExpression)(node.callee)) return false;
    return isFromReactMember(pragmaMemberName, name)(node.callee, context);
  });
}
