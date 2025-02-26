import { type _, dual } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS, unsafeDecodeSettings } from "@eslint-react/shared";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isInitializedFromReact } from "./is-initialized-from-react";

const defaultImportSource = DEFAULT_ESLINT_REACT_SETTINGS.importSource;

/* @internal */
export function isFromReactLoose(node: TSESTree.Node | _, name: string) {
  switch (node?.type) {
    case T.Identifier:
      return node.name === name;
    case T.MemberExpression:
      return node.object.type === T.Identifier
        && node.property.type === T.Identifier
        && node.property.name === name;
    default:
      return false;
  }
}

/* @internal */
export function isFromReactStrict(
  node: TSESTree.Node | _,
  name: string,
  importSource: string,
  initialScope: Scope,
) {
  switch (node?.type) {
    case T.Identifier:
      return node.name === name && isInitializedFromReact(name, importSource, initialScope);
    case T.MemberExpression:
      return node.object.type === T.Identifier
        && node.property.type === T.Identifier
        && node.property.name === name
        && isInitializedFromReact(node.object.name, importSource, initialScope);
    default:
      return false;
  }
}

/* @internal */
export declare namespace isFromReact {
  type ReturnType = {
    (context: RuleContext): (node: TSESTree.Node) => node is TSESTree.Identifier | TSESTree.MemberExpression;
    (context: RuleContext, node: TSESTree.Node): node is TSESTree.Identifier | TSESTree.MemberExpression;
  };
}

/* @internal */
export function isFromReact(name: string): isFromReact.ReturnType {
  // dprint-ignore
  return dual(2, (context: RuleContext, node: TSESTree.Node | _): node is TSESTree.Identifier | TSESTree.MemberExpression => {
    if (node == null) return false;
    const { importSource = defaultImportSource, skipImportCheck = true } = unsafeDecodeSettings(context.settings);
    if (skipImportCheck) return isFromReactLoose(node, name);
    return isFromReactStrict(node, name, importSource, context.sourceCode.getScope(node));
  });
}

/* @internal */
export function isFromReactObject(objectName: string, propertyName: string): isFromReact.ReturnType {
  // dprint-ignore
  return dual(2, (context: RuleContext, node: TSESTree.Node | _): node is TSESTree.Identifier | TSESTree.MemberExpression => {
    if (node?.type !== T.MemberExpression) return false;
    const { importSource = defaultImportSource, skipImportCheck = true } = unsafeDecodeSettings(context.settings);
    const { object, property } = node;
    if (skipImportCheck) return isFromReactLoose(object, objectName) && isFromReactLoose(property, propertyName);
    return isFromReactStrict(
      object,
      objectName,
      importSource,
      context.sourceCode.getScope(object),
    ) && isFromReactLoose(property, propertyName);
  });
}

/* @internal */
export declare namespace isCallFromReact {
  type ReturnType = {
    (context: RuleContext): (node: TSESTree.Node) => node is TSESTree.CallExpression;
    (context: RuleContext, node: TSESTree.Node): node is TSESTree.CallExpression;
  };
}

/* @internal */
export function isCallFromReact(name: string): isCallFromReact.ReturnType {
  return dual(2, (context: RuleContext, node: TSESTree.Node): node is TSESTree.CallExpression => {
    if (node.type !== T.CallExpression) return false;
    return isFromReact(name)(context, node.callee);
  });
}

/* @internal */
export function isCallFromReactObject(objectName: string, propertyName: string): isCallFromReact.ReturnType {
  return dual(2, (context: RuleContext, node: TSESTree.Node): node is TSESTree.CallExpression => {
    if (node.type !== T.CallExpression) return false;
    return isFromReactObject(objectName, propertyName)(context, node.callee);
  });
}
