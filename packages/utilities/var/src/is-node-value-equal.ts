import * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { findVariable } from "./find-variable";
import { getVariableNode } from "./get-variable-node";
import { toResolved } from "./static-value";

const thisBlockTypes = [
  T.FunctionDeclaration,
  T.FunctionExpression,
  T.ClassBody,
  T.Program,
] as const;

/**
 * Determines whether node value equals to another node value
 * @param a node to compare
 * @param b node to compare
 * @param initialScopes initial scopes of the two nodes
 * @returns `true` if node value equal
 */
export function isNodeValueEqual(
  a: TSESTree.Node,
  b: TSESTree.Node,
  initialScopes: [
    aScope: Scope,
    bScope: Scope,
  ],
): boolean {
  const [aScope, bScope] = initialScopes;
  switch (true) {
    case a === b: {
      return true;
    }
    case a.type === T.Literal
      && b.type === T.Literal: {
      return a.value === b.value;
    }
    case a.type === T.TemplateElement
      && b.type === T.TemplateElement: {
      return a.value.cooked === b.value.cooked;
    }
    case a.type === T.Identifier
      && b.type === T.Identifier: {
      const aVar = findVariable(a, aScope);
      const bVar = findVariable(b, bScope);
      const aVarNode = getVariableNode(aVar, 0);
      const bVarNode = getVariableNode(bVar, 0);
      const aVarNodeParent = aVarNode?.parent;
      const bVarNodeParent = bVarNode?.parent;
      const aDef = aVar?.defs.at(0);
      const bDef = bVar?.defs.at(0);
      const aDefParentParent = aDef?.parent?.parent;
      const bDefParentParent = bDef?.parent?.parent;
      switch (true) {
        case aVarNodeParent?.type === T.CallExpression
          && bVarNodeParent?.type === T.CallExpression
          && AST.isFunction(aVarNode)
          && AST.isFunction(bVarNode): {
          if (!AST.isNodeEqual(aVarNodeParent.callee, bVarNodeParent.callee)) {
            return false;
          }
          const aParams = aVarNode.params;
          const bParams = bVarNode.params;
          const aPos = aParams.findIndex((x) => AST.isNodeEqual(x, a));
          const bPos = bParams.findIndex((x) => AST.isNodeEqual(x, b));
          return aPos !== -1 && bPos !== -1 && aPos === bPos;
        }
        case aDefParentParent?.type === T.ForOfStatement
          && bDefParentParent?.type === T.ForOfStatement: {
          const aLeft = aDefParentParent.left;
          const bLeft = bDefParentParent.left;
          if (aLeft.type !== bLeft.type) {
            return false;
          }
          const aRight = aDefParentParent.right;
          const bRight = bDefParentParent.right;
          return AST.isNodeEqual(aRight, bRight);
        }
        default: {
          return aVar !== _ && bVar !== _ && aVar === bVar;
        }
      }
    }
    case a.type === T.MemberExpression
      && b.type === T.MemberExpression: {
      return AST.isNodeEqual(a.property, b.property)
        && isNodeValueEqual(a.object, b.object, initialScopes);
    }
    case a.type === T.ThisExpression
      && b.type === T.ThisExpression: {
      if (aScope.block === bScope.block) {
        return true;
      }
      const aFunction = AST.findParentNode(a, AST.isOneOf(thisBlockTypes));
      const bFunction = AST.findParentNode(b, AST.isOneOf(thisBlockTypes));
      return aFunction === bFunction;
    }
    default: {
      const aStatic = toResolved({ kind: "lazy", node: a, initialScope: aScope });
      const bStatic = toResolved({ kind: "lazy", node: b, initialScope: bScope });
      return aStatic.kind !== "none" && bStatic.kind !== "none" && aStatic.value === bStatic.value;
    }
  }
}
