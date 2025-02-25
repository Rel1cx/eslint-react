import * as AST from "@eslint-react/ast";
import { dual } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS, unsafeDecodeSettings } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

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
    const settings = unsafeDecodeSettings(context.settings);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!settings.strictImportCheck) {
      if (node.type === T.MemberExpression) {
        return node.object.type === T.Identifier
          && node.property.type === T.Identifier
          && node.property.name === name;
      }
      return node.name === name;
    }
    const importSource = settings.importSource ?? DEFAULT_ESLINT_REACT_SETTINGS.importSource;
    const initialScope = context.sourceCode.getScope(node);
    if (node.type === T.MemberExpression) {
      return node.object.type === T.Identifier
        && node.property.type === T.Identifier
        && node.property.name === name
        && isInitializedFromReact(node.object.name, importSource, initialScope);
    }
    if (node.name === name) {
      return isInitializedFromReact(name, importSource, initialScope);
    }
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
    const settings = unsafeDecodeSettings(context.settings);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!settings.strictImportCheck) {
      if (node.property.type !== T.Identifier || node.property.name !== name) return false;
      if (node.object.type === T.Identifier && node.object.name === memberName) return true;
      if (
        node.object.type === T.MemberExpression
        && node.object.object.type === T.Identifier
        && node.object.property.type === T.Identifier
      ) {
        return node.object.property.name === memberName;
      }
      return false;
    }
    const importSource = settings.importSource ?? DEFAULT_ESLINT_REACT_SETTINGS.importSource;
    const initialScope = context.sourceCode.getScope(node);
    if (node.property.type !== T.Identifier || node.property.name !== name) {
      return false;
    }
    if (node.object.type === T.Identifier && node.object.name === memberName) {
      return isInitializedFromReact(node.object.name, importSource, initialScope);
    }
    if (
      node.object.type === T.MemberExpression
      && node.object.object.type === T.Identifier
      && isInitializedFromReact(node.object.object.name, importSource, initialScope)
      && node.object.property.type === T.Identifier
    ) {
      return node.object.property.name === memberName;
    }
    return false;
  };
}

export declare namespace isCallFromReact {
  type ReturnType = {
    (context: RuleContext): (node: TSESTree.Node) => node is TSESTree.CallExpression;
    (node: TSESTree.Node, context: RuleContext): node is TSESTree.CallExpression;
  };
}

export function isCallFromReact(name: string): isCallFromReact.ReturnType {
  return dual(2, (node: TSESTree.Node, context: RuleContext): node is TSESTree.CallExpression => {
    if (node.type !== T.CallExpression) return false;
    if (!AST.isOneOf([T.Identifier, T.MemberExpression])(node.callee)) return false;
    return isFromReact(name)(node.callee, context);
  });
}

export declare namespace isCallFromReactMember {
  type ReturnType = {
    (context: RuleContext): (node: TSESTree.Node) => node is
      & TSESTree.CallExpression
      & { callee: TSESTree.MemberExpression };
    (node: TSESTree.Node, context: RuleContext): node is
      & TSESTree.CallExpression
      & { callee: TSESTree.MemberExpression };
  };
}

export function isCallFromReactMember(
  pragmaMemberName: string,
  name: string,
): isCallFromReactMember.ReturnType {
  return dual(2, (node: TSESTree.Node, context: RuleContext): node is
    & TSESTree.CallExpression
    & { callee: TSESTree.MemberExpression } =>
  {
    if (node.type !== T.CallExpression) return false;
    if (!AST.is(T.MemberExpression)(node.callee)) return false;
    return isFromReactMember(pragmaMemberName, name)(node.callee, context);
  });
}
