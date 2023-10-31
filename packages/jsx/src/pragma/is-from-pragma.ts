import { findVariableByName, getVariablesUpToGlobal, NodeType } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { isMatching, match } from "ts-pattern";

import { getPragmaFromContext } from "./get-pragma";
import { isPropertyOfPragma } from "./is-property-of-pragma";

export function isInitializedFromPragma(
  variableName: string,
  context: RuleContext,
  pragma = getPragmaFromContext(context),
) {
  const variables = getVariablesUpToGlobal(context.getScope());
  const maybeVariable = findVariableByName(variableName)(variables);
  const maybeLatestDef = O.flatMapNullable(maybeVariable, (variable) => variable.defs.at(-1));

  if (O.isNone(maybeLatestDef)) {
    return false;
  }

  const latestDef = maybeLatestDef.value;
  const { node, parent } = latestDef;

  if (node.type === NodeType.VariableDeclarator && node.init) {
    const { init } = node;

    // check for: `variable = pragma.variable`
    if (isMatching({ type: "MemberExpression", object: { type: "Identifier", name: pragma } }, init)) {
      return true;
    }

    // check for: `{ variable } = pragma`
    if (isMatching({ type: "Identifier", name: pragma }, init)) {
      return true;
    }

    // check if from a require call: `require("react")`
    const maybeRequireExpression = match(init)
      .with({ type: NodeType.CallExpression }, (exp) => O.some(exp))
      .with(
        { type: NodeType.MemberExpression, object: { type: NodeType.CallExpression } },
        ({ object }) => O.some(object),
      )
      .otherwise(O.none);

    if (O.isNone(maybeRequireExpression)) {
      return false;
    }

    const requireExpression = maybeRequireExpression.value;
    if (requireExpression.callee.type !== NodeType.Identifier) {
      return false;
    }

    const calleeName = requireExpression.callee.name;
    const [firstArg] = requireExpression.arguments;
    if (calleeName !== "require" || firstArg?.type !== NodeType.Literal) {
      return false;
    }

    return firstArg.value === pragma.toLowerCase();
  }

  // latest definition is an import declaration: import { variable } from 'react'
  return isMatching({ type: "ImportDeclaration", source: { value: pragma.toLowerCase() } }, parent);
}

export type CallFromPragmaPredicate = (node: TSESTree.Node, context: RuleContext) => node is TSESTree.CallExpression;

/**
 * Checks if the given node is a call expression to the given function or method of the pragma
 * @param name The name of the function or method to check
 * @returns A predicate that checks if the given node is a call expression to the given function or method
 */
export function isCallFromPragma(name: string) {
  return (node: TSESTree.Node, context: RuleContext): node is TSESTree.CallExpression => {
    if (node.type !== NodeType.CallExpression || !("callee" in node)) {
      return false;
    }

    if (node.callee.type === NodeType.MemberExpression) {
      return isPropertyOfPragma(name, context)(node.callee);
    }

    if ("name" in node.callee && node.callee.name === name) {
      return isInitializedFromPragma(name, context);
    }

    return false;
  };
}
