import { unit } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { getVariableDefinitionNode } from "./variable-resolver";

export const ConstructionDetectionHint = {
  None: 0n,
  StrictCallExpression: 1n << 0n,
};

export type Construction =
  | { kind: "ArrayExpression"; node: TSESTree.ArrayExpression }
  | { kind: "CallExpression"; node: TSESTree.CallExpression }
  | { kind: "ClassExpression"; node: TSESTree.ClassExpression }
  | { kind: "FunctionDeclaration"; node: TSESTree.FunctionDeclaration }
  | { kind: "FunctionExpression"; node: TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression }
  | { kind: "JSXElement"; node: TSESTree.JSXElement | TSESTree.JSXFragment }
  | { kind: "NewExpression"; node: TSESTree.NewExpression }
  | { kind: "ObjectExpression"; node: TSESTree.ObjectExpression }
  | { kind: "RegExpLiteral"; node: TSESTree.RegExpLiteral };

/**
 * Detects the construction type of a given node.
 * @param node The node to check.
 * @param initialScope  The initial scope to check for variable declarations.
 * @param hint Optional hint to control the detection behavior.
 * @returns The construction type of the node, or `_` if not found.
 */
export function getConstruction(
  node: TSESTree.Node | unit,
  initialScope: Scope,
  hint = ConstructionDetectionHint.None,
): Construction | unit {
  if (node == null) return unit;
  switch (node.type) {
    case T.JSXElement:
    case T.JSXFragment:
      return { kind: "JSXElement", node } as const;
    case T.ArrayExpression:
      return { kind: "ArrayExpression", node } as const;
    case T.ObjectExpression:
      return { kind: "ObjectExpression", node } as const;
    case T.ClassExpression:
      return { kind: "ClassExpression", node } as const;
    case T.NewExpression:
      return { kind: "NewExpression", node } as const;
    case T.FunctionExpression:
    case T.ArrowFunctionExpression:
      return { kind: "FunctionExpression", node } as const;
    case T.CallExpression: {
      if (hint & ConstructionDetectionHint.StrictCallExpression) {
        return { kind: "CallExpression", node } as const;
      }
      return unit;
    }
    case T.MemberExpression: {
      if (!("object" in node)) return unit;
      return getConstruction(node.object, initialScope, hint);
    }
    case T.AssignmentExpression:
    case T.AssignmentPattern: {
      if (!("right" in node)) return unit;
      return getConstruction(node.right, initialScope, hint);
    }
    case T.LogicalExpression: {
      const lvc = getConstruction(node.left, initialScope, hint);
      if (lvc == null) return unit;
      return getConstruction(node.right, initialScope, hint);
    }
    case T.ConditionalExpression: {
      const cvc = getConstruction(node.consequent, initialScope, hint);
      if (cvc == null) return unit;
      return getConstruction(node.alternate, initialScope, hint);
    }
    case T.Identifier: {
      if (!("name" in node) || typeof node.name !== "string") {
        return unit;
      }
      const variable = initialScope.set.get(node.name);
      const variableNode = getVariableDefinitionNode(variable, -1);
      return getConstruction(variableNode, initialScope, hint);
    }
    case T.Literal: {
      if ("regex" in node) {
        return { kind: "RegExpLiteral", node } as const;
      }
      return unit;
    }
    default: {
      if (!("expression" in node) || typeof node.expression !== "object") {
        return unit;
      }
      return getConstruction(node.expression, initialScope, hint);
    }
  }
}
