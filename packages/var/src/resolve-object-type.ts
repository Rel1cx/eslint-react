import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { hasProperty } from "@local/eff";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { getBindingFromScope, projectBinding } from "./resolve-binding";

/**
 * Represents the type classification of an object node.
 *
 * `via` records how a known kind was constructed (a literal, a call, a
 * declaration, ...), so consumers can distinguish e.g. `[]` from `Array()`
 * without inspecting `node.type`. `unknown` carries a typed `reason` instead.
 */
export type ObjectType =
  | {
    readonly kind: "jsx";
    readonly node: TSESTree.JSXElement | TSESTree.JSXFragment;
    readonly via: "jsx";
  }
  | {
    readonly kind: "array";
    readonly node: TSESTree.ArrayExpression | TSESTree.CallExpression;
    readonly via: "literal" | "call";
  }
  | {
    readonly kind: "plain";
    readonly node: TSESTree.ObjectExpression | TSESTree.CallExpression;
    readonly via: "literal" | "call";
  }
  | {
    readonly kind: "class";
    readonly node: TSESTree.ClassDeclaration | TSESTree.ClassExpression;
    readonly via: "declaration" | "expression";
  }
  | {
    readonly kind: "instance";
    readonly node: TSESTree.NewExpression | TSESTree.ThisExpression;
    readonly via: "new" | "this";
  }
  | {
    readonly kind: "function";
    readonly node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;
    readonly via: "declaration" | "expression" | "arrow";
  }
  | {
    readonly kind: "regexp";
    readonly node: TSESTree.RegExpLiteral | TSESTree.CallExpression;
    readonly via: "literal" | "call";
  }
  | {
    readonly kind: "unknown";
    readonly node: TSESTree.Node;
    /** Why the node could not be classified. */
    readonly reason: "call-expression";
  };

/** Options for {@link resolveObjectType}. */
export interface ResolveObjectTypeOptions {
  /** Index of the definition to resolve (default: `-1`, the latest definition). */
  at?: number;
  /**
   * Scope traversal mode.
   *
   * - `"local"`: only follow bindings declared in the same scope as the identifier (default).
   * - `"chain"`: also follow bindings declared in enclosing scopes.
   *
   * This maps internally to `localOnly` in {@link ResolveOptions}.
   */
  scope?: "local" | "chain";
}

/**
 * Check whether an identifier refers to an unshadowed global binding.
 *
 * Built-in constructor names are only trusted when they are not redeclared
 * locally, otherwise `const Array = () => ...` would be classified as an array.
 * @param context The ESLint rule context.
 * @param node The identifier to check.
 * @returns `true` when the identifier has no local declaration.
 */
function isUnshadowedGlobal(context: RuleContext, node: TSESTree.Identifier): boolean {
  const variable = findVariable(context.sourceCode.getScope(node), node);
  return variable == null || variable.defs.length === 0;
}

/** Normalized internal options shared by every recursion step. */
interface ObjectTypeResolutionOptions {
  at: number;
  localOnly: boolean;
}

/**
 * Resolve the object type of the node.
 * @param context The ESLint rule context.
 * @param node The node to resolve.
 * @param options Optional resolution settings; see {@link ResolveObjectTypeOptions}.
 * @returns The object type of the node, or `null` when it cannot be resolved.
 */
export function resolveObjectType(context: RuleContext, node: TSESTree.Node | null | undefined, options?: ResolveObjectTypeOptions): ObjectType | null {
  return resolveObjectTypeInner(context, node, new Set(), {
    at: options?.at ?? -1,
    localOnly: (options?.scope ?? "local") === "local",
  });
}

