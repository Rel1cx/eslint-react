import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import type { Construction } from "./construction";
import { _ } from "@eslint-react/eff";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { getVariableInitNode } from "../get-variable-init-node";
import { ConstructionDetectionHint } from "./construction-detection-hint";

/**
 * Detects the construction type of a given node.
 * @param node The node to check.
 * @param initialScope  The initial scope to check for variable declarations.
 * @param hint Optional hint to control the detection behavior.
 * @returns The construction type of the node, or `_` if not found.
 */
export function getConstructionDetectionResult(
  node: TSESTree.Node | _,
  initialScope: Scope,
  hint = ConstructionDetectionHint.None,
): Construction | _ {
  if (node == null) return _;
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
      return _;
    }
    case T.MemberExpression: {
      if (!("object" in node)) return _;
      return getConstructionDetectionResult(node.object, initialScope, hint);
    }
    case T.AssignmentExpression:
    case T.AssignmentPattern: {
      if (!("right" in node)) return _;
      return getConstructionDetectionResult(node.right, initialScope, hint);
    }
    case T.LogicalExpression: {
      const lvc = getConstructionDetectionResult(node.left, initialScope, hint);
      if (lvc == null) return _;
      return getConstructionDetectionResult(node.right, initialScope, hint);
    }
    case T.ConditionalExpression: {
      const cvc = getConstructionDetectionResult(node.consequent, initialScope, hint);
      if (cvc == null) return _;
      return getConstructionDetectionResult(node.alternate, initialScope, hint);
    }
    case T.Identifier: {
      if (!("name" in node) || typeof node.name !== "string") {
        return _;
      }
      const variable = initialScope.set.get(node.name);
      const variableNode = getVariableInitNode(variable, -1);
      return getConstructionDetectionResult(variableNode, initialScope, hint);
    }
    case T.Literal: {
      if ("regex" in node) {
        return { kind: "RegExpLiteral", node } as const;
      }
      return _;
    }
    default: {
      if (!("expression" in node) || typeof node.expression !== "object") {
        return _;
      }
      return getConstructionDetectionResult(node.expression, initialScope, hint);
    }
  }
}
