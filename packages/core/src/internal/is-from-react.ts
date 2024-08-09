import { is, isOneOf } from "@eslint-react/ast";
import type { ESLintReactSettings } from "@eslint-react/shared";
import { unsafeCastSettings } from "@eslint-react/shared";
import { isString, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { isMatching, match } from "ts-pattern";

export function isInitializedFromReact(
  variableName: string,
  initialScope: Scope,
  settings: Partial<Pick<ESLintReactSettings, "importSource" | "skipImportCheck">>,
): boolean {
  if (settings.skipImportCheck) return true;
  // Optimistic assertion when identifier is named react
  if (variableName.toLowerCase() === "react") return true;
  const { importSource = "react" } = settings;
  const maybeVariable = findVariable(variableName, initialScope);
  const maybeLatestDef = O.flatMapNullable(maybeVariable, (v) => v.defs.at(-1));
  if (O.isNone(maybeLatestDef)) return false;
  const latestDef = maybeLatestDef.value;
  const { node, parent } = latestDef;
  if (node.type === AST_NODE_TYPES.VariableDeclarator && node.init) {
    const { init } = node;
    // check for: `variable = React.variable`
    if (init.type === AST_NODE_TYPES.MemberExpression && init.object.type === AST_NODE_TYPES.Identifier) {
      return isInitializedFromReact(init.object.name, initialScope, settings);
    }
    // check for: `{ variable } = React`
    if (init.type === AST_NODE_TYPES.Identifier) {
      return isInitializedFromReact(init.name, initialScope, settings);
    }
    const maybeRequireExpression = match(init)
      .with({
        type: AST_NODE_TYPES.CallExpression,
        callee: { type: AST_NODE_TYPES.Identifier, name: "require" },
      }, (exp) => O.some(exp))
      .with(
        {
          type: AST_NODE_TYPES.MemberExpression,
          object: {
            type: AST_NODE_TYPES.CallExpression,
            callee: { type: AST_NODE_TYPES.Identifier, name: "require" },
          },
        },
        ({ object }) => O.some(object),
      )
      .otherwise(O.none);
    if (O.isNone(maybeRequireExpression)) return false;
    const requireExpression = maybeRequireExpression.value;
    const [firstArg] = requireExpression.arguments;
    if (firstArg?.type !== AST_NODE_TYPES.Literal || !isString(firstArg.value)) return false;
    return firstArg.value === importSource || firstArg.value.startsWith(`${importSource}/`);
  }
  // latest definition is an import declaration: import { variable } from 'react'
  return isMatching({ type: "ImportDeclaration", source: { value: importSource } }, parent);
}

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
    const settings = unsafeCastSettings(context.settings);
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
    const settings = unsafeCastSettings(context.settings);
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

export function isCallFromReact(name: string) {
  return (node: TSESTree.CallExpression, context: RuleContext) => {
    if (!isOneOf([AST_NODE_TYPES.Identifier, AST_NODE_TYPES.MemberExpression])(node.callee)) return false;
    return isFromReact(name)(node.callee, context);
  };
}

export function isCallFromReactMember(
  pragmaMemberName: string,
  name: string,
) {
  return (node: TSESTree.CallExpression, context: RuleContext) => {
    if (!is(AST_NODE_TYPES.MemberExpression)(node.callee)) return false;
    return isFromReactMember(pragmaMemberName, name)(node.callee, context);
  };
}
