import { Check } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { resolve } from "./resolve";

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
    node: TSESTree.ArrayExpression | TSESTree.CallExpression;
  }
  | {
    kind: "plain";
    node: TSESTree.ObjectExpression | TSESTree.CallExpression;
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
    node: TSESTree.RegExpLiteral | TSESTree.CallExpression;
  }
  | {
    kind: "unknown";
    node: TSESTree.Node;
    reason?: string;
  };

/**
 * Detect the ObjectType of a given node
 * @param context The context of the rule
 * @param node The node to check
 * @returns The ObjectType of the node, or undefined if not detected
 */
export function computeObjectType(
  context: RuleContext,
  node: TSESTree.Node | null,
): ObjectType | null {
  if (node == null) return null;
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
      // Parameters are externally supplied values whose type cannot be statically
      // determined — skip resolution and treat them as unknown.
      const scope = context.sourceCode.getScope(node);
      const def = scope.set.get(node.name)?.defs.at(-1);
      if (def?.type === DefinitionType.Parameter) return null;
      const initNode = resolve(context, node, { at: -1, localOnly: true });
      if (initNode == null) return null;
      return computeObjectType(context, initNode);
    }
    case AST.MemberExpression: {
      return computeObjectType(context, node.object);
    }
    case AST.AssignmentExpression:
    case AST.AssignmentPattern: {
      return computeObjectType(context, node.right);
    }
    case AST.LogicalExpression: {
      return computeObjectType(context, node.left) ?? computeObjectType(context, node.right);
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
      switch (true) {
        case Check.identifier(node.callee, "Boolean"):
          return null;
        case Check.identifier(node.callee, "String"):
          return null;
        case Check.identifier(node.callee, "Number"):
          return null;
        case Check.identifier(node.callee, "Object"):
          return { kind: "plain", node } as const;
        case Check.identifier(node.callee, "Array"):
          return { kind: "array", node } as const;
        case Check.identifier(node.callee, "RegExp"):
          return { kind: "regexp", node } as const;
      }

      // Handle static factory methods (e.g. Array.from(), Object.create())
      if (
        node.callee.type === AST.MemberExpression
        && Check.identifier(node.callee.object)
        && Check.identifier(node.callee.property)
      ) {
        const objName = node.callee.object.name;
        const methodName = node.callee.property.name;
        switch (objName) {
          case "Array":
            if (methodName === "from" || methodName === "of") {
              return { kind: "array", node } as const;
            }
            break;
          case "Object":
            if (methodName === "create" || methodName === "assign" || methodName === "fromEntries") {
              return { kind: "plain", node } as const;
            }
            break;
        }
      }

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
