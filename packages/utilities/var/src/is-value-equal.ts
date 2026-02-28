import * as ast from "@eslint-react/ast";
import type { Scope } from "@typescript-eslint/scope-manager";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

import { unit } from "@eslint-react/eff";

import { findVariable } from "./find-variable";

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
      const resolve = (variable: typeof aVar) => {
        if (variable == null) return unit;
        const def = variable.defs.at(0);
        if (def != null) {
          switch (true) {
            case def.type === DefinitionType.FunctionName
              && def.node.type === AST.FunctionDeclaration:
              return def.node;
            case def.type === DefinitionType.ClassName
              && def.node.type === AST.ClassDeclaration:
              return def.node;
            case "init" in def.node
              && def.node.init != null
              && !("declarations" in def.node.init):
              return def.node.init;
          }
        }
        if (def?.type === DefinitionType.Parameter && ast.isFunction(def.node)) return def.node;
        return unit;
      };
      const aVarInit = resolve(aVar);
      const bVarInit = resolve(bVar);
      const aVarInitParent = aVarInit?.parent;
      const bVarInitParent = bVarInit?.parent;
      const aDef = aVar?.defs.at(0);
      const bDef = bVar?.defs.at(0);
      const aDefParentParent = aDef?.parent?.parent;
      const bDefParentParent = bDef?.parent?.parent;
      switch (true) {
        case aVarInitParent?.type === AST.CallExpression
          && bVarInitParent?.type === AST.CallExpression
          && ast.isFunction(aVarInit)
          && ast.isFunction(bVarInit): {
          if (!ast.isNodeEqual(aVarInitParent.callee, bVarInitParent.callee)) {
            return false;
          }
          const aParams = aVarInit.params;
          const bParams = bVarInit.params;
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
