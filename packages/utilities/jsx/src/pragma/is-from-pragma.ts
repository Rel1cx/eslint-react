import { is, isOneOf, NodeType } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import { findVariable } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { Option as O } from "effect";
import { isMatching, match } from "ts-pattern";

import { getPragmaFromContext } from "./get-pragma";

export function isInitializedFromPragma(
  variableName: string,
  context: RuleContext,
  initialScope: Scope,
  pragma = getPragmaFromContext(context),
) {
  const maybeVariable = findVariable(variableName, initialScope);
  const maybeLatestDef = O.flatMapNullable(maybeVariable, (variable) => variable.defs.at(-1));
  if (O.isNone(maybeLatestDef)) return false;
  const latestDef = maybeLatestDef.value;
  const { node, parent } = latestDef;
  if (node.type === NodeType.VariableDeclarator && node.init) {
    const { init } = node;
    // check for: `variable = pragma.variable`
    if (isMatching({ type: "MemberExpression", object: { type: "Identifier", name: pragma } }, init)) return true;
    // check for: `{ variable } = pragma`
    if (isMatching({ type: "Identifier", name: pragma }, init)) return true;
    // check if from a require call: `require("react")`
    const maybeRequireExpression = match(init)
      .with({
        type: NodeType.CallExpression,
        callee: { type: NodeType.Identifier, name: "require" },
      }, (exp) => O.some(exp))
      .with(
        {
          type: NodeType.MemberExpression,
          object: {
            type: NodeType.CallExpression,
            callee: { type: NodeType.Identifier, name: "require" },
          },
        },
        ({ object }) => O.some(object),
      )
      .otherwise(O.none);
    if (O.isNone(maybeRequireExpression)) return false;
    const requireExpression = maybeRequireExpression.value;
    const [firstArg] = requireExpression.arguments;
    if (firstArg?.type !== NodeType.Literal) return false;

    return firstArg.value === pragma.toLowerCase();
  }

  // latest definition is an import declaration: import { variable } from 'react'
  return isMatching({ type: "ImportDeclaration", source: { value: pragma.toLowerCase() } }, parent);
}

export function isPropertyOfPragma(name: string, context: RuleContext, pragma = getPragmaFromContext(context)) {
  const isMatch: (node: TSESTree.Node) => boolean = isMatching({
    type: NodeType.MemberExpression,
    object: {
      type: NodeType.Identifier,
      name: pragma,
    },
    property: {
      name,
    },
  });

  return isMatch;
}

/**
 * Checks if the given node is a call expression to the given function or method of the pragma
 * @param name The name of the function or method to check
 * @returns A predicate that checks if the given node is a call expression to the given function or method
 */
export function isFromPragma(name: string) {
  return (
    node: TSESTree.Identifier | TSESTree.MemberExpression,
    context: RuleContext,
  ) => {
    const initialScope = context.sourceCode.getScope(node);
    if (node.type === NodeType.MemberExpression) return isPropertyOfPragma(name, context)(node);
    if (node.name === name) return isInitializedFromPragma(name, context, initialScope);

    return false;
  };
}

/**
 * @internal
 * @param pragmaMemberName
 * @param name
 * @returns A function that checks if a given node is a member expression of a Pragma member.
 */
export function isFromPragmaMember(
  pragmaMemberName: string,
  name: string,
): (node: TSESTree.MemberExpression, context: RuleContext, pragma?: string) => boolean {
  return (
    node: TSESTree.MemberExpression,
    context: RuleContext,
    pragma = getPragmaFromContext(context),
  ) => {
    const initialScope = context.sourceCode.getScope(node);
    if (node.property.type !== NodeType.Identifier || node.property.name !== name) return false;
    if (node.object.type === NodeType.Identifier && node.object.name === pragmaMemberName) {
      return isInitializedFromPragma(node.object.name, context, initialScope, pragma);
    }
    if (
      node.object.type === NodeType.MemberExpression
      && node.object.object.type === NodeType.Identifier
      && node.object.object.name === pragma
      && node.object.property.type === NodeType.Identifier
    ) {
      return node.object.property.name === pragmaMemberName;
    }

    return false;
  };
}

export function isCallFromPragma(name: string) {
  return (node: TSESTree.CallExpression, context: RuleContext) => {
    if (!isOneOf([NodeType.Identifier, NodeType.MemberExpression])(node.callee)) return false;

    return isFromPragma(name)(node.callee, context);
  };
}

export function isCallFromPragmaMember(
  pragmaMemberName: string,
  name: string,
) {
  return (node: TSESTree.CallExpression, context: RuleContext) => {
    if (!is(NodeType.MemberExpression)(node.callee)) return false;

    return isFromPragmaMember(pragmaMemberName, name)(node.callee, context);
  };
}
