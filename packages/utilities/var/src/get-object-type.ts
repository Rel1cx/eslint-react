import { unit } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { getVariableDefinitionNode } from "./get-variable-definition-node";

export type ObjectType =
  | {
    kind: "jsx";
    node:
      | TSESTree.JSXElement
      | TSESTree.JSXFragment;
  }
  | {
    kind: "array";
    node: TSESTree.ArrayExpression;
  }
  | {
    kind: "plain";
    node: TSESTree.ObjectExpression;
  }
  | {
    kind: "class";
    node: TSESTree.ClassExpression;
  }
  | {
    kind: "instance";
    node:
      | TSESTree.NewExpression
      | TSESTree.ThisExpression;
  }
  | {
    kind: "function";
    node:
      | TSESTree.FunctionDeclaration
      | TSESTree.FunctionExpression
      | TSESTree.ArrowFunctionExpression;
  }
  | {
    kind: "regexp";
    node: TSESTree.RegExpLiteral;
  }
  | {
    kind: "unknown";
    node: TSESTree.Node;
    // Rreason for why the type is unknown
    reason: "call-expression" | "unsupported-node";
  };

/**
 * Detects the ObjectType of a given node
 * @param node The node to check
 * @param initialScope  The initial scope to check for variable declarations
 * @returns The ObjectType of the node, or undefined if not detected
 */
export function getObjectType(
  node: TSESTree.Node | unit,
  initialScope: Scope,
): ObjectType | unit {
  if (node == null) return unit;
  switch (node.type) {
    case T.JSXElement:
    case T.JSXFragment:
      return { kind: "jsx", node } as const;
    case T.ArrayExpression:
      return { kind: "array", node } as const;
    case T.ObjectExpression:
      return { kind: "plain", node } as const;
    case T.ClassExpression:
      return { kind: "class", node } as const;
    case T.NewExpression:
    case T.ThisExpression:
      return { kind: "instance", node } as const;
    case T.FunctionDeclaration:
    case T.FunctionExpression:
    case T.ArrowFunctionExpression:
      return { kind: "function", node } as const;
    case T.Literal: {
      if ("regex" in node) {
        return { kind: "regexp", node } as const;
      }
      return unit;
    }
    case T.Identifier: {
      if (!("name" in node) || typeof node.name !== "string") {
        return unit;
      }
      const variable = initialScope.set.get(node.name);
      const variableNode = getVariableDefinitionNode(variable, -1);
      return getObjectType(variableNode, initialScope);
    }
    case T.MemberExpression: {
      if (!("object" in node)) return unit;
      return getObjectType(node.object, initialScope);
    }
    case T.AssignmentExpression:
    case T.AssignmentPattern: {
      if (!("right" in node)) return unit;
      return getObjectType(node.right, initialScope);
    }
    case T.LogicalExpression: {
      return getObjectType(node.right, initialScope);
    }
    case T.ConditionalExpression: {
      return getObjectType(node.consequent, initialScope) ?? getObjectType(node.alternate, initialScope);
    }
    case T.SequenceExpression: {
      if (node.expressions.length === 0) {
        return unit;
      }
      return getObjectType(
        node.expressions[node.expressions.length - 1],
        initialScope,
      );
    }
    case T.CallExpression: {
      return { kind: "unknown", node, reason: "call-expression" } as const;
    }
    default: {
      if (!("expression" in node) || typeof node.expression !== "object") {
        return unit;
      }
      return getObjectType(node.expression, initialScope);
    }
  }
}
