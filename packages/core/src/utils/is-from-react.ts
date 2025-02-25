import type { RuleContext } from "@eslint-react/shared";
import { DEFAULT_ESLINT_REACT_SETTINGS, unsafeDecodeSettings } from "@eslint-react/shared";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isInitializedFromReact } from "./is-initialized-from-react";

const defaultImportSource = DEFAULT_ESLINT_REACT_SETTINGS.importSource;

/* @internal */
export function isFromReactLoose(node: TSESTree.Identifier | TSESTree.MemberExpression, name: string) {
  if (node.type === T.MemberExpression) {
    return node.object.type === T.Identifier
      && node.property.type === T.Identifier
      && node.property.name === name;
  }
  return node.name === name;
}

/* @internal */
export function isFromReactStrict(
  node: TSESTree.Identifier | TSESTree.MemberExpression,
  name: string,
  importSource: string,
  initialScope: Scope,
) {
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
}

export function isFromReact(name: string) {
  return (context: RuleContext, node: TSESTree.Identifier | TSESTree.MemberExpression) => {
    const { importSource = defaultImportSource, strictImportCheck = false } = unsafeDecodeSettings(context.settings);
    if (!strictImportCheck) return isFromReactLoose(node, name);
    return isFromReactStrict(node, name, importSource, context.sourceCode.getScope(node));
  };
}

/* @internal */
export function isFromReactMemberLoose(node: TSESTree.MemberExpression, memberName: string, name: string) {
  const { object, property } = node;
  if (property.type !== T.Identifier || property.name !== name) return false;
  if (object.type === T.Identifier && object.name === memberName) return true;
  if (
    object.type === T.MemberExpression
    && object.object.type === T.Identifier
    && object.property.type === T.Identifier
  ) {
    return object.property.name === memberName;
  }
  return false;
}

/* @internal */
export function isFromReactMemberStrict(
  node: TSESTree.MemberExpression,
  memberName: string,
  name: string,
  importSource: string,
  initialScope: Scope,
) {
  const { object, property } = node;
  if (property.type !== T.Identifier || property.name !== name) {
    return false;
  }
  if (object.type === T.Identifier && object.name === memberName) {
    return isInitializedFromReact(object.name, importSource, initialScope);
  }
  if (
    object.type === T.MemberExpression
    && object.object.type === T.Identifier
    && isInitializedFromReact(object.object.name, importSource, initialScope)
    && object.property.type === T.Identifier
  ) {
    return object.property.name === memberName;
  }
  return false;
}

export function isFromReactMember(memberName: string, name: string) {
  return (context: RuleContext, node: TSESTree.MemberExpression) => {
    const { importSource = defaultImportSource, strictImportCheck = false } = unsafeDecodeSettings(context.settings);
    if (!strictImportCheck) return isFromReactMemberLoose(node, memberName, name);
    return isFromReactMemberStrict(node, memberName, name, importSource, context.sourceCode.getScope(node));
  };
}
