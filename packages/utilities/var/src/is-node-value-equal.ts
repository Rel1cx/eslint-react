import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { findVariable } from "./find-variable";
import { getStaticValue } from "./get-static-value";
import { getVariableNode } from "./get-variable-node";

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
      const aVarNode = O.flatMap(aVar, getVariableNode(0));
      const bVarNode = O.flatMap(bVar, getVariableNode(0));
      const aVarNodeParent = O.flatMapNullable(aVarNode, (n) => n.parent);
      const bVarNodeParent = O.flatMapNullable(bVarNode, (n) => n.parent);
      const aDef = O.flatMapNullable(aVar, (v) => v.defs.at(0));
      const bDef = O.flatMapNullable(bVar, (v) => v.defs.at(0));
      const aDefParentParent = O.flatMapNullable(aDef, (d) => d.parent?.parent);
      const bDefParentParent = O.flatMapNullable(bDef, (d) => d.parent?.parent);
      switch (true) {
        case O.exists(aVarNodeParent, AST.is(T.CallExpression))
          && O.exists(bVarNodeParent, AST.is(T.CallExpression))
          && O.exists(aVarNode, AST.isFunction)
          && O.exists(bVarNode, AST.isFunction): {
          const hasSameCallee = F.pipe(
            O.Do,
            O.bind("aCallee", () => O.map(aVarNodeParent, (n) => n.callee)),
            O.bind("bCallee", () => O.map(bVarNodeParent, (n) => n.callee)),
            O.exists(({ aCallee, bCallee }) => AST.isNodeEqual(aCallee, bCallee)),
          );
          if (!hasSameCallee) {
            return false;
          }
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
        case O.exists(aDefParentParent, AST.is(T.ForOfStatement))
          && O.exists(bDefParentParent, AST.is(T.ForOfStatement)): {
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
      return F.pipe(
        O.Do,
        O.bind("aFunction", () => AST.findParentNode(a, AST.isOneOf(thisBlockTypes))),
        O.bind("bFunction", () => AST.findParentNode(b, AST.isOneOf(thisBlockTypes))),
        O.exists(({ aFunction, bFunction }) => aFunction === bFunction),
      );
    }
    default: {
      return F.pipe(
        O.Do,
        O.bind("aStatic", () => getStaticValue(a, aScope)),
        O.bind("bStatic", () => getStaticValue(b, bScope)),
        O.exists(({ aStatic, bStatic }) => aStatic === bStatic),
      );
    }
  }
}
