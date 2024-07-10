import { is, isOneOf, NodeType } from "@eslint-react/ast";
import { getESLintReactSettings } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import { findVariable } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { Option as O, Predicate as Pred } from "effect";
import { isMatching, match } from "ts-pattern";

export function isInitializedFromReact(
  variableName: string,
  context: RuleContext,
  initialScope: Scope,
): boolean {
  if (variableName.toLowerCase() === "react") return true;
  const maybeVariable = findVariable(variableName, initialScope);
  const maybeLatestDef = O.flatMapNullable(maybeVariable, (v) => v.defs.at(-1));
  if (O.isNone(maybeLatestDef)) return false;
  const latestDef = maybeLatestDef.value;
  const { node, parent } = latestDef;
  const settings = getESLintReactSettings(context.settings);
  const importSource = settings.importSource ?? "react";
  if (node.type === NodeType.VariableDeclarator && node.init) {
    const { init } = node;
    // check for: `variable = React.variable`
    if (init.type === NodeType.MemberExpression && init.object.type === NodeType.Identifier) {
      return isInitializedFromReact(init.object.name, context, initialScope);
    }
    // check for: `{ variable } = React`
    if (init.type === NodeType.Identifier) {
      return isInitializedFromReact(init.name, context, initialScope);
    }
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
    if (firstArg?.type !== NodeType.Literal || !Pred.isString(firstArg.value)) return false;
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
    const initialScope = context.sourceCode.getScope(node);
    if (node.type === NodeType.MemberExpression) {
      return node.object.type === NodeType.Identifier
        && node.property.type === NodeType.Identifier
        && node.property.name === name
        && isInitializedFromReact(node.object.name, context, initialScope);
    }
    if (node.name === name) return isInitializedFromReact(name, context, initialScope);
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
    const initialScope = context.sourceCode.getScope(node);
    if (node.property.type !== NodeType.Identifier || node.property.name !== name) return false;
    if (node.object.type === NodeType.Identifier && node.object.name === memberName) {
      return isInitializedFromReact(node.object.name, context, initialScope);
    }
    if (
      node.object.type === NodeType.MemberExpression
      && node.object.object.type === NodeType.Identifier
      && isInitializedFromReact(node.object.object.name, context, initialScope)
      && node.object.property.type === NodeType.Identifier
    ) {
      return node.object.property.name === memberName;
    }

    return false;
  };
}

export function isCallFromReact(name: string) {
  return (node: TSESTree.CallExpression, context: RuleContext) => {
    if (!isOneOf([NodeType.Identifier, NodeType.MemberExpression])(node.callee)) return false;

    return isFromReact(name)(node.callee, context);
  };
}

export function isCallFromReactMember(
  pragmaMemberName: string,
  name: string,
) {
  return (node: TSESTree.CallExpression, context: RuleContext) => {
    if (!is(NodeType.MemberExpression)(node.callee)) return false;

    return isFromReactMember(pragmaMemberName, name)(node.callee, context);
  };
}
