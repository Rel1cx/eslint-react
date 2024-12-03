import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

import { findVariable } from "./find-variable";
import { getVariableDef } from "./get-variable-def";
import { getVariableNode } from "./get-variable-node";

const thisBlockTypes = [
  AST_NODE_TYPES.FunctionDeclaration,
  AST_NODE_TYPES.FunctionExpression,
  AST_NODE_TYPES.ClassBody,
  AST_NODE_TYPES.Program,
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
  initialScopes: [Scope, Scope],
): boolean {
  const [aScope, bScope] = initialScopes;
  switch (true) {
    case a.type === AST_NODE_TYPES.Literal
      && b.type === AST_NODE_TYPES.Literal: {
      return a.value === b.value;
    }
    case a.type === AST_NODE_TYPES.TemplateElement
      && b.type === AST_NODE_TYPES.TemplateElement: {
      return a.value.cooked === b.value.cooked;
    }
    case a.type === AST_NODE_TYPES.Identifier
      && b.type === AST_NODE_TYPES.Identifier: {
      const aVar = findVariable(a, aScope);
      const bVar = findVariable(b, bScope);
      const aVarNode = O.flatMap(aVar, getVariableNode(0));
      const bVarNode = O.flatMap(bVar, getVariableNode(0));
      const aVarNodeParent = O.flatMapNullable(aVarNode, (n) => n.parent);
      const bVarNodeParent = O.flatMapNullable(bVarNode, (n) => n.parent);
      const aDef = O.flatMap(aVar, getVariableDef(0));
      const bDef = O.flatMap(bVar, getVariableDef(0));
      const aDefParentParent = O.flatMapNullable(aDef, (d) => d.parent?.parent);
      const bDefParentParent = O.flatMapNullable(bDef, (d) => d.parent?.parent);
      switch (true) {
        case O.exists(aVarNodeParent, AST.is(AST_NODE_TYPES.CallExpression))
          && O.exists(bVarNodeParent, AST.is(AST_NODE_TYPES.CallExpression))
          && O.exists(aVarNode, AST.isFunction)
          && O.exists(bVarNode, AST.isFunction): {
          const hasSameCallee = F.pipe(
            O.Do,
            O.bind("aCallee", () => O.map(aVarNodeParent, (n) => n.callee)),
            O.bind("bCallee", () => O.map(bVarNodeParent, (n) => n.callee)),
            O.exists(({ aCallee, bCallee }) => AST.isNodeEqual(aCallee, bCallee)),
          );
          if (!hasSameCallee) return false;
          return F.pipe(
            O.Do,
            O.bind("aParams", () => O.map(aVarNode, (n) => n.params)),
            O.bind("bParams", () => O.map(bVarNode, (n) => n.params)),
            O.let("aPos", ({ aParams }) => aParams.findIndex(AST.isNodeEqual(a))),
            O.let("bPos", ({ bParams }) => bParams.findIndex(AST.isNodeEqual(b))),
            O.filter(({ aPos, bPos }) => aPos !== -1 && bPos !== -1),
            O.exists(({ aPos, bPos }) => aPos === bPos),
          );
        }
        case O.exists(aDefParentParent, AST.is(AST_NODE_TYPES.ForOfStatement))
          && O.exists(bDefParentParent, AST.is(AST_NODE_TYPES.ForOfStatement)): {
          return F.pipe(
            O.Do,
            O.bind("aLeft", () => O.map(aDefParentParent, (d) => d.left)),
            O.bind("bLeft", () => O.map(bDefParentParent, (d) => d.left)),
            O.filter(({ aLeft, bLeft }) => aLeft.type === bLeft.type),
            O.bind("aRight", () => O.map(aDefParentParent, (d) => d.right)),
            O.bind("bRight", () => O.map(bDefParentParent, (d) => d.right)),
            O.exists(({ aRight, bRight }) => AST.isNodeEqual(aRight, bRight)),
          );
        }
        default: {
          return O.isSome(aVar) && O.isSome(bVar) && aVar.value === bVar.value;
        }
      }
    }
    case a.type === AST_NODE_TYPES.MemberExpression
      && b.type === AST_NODE_TYPES.MemberExpression: {
      return AST.isNodeEqual(a.property, b.property)
        && isNodeValueEqual(a.object, b.object, initialScopes);
    }
    case a.type === AST_NODE_TYPES.ThisExpression
      && b.type === AST_NODE_TYPES.ThisExpression: {
      if (aScope.block === bScope.block) return true;
      const fa = AST.traverseUp(a, AST.isOneOf(thisBlockTypes));
      const fb = AST.traverseUp(a, AST.isOneOf(thisBlockTypes));
      return O.isSome(fa) && O.isSome(fb) && fa.value === fb.value;
    }
    default: {
      const aStatic = getStaticValue(a, aScope);
      const bStatic = getStaticValue(b, bScope);
      return !!aStatic && !!bStatic && aStatic.value === bStatic.value;
    }
  }
}
