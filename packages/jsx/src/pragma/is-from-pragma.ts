import { findVariableByName, getVariablesUpToGlobal, NodeType } from "@eslint-react/ast";
import { M, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { getPragmaFromContext } from "./get-pragma";

export function isInitializedFromPragma(
  variableName: string,
  context: RuleContext,
  initialScope: Scope,
  pragma = getPragmaFromContext(context),
) {
  const variables = getVariablesUpToGlobal(initialScope);
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
    if (M.isMatching({ type: "MemberExpression", object: { type: "Identifier", name: pragma } }, init)) {
      return true;
    }

    // check for: `{ variable } = pragma`
    if (M.isMatching({ type: "Identifier", name: pragma }, init)) {
      return true;
    }

    // check if from a require call: `require("react")`
    const maybeRequireExpression = M.match(init)
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
    if (O.isNone(maybeRequireExpression)) {
      return false;
    }
    const requireExpression = maybeRequireExpression.value;
    const [firstArg] = requireExpression.arguments;
    if (firstArg?.type !== NodeType.Literal) {
      return false;
    }

    return firstArg.value === pragma.toLowerCase();
  }

  // latest definition is an import declaration: import { variable } from 'react'
  return M.isMatching({ type: "ImportDeclaration", source: { value: pragma.toLowerCase() } }, parent);
}

export function isPropertyOfPragma(name: string, context: RuleContext, pragma = getPragmaFromContext(context)) {
  const isMatch: (node: TSESTree.Node) => boolean = M.isMatching({
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

export type CallFromPragmaPredicate = (
  node: TSESTree.Node,
  context: RuleContext,
) => node is TSESTree.CallExpression;

/**
 * Checks if the given node is a call expression to the given function or method of the pragma
 * @param name The name of the function or method to check
 * @returns A predicate that checks if the given node is a call expression to the given function or method
 */
export function isCallFromPragma(name: string) {
  return (node: TSESTree.Node, context: RuleContext): node is TSESTree.CallExpression => {
    const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
    if (node.type !== NodeType.CallExpression || !("callee" in node)) {
      return false;
    }

    if (node.callee.type === NodeType.MemberExpression) {
      return isPropertyOfPragma(name, context)(node.callee);
    }

    if ("name" in node.callee && node.callee.name === name) {
      return isInitializedFromPragma(name, context, initialScope);
    }

    return false;
  };
}
