import * as ast from "@eslint-react/ast";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

import { getVariableInitializerLoose } from "./binding-initializer";
import { findVariable } from "./scope";

const thisBlockTypes = [
  AST.FunctionDeclaration,
  AST.FunctionExpression,
  AST.ClassBody,
  AST.Program,
] as const;

/**
 * Determine whether node value equals to another node value
 * @param a node to compare
 * @param b node to compare
 * @param initialScopes initial scopes of the two nodes
 * @returns `true` if node value equal
 */
export function isValueEqual(
  a: TSESTree.Node,
  b: TSESTree.Node,
  initialScopes: [
    aScope: Scope,
    bScope: Scope,
  ],
): boolean {
  a = ast.isTypeExpression(a) ? ast.getUnderlyingExpression(a) : a;
  b = ast.isTypeExpression(b) ? ast.getUnderlyingExpression(b) : b;
  const [aScope, bScope] = initialScopes;
  switch (true) {
    case a === b: {
      return true;
    }
    case a.type === AST.Literal
      && b.type === AST.Literal: {
      return a.value === b.value;
    }
    case a.type === AST.TemplateElement
      && b.type === AST.TemplateElement: {
      return a.value.cooked === b.value.cooked;
    }
    case a.type === AST.Identifier
      && b.type === AST.Identifier: {
      const aVar = findVariable(a, aScope);
      const bVar = findVariable(b, bScope);
      const aVarNode = getVariableInitializerLoose(aVar, 0);
      const bVarNode = getVariableInitializerLoose(bVar, 0);
      const aVarNodeParent = aVarNode?.parent;
      const bVarNodeParent = bVarNode?.parent;
      const aDef = aVar?.defs.at(0);
      const bDef = bVar?.defs.at(0);
      const aDefParentParent = aDef?.parent?.parent;
      const bDefParentParent = bDef?.parent?.parent;
      switch (true) {
        case aVarNodeParent?.type === AST.CallExpression
          && bVarNodeParent?.type === AST.CallExpression
          && ast.isFunction(aVarNode)
          && ast.isFunction(bVarNode): {
          if (!ast.isNodeEqual(aVarNodeParent.callee, bVarNodeParent.callee)) {
            return false;
          }
          const aParams = aVarNode.params;
          const bParams = bVarNode.params;
          const aPos = aParams.findIndex((x) => ast.isNodeEqual(x, a));
          const bPos = bParams.findIndex((x) => ast.isNodeEqual(x, b));
          return aPos !== -1 && bPos !== -1 && aPos === bPos;
        }
        case aDefParentParent?.type === AST.ForOfStatement
          && bDefParentParent?.type === AST.ForOfStatement: {
          const aLeft = aDefParentParent.left;
          const bLeft = bDefParentParent.left;
          if (aLeft.type !== bLeft.type) {
            return false;
          }
          const aRight = aDefParentParent.right;
          const bRight = bDefParentParent.right;
          return ast.isNodeEqual(aRight, bRight);
        }
        default: {
          return aVar != null && bVar != null && aVar === bVar;
        }
      }
    }
    case a.type === AST.MemberExpression
      && b.type === AST.MemberExpression: {
      return ast.isNodeEqual(a.property, b.property)
        && isValueEqual(a.object, b.object, initialScopes);
    }
    case a.type === AST.ThisExpression
      && b.type === AST.ThisExpression: {
      if (aScope.block === bScope.block) {
        return true;
      }
      const aFunction = ast.findParentNode(a, ast.isOneOf(thisBlockTypes));
      const bFunction = ast.findParentNode(b, ast.isOneOf(thisBlockTypes));
      return aFunction === bFunction;
    }
    default: {
      const aStatic = getStaticValue(a, aScope);
      const bStatic = getStaticValue(b, bScope);
      return aStatic != null && bStatic != null && aStatic.value === bStatic.value;
    }
  }
}
