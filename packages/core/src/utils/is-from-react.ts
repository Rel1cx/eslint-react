import type { _ } from "@eslint-react/eff";
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

export function isFromReact(name: string) {
  return (context: RuleContext, node: TSESTree.Identifier | TSESTree.MemberExpression) => {
    const { importSource = defaultImportSource, skipImportCheck = true } = unsafeDecodeSettings(context.settings);
    if (skipImportCheck) return isFromReactLoose(node, name);
    return isFromReactStrict(node, name, importSource, context.sourceCode.getScope(node));
  };
}

export function isFromReactMember(memberName: string, name: string) {
  return (context: RuleContext, node: TSESTree.MemberExpression) => {
    const { importSource = defaultImportSource, skipImportCheck = true } = unsafeDecodeSettings(context.settings);
    const { object, property } = node;
    if (skipImportCheck) return isFromReactLoose(object, memberName) && isFromReactLoose(property, name);
    return isFromReactStrict(
      object,
      memberName,
      importSource,
      context.sourceCode.getScope(object),
    ) && isFromReactStrict(property, name, importSource, context.sourceCode.getScope(property));
  };
}
