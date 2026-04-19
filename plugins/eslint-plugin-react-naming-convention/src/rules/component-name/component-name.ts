import * as core from "@eslint-react/core";
import {
  type RuleContext,
  type RuleFeature,
  merge,
} from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";
import { P, match } from "ts-pattern";

import { createRule } from "../../utils";

export const RULE_NAME = "component-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalidComponentName";

type FunctionNode =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression;

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforces the component name to be a valid PascalCase identifier.",
    },
    messages: {
      invalidComponentName: "Component '{{name}}' must be named in PascalCase.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const jsxFunctions = new WeakSet<FunctionNode>();

  function markEnclosingFunction(node: TSESTree.Node) {
    let current: TSESTree.Node | undefined = node.parent;
    while (current) {
      if (
        current.type === AST.FunctionDeclaration ||
        current.type === AST.FunctionExpression ||
        current.type === AST.ArrowFunctionExpression
      ) {
        jsxFunctions.add(current as FunctionNode);
        return;
      }
      current = current.parent;
    }
  }

  function checkFunction(node: FunctionNode) {
    if (!jsxFunctions.has(node)) return;
    const [id, name] = match(node)
      .with(
        {
          type: AST.FunctionDeclaration,
          id: { type: AST.Identifier, name: P.string },
        },
        (fn) => [fn.id, fn.id.name] as const,
      )
      .with(
        {
          parent: {
            type: AST.VariableDeclarator,
            id: { type: AST.Identifier, name: P.string },
          },
        },
        (fn) => {
          const parent = fn.parent as TSESTree.VariableDeclarator;
          const varId = parent.id as TSESTree.Identifier;
          return [varId, varId.name] as const;
        },
      )
      .with(
        {
          type: AST.FunctionExpression,
          id: { type: AST.Identifier, name: P.string },
        },
        (fn) => [fn.id, fn.id.name] as const,
      )
      .otherwise(() => [null, null] as const);

    if (id == null || name == null) return;
    if (name.startsWith("use")) return;
    if (core.isFunctionComponentName(name)) return;
    context.report({
      data: { name },
      messageId: "invalidComponentName",
      node: id,
    });
  }

  return merge({
    JSXElement: markEnclosingFunction,
    JSXFragment: markEnclosingFunction,
    "ArrowFunctionExpression:exit": checkFunction,
    "FunctionDeclaration:exit": checkFunction,
    "FunctionExpression:exit": checkFunction,
  });
}
