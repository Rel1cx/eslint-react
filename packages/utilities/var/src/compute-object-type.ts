import type { RuleContext } from "@eslint-react/shared";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

/**
 * Represents the type classification of an object node
 */
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
    // Reason for why the type is unknown
    reason: "call-expression" | "unsupported-node";
  };

/**
 * Detect the ObjectType of a given node
 * @param node The node to check
 * @returns The ObjectType of the node, or undefined if not detected
 */
export function computeObjectType(
  context: RuleContext,
  node: TSESTree.Node | null,
): ObjectType | null {
  if (node == null) return null;
  const initialScope = context.sourceCode.getScope(node);
  switch (node.type) {
    case AST.JSXElement:
    case AST.JSXFragment:
      return { kind: "jsx", node } as const;
    case AST.ArrayExpression:
      return { kind: "array", node } as const;
    case AST.ObjectExpression:
      return { kind: "plain", node } as const;
    case AST.ClassExpression:
      return { kind: "class", node } as const;
    case AST.NewExpression:
    case AST.ThisExpression:
      return { kind: "instance", node } as const;
    case AST.FunctionDeclaration:
    case AST.FunctionExpression:
    case AST.ArrowFunctionExpression:
      return { kind: "function", node } as const;
    case AST.Literal: {
      if ("regex" in node) {
        return { kind: "regexp", node } as const;
      }
      return null;
    }
    case AST.Identifier: {
      const initNode = resolve(context, node, -1);
      if (initNode == null) return null;
      return computeObjectType(context, initNode);
    }
    case AST.MemberExpression: {
      if (!("object" in node)) return null;
      return computeObjectType(context, node.object);
    }
    case AST.AssignmentExpression:
    case AST.AssignmentPattern: {
      if (!("right" in node)) return null;
      return computeObjectType(context, node.right);
    }
    case AST.LogicalExpression: {
      return computeObjectType(context, node.right);
    }
    case AST.ConditionalExpression: {
      return computeObjectType(context, node.consequent) ?? computeObjectType(context, node.alternate);
    }
    case AST.SequenceExpression: {
      if (node.expressions.length === 0) {
        return null;
      }
      return computeObjectType(
        context,
        node.expressions[node.expressions.length - 1] ?? null,
      );
    }
    case AST.CallExpression: {
      return { kind: "unknown", node, reason: "call-expression" } as const;
    }
    default: {
      if (!("expression" in node) || typeof node.expression !== "object") {
        return null;
      }
      return computeObjectType(context, node.expression);
    }
  }
}

function resolve(context: RuleContext, node: TSESTree.Identifier, at = 0) {
  const v = context.sourceCode.getScope(node).set.get(node.name);
  if (v == null) return null;
  const def = v.defs.at(at);
  if (def == null) return null;
  // For variable declarations, use the init property
  if (def.type === DefinitionType.Variable) {
    return def.node.init;
  }
  if (def.type === DefinitionType.Parameter) {
    return null;
  }
  // For import bindings, we can't resolve the value
  if (def.type === DefinitionType.ImportBinding) {
    return null;
  }
  // For other types, return the node itself (e.g., function declarations)
  return def.node;
}
