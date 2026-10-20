import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { hasProperty } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { resolve } from "./resolve";

/**
 * Represents the type classification of an object node.
 */
export type ObjectType =
  | {
    kind: "jsx";
    node: TSESTree.JSXElement | TSESTree.JSXFragment;
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
    node: TSESTree.ClassDeclaration | TSESTree.ClassExpression;
  }
  | {
    kind: "instance";
    node: TSESTree.NewExpression | TSESTree.ThisExpression;
  }
  | {
    kind: "function";
    node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;
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
 * Resolve the object type of the node.
 * @param context The ESLint rule context.
 * @param node The node to resolve.
 * @param options Optional settings:
 * - `boundary`: A node (typically the enclosing component or hook function) that bounds
 *   identifier resolution. Identifiers are resolved through their initializer only when the
 *   binding is declared within the boundary — this catches render-scoped constructions referenced
 *   from nested callbacks, while values declared outside the boundary (e.g. module-level
 *   constants, which are stable across renders) are treated as unresolvable. When omitted, only
 *   the identifier's own scope is searched.
 * @returns The object type of the node, or `null` when it cannot be resolved.
 */
export function resolveObjectType(
  context: RuleContext,
  node: TSESTree.Node | null | undefined,
  options?: Partial<{
    boundary: TSESTree.Node;
  }>,
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
    case AST.ClassDeclaration:
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
      if (hasProperty(node, "regex")) return { kind: "regexp", node } as const;
      return null;
    }
    case AST.Identifier: {
      // Use the latest definition (`at: -1`) because we want the object's
      // current runtime type. If a variable is reassigned or redeclared,
      // earlier definitions are shadowed and no longer represent the value
      // this identifier evaluates to at this point in the program.
      // Parameters are externally supplied values whose type cannot be statically
      // determined — `resolve` returns `null` for them, so they stay unknown.
      const initNode = options?.boundary != null
        ? resolve(context, node, { at: -1, boundary: options.boundary })
        : resolve(context, node, { at: -1, localOnly: true });
      if (initNode == null) return null;
      return resolveObjectType(context, initNode, options);
    }
    case AST.MemberExpression: {
      return resolveObjectType(context, node.object, options);
    }
    case AST.AssignmentExpression:
    case AST.AssignmentPattern: {
      return resolveObjectType(context, node.right, options);
    }
    case AST.LogicalExpression: {
      return resolveObjectType(context, node.left, options) ?? resolveObjectType(context, node.right, options);
    }
    case AST.ConditionalExpression: {
      return resolveObjectType(context, node.consequent, options) ?? resolveObjectType(context, node.alternate, options);
    }
    case AST.SequenceExpression: {
      if (node.expressions.length === 0) return null;
      return resolveObjectType(context, node.expressions.at(-1) ?? null, options);
    }
    case AST.CallExpression: {
      const callee = Extract.unwrap(node.callee);
      switch (true) {
        case Check.isIdentifier(callee, "Boolean"):
          return null;
        case Check.isIdentifier(callee, "String"):
          return null;
        case Check.isIdentifier(callee, "Number"):
          return null;
        case Check.isIdentifier(callee, "Object"):
          return { kind: "plain", node } as const;
        case Check.isIdentifier(callee, "Array"):
          return { kind: "array", node } as const;
        case Check.isIdentifier(callee, "RegExp"):
          return { kind: "regexp", node } as const;
      }

      // Handle static factory methods (e.g. Array.from(), Object.create())
      if (callee.type === AST.MemberExpression && Check.isIdentifier(callee.object)) {
        const objName = callee.object.name;
        const methodName = Extract.getCalleeName(node);
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
      if (!hasProperty(node, "expression") || typeof node.expression !== "object") {
        return null;
      }
      return resolveObjectType(context, node.expression, options);
    }
  }
}
