import { unit } from "@eslint-react/eff";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { Scope } from "@typescript-eslint/scope-manager";
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
 * @param initialScope  The initial scope to check for variable declarations
 * @returns The ObjectType of the node, or undefined if not detected
 */
export function getObjectType(
  node: TSESTree.Node | unit,
  initialScope: Scope,
): ObjectType | unit {
  if (node == null) return unit;
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
      return unit;
    }
    case AST.Identifier: {
      function resolve(v: typeof variable) {
        if (v == null) return unit;
        const def = v.defs.at(-1);
        if (def == null) return unit;
        // For variable declarations, use the init property
        if (def.type === DefinitionType.Variable) {
          return def.node.init;
        }
        if (def.type === DefinitionType.Parameter) {
          return unit;
        }
        // For import bindings, we can't resolve the value
        if (def.type === DefinitionType.ImportBinding) {
          return unit;
        }
        // For other types, return the node itself (e.g., function declarations)
        return def.node;
      }
      const variable = initialScope.set.get(node.name);
      const initNode = resolve(variable);
      if (initNode == null) return unit;
      return getObjectType(initNode, initialScope);
    }
    case AST.MemberExpression: {
      if (!("object" in node)) return unit;
      return getObjectType(node.object, initialScope);
    }
    case AST.AssignmentExpression:
    case AST.AssignmentPattern: {
      if (!("right" in node)) return unit;
      return getObjectType(node.right, initialScope);
    }
    case AST.LogicalExpression: {
      return getObjectType(node.right, initialScope);
    }
    case AST.ConditionalExpression: {
      return getObjectType(node.consequent, initialScope) ?? getObjectType(node.alternate, initialScope);
    }
    case AST.SequenceExpression: {
      if (node.expressions.length === 0) {
        return unit;
      }
      return getObjectType(
        node.expressions[node.expressions.length - 1],
        initialScope,
      );
    }
    case AST.CallExpression: {
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