function resolveObjectTypeInner(
  context: RuleContext,
  node: TSESTree.Node | null | undefined,
  seen: Set<TSESTree.Node>,
  options: ObjectTypeResolutionOptions,
): ObjectType | null {
  if (node == null) return null;
  switch (node.type) {
    case AST.JSXElement:
    case AST.JSXFragment:
      return { kind: "jsx", node, via: "jsx" } as const;
    case AST.ArrayExpression:
      return { kind: "array", node, via: "literal" } as const;
    case AST.ObjectExpression:
      return { kind: "plain", node, via: "literal" } as const;
    case AST.ClassDeclaration:
      return { kind: "class", node, via: "declaration" } as const;
    case AST.ClassExpression:
      return { kind: "class", node, via: "expression" } as const;
    case AST.NewExpression:
      return { kind: "instance", node, via: "new" } as const;
    case AST.ThisExpression:
      return { kind: "instance", node, via: "this" } as const;
    case AST.FunctionDeclaration:
      return { kind: "function", node, via: "declaration" } as const;
    case AST.FunctionExpression:
      return { kind: "function", node, via: "expression" } as const;
    case AST.ArrowFunctionExpression:
      return { kind: "function", node, via: "arrow" } as const;
    case AST.Literal: {
      if (hasProperty(node, "regex")) return { kind: "regexp", node, via: "literal" } as const;
      return null;
    }
    case AST.Identifier: {
      // Guard against cyclic alias chains (e.g. `const a = b; const b = a;`),
      // which would otherwise recurse until the call stack overflows.
      if (seen.has(node)) return null;
      seen.add(node);
      const scope = context.sourceCode.getScope(node);
      // The default `at: -1` selects the latest definition because we want the
      // object's current runtime type. If a variable is reassigned or redeclared,
      // earlier definitions are shadowed and no longer represent the value
      // this identifier evaluates to at this point in the program.
      const binding = getBindingFromScope(scope, node, { at: options.at, localOnly: options.localOnly });
      // Parameters are externally supplied values whose type cannot be statically
      // determined — skip resolution and treat them as unknown.
      if (binding?.definition?.type === DefinitionType.Parameter) return null;
      const initNode = binding?.definition == null ? null : projectBinding(binding.definition, "value");
      if (initNode == null) return null;
      return resolveObjectTypeInner(context, initNode, seen, options);
    }
    case AST.MemberExpression: {
      return resolveObjectTypeInner(context, node.object, seen, options);
    }
    case AST.AssignmentExpression:
    case AST.AssignmentPattern: {
      return resolveObjectTypeInner(context, node.right, seen, options);
    }
    case AST.LogicalExpression: {
      // Use independent `seen` sets per branch: resolving one side must not
      // suppress resolution of the other.
      return resolveObjectTypeInner(context, node.left, new Set(seen), options)
        ?? resolveObjectTypeInner(context, node.right, new Set(seen), options);
    }
    case AST.ConditionalExpression: {
      return resolveObjectTypeInner(context, node.consequent, new Set(seen), options)
        ?? resolveObjectTypeInner(context, node.alternate, new Set(seen), options);
    }
    case AST.SequenceExpression: {
      if (node.expressions.length === 0) return null;
      return resolveObjectTypeInner(context, node.expressions.at(-1) ?? null, seen, options);
    }
    case AST.CallExpression: {
      const callee = Extract.unwrap(node.callee);
      switch (true) {
        case Check.isIdentifier(callee, "Boolean")
          && isUnshadowedGlobal(context, callee):
          return null;
        case Check.isIdentifier(callee, "String")
          && isUnshadowedGlobal(context, callee):
          return null;
        case Check.isIdentifier(callee, "Number")
          && isUnshadowedGlobal(context, callee):
          return null;
        case Check.isIdentifier(callee, "Object")
          && isUnshadowedGlobal(context, callee):
          return { kind: "plain", node, via: "call" } as const;
        case Check.isIdentifier(callee, "Array")
          && isUnshadowedGlobal(context, callee):
          return { kind: "array", node, via: "call" } as const;
        case Check.isIdentifier(callee, "RegExp")
          && isUnshadowedGlobal(context, callee):
          return { kind: "regexp", node, via: "call" } as const;
      }

      // Handle static factory methods (e.g. Array.from(), Object.create())
      if (callee.type === AST.MemberExpression && Check.isIdentifier(callee.object) && isUnshadowedGlobal(context, callee.object)) {
        const objName = callee.object.name;
        const methodName = Extract.getCalleeName(node);
        switch (objName) {
          case "Array":
            if (methodName === "from" || methodName === "of") {
              return { kind: "array", node, via: "call" } as const;
            }
            break;
          case "Object":
            if (methodName === "create" || methodName === "assign" || methodName === "fromEntries") {
              return { kind: "plain", node, via: "call" } as const;
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
      return resolveObjectTypeInner(context, node.expression, seen, options);
    }
  }
}
