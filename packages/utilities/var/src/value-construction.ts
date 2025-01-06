import { F, isObject, isString, O } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { getVariableNode } from "./get-variable-node";

/* eslint-disable perfectionist/sort-union-types */
export type ValueConstruction =
  | { kind: "None"; node: TSESTree.Node }
  | { kind: "ArrayExpression"; node: TSESTree.ArrayExpression }
  | { kind: "CallExpression"; node: TSESTree.CallExpression }
  | { kind: "ClassExpression"; node: TSESTree.ClassExpression }
  | { kind: "FunctionDeclaration"; node: TSESTree.FunctionDeclaration }
  | { kind: "FunctionExpression"; node: TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression }
  | { kind: "JSXElement"; node: TSESTree.JSXElement | TSESTree.JSXFragment }
  | { kind: "NewExpression"; node: TSESTree.NewExpression }
  | { kind: "ObjectExpression"; node: TSESTree.ObjectExpression }
  | { kind: "RegExpLiteral"; node: TSESTree.RegExpLiteral };
/* eslint-enable perfectionist/sort-union-types */

export const ValueConstructionHint = {
  None: 0n,
  StrictCallExpression: 1n << 0n,
};

/**
 * Get a function that detects the construction of a given node.
 * @param node The AST node to detect the construction of
 * @param initialScope The initial scope to use when detecting the construction
 * @param hint The hint to use when detecting the construction
 * @returns A function that detects the construction of a given node
 */
export function getValueConstruction(
  node: TSESTree.Node,
  initialScope: Scope,
  hint = ValueConstructionHint.None,
): ValueConstruction {
  switch (node.type) {
    case T.JSXElement:
    case T.JSXFragment: {
      return { kind: "JSXElement", node } as const;
    }
    case T.ArrayExpression: {
      return { kind: "ArrayExpression", node } as const;
    }
    case T.ObjectExpression: {
      return { kind: "ObjectExpression", node } as const;
    }
    case T.ClassExpression: {
      return { kind: "ClassExpression", node } as const;
    }
    case T.NewExpression: {
      return { kind: "NewExpression", node } as const;
    }
    case T.FunctionExpression:
    case T.ArrowFunctionExpression: {
      return { kind: "FunctionExpression", node } as const;
    }
    case T.CallExpression: {
      if (hint & ValueConstructionHint.StrictCallExpression) {
        return { kind: "CallExpression", node } as const;
      }
      return { kind: "None", node } as const;
    }
    case T.MemberExpression: {
      if (!("object" in node)) return { kind: "None", node } as const;
      return getValueConstruction(node.object, initialScope, hint);
    }
    case T.AssignmentExpression:
    case T.AssignmentPattern: {
      if (!("right" in node)) return { kind: "None", node } as const;
      return getValueConstruction(node.right, initialScope, hint);
    }
    case T.LogicalExpression: {
      const lvc = getValueConstruction(node.left, initialScope, hint);
      if (lvc.kind !== "None") return lvc;
      return getValueConstruction(node.right, initialScope, hint);
    }
    case T.ConditionalExpression: {
      const cvc = getValueConstruction(node.consequent, initialScope, hint);
      if (cvc.kind !== "None") return cvc;
      return getValueConstruction(node.alternate, initialScope, hint);
    }
    case T.Identifier: {
      if (!("name" in node && isString(node.name))) return { kind: "None", node } as const;
      const construction = F.pipe(
        O.fromNullable(initialScope.set.get(node.name)),
        O.flatMap(getVariableNode(-1)),
        O.map((node) => getValueConstruction(node, initialScope, hint)),
        O.filter((vc) => vc.kind !== "None"),
      );
      if (O.isNone(construction)) return { kind: "None", node } as const;
      return {
        ...construction.value,
      } as const;
    }
    case T.Literal: {
      if ("regex" in node) {
        return { kind: "RegExpLiteral", node } as const;
      }
      return { kind: "None", node } as const;
    }
    default: {
      if (!("expression" in node && isObject(node.expression))) {
        return { kind: "None", node } as const;
      }
      return getValueConstruction(node.expression, initialScope, hint);
    }
  }
}
