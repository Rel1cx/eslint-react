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
  if (a.type === AST_NODE_TYPES.Literal && b.type === AST_NODE_TYPES.Literal) return a.value === b.value;
  if (a.type === AST_NODE_TYPES.TemplateElement && b.type === AST_NODE_TYPES.TemplateElement) {
    return a.value.cooked === b.value.cooked;
  }
  const [aScope, bScope] = initialScopes;
  const aStatic = getStaticValue(a, aScope);
  const bStatic = getStaticValue(b, bScope);
  if (aStatic && bStatic) return aStatic.value === bStatic.value;
  if (a.type === AST_NODE_TYPES.Identifier && b.type === AST_NODE_TYPES.Identifier) {
    const va = findVariable(a, aScope);
    const vb = findVariable(b, bScope);
    const da = O.flatMap(va, getVariableDef(0));
    const db = O.flatMap(vb, getVariableDef(0));
    const dap = O.flatMapNullable(da, (d) => d.parent);
    const dbp = O.flatMapNullable(db, (d) => d.parent);
    const dapp = O.flatMapNullable(dap, (d) => d.parent);
    const dbpp = O.flatMapNullable(dbp, (d) => d.parent);
    const na = O.flatMap(va, getVariableNode(0));
    const nb = O.flatMap(vb, getVariableNode(0));
    const nap = O.flatMapNullable(na, (n) => n.parent);
    const nbp = O.flatMapNullable(nb, (n) => n.parent);
    switch (true) {
      case O.exists(nap, AST.is(AST_NODE_TYPES.CallExpression))
        && O.exists(nbp, AST.is(AST_NODE_TYPES.CallExpression))
        && O.exists(na, AST.isFunction)
        && O.exists(nb, AST.isFunction): {
        const hasSameCallee = F.pipe(
          O.Do,
          O.bind("ca", () => O.map(nap, (n) => n.callee)),
          O.bind("cb", () => O.map(nbp, (n) => n.callee)),
          O.exists(({ ca, cb }) => AST.isNodeEqual(ca, cb)),
        );
        if (!hasSameCallee) return false;
        return F.pipe(
          O.Do,
          O.bind("paramsA", () => O.map(na, (n) => n.params)),
          O.bind("paramsB", () => O.map(nb, (n) => n.params)),
          O.let("posA", ({ paramsA }) => paramsA.findIndex((p) => AST.isNodeEqual(p, a))),
          O.let("posB", ({ paramsB }) => paramsB.findIndex((p) => AST.isNodeEqual(p, b))),
          O.filter(({ posA, posB }) => posA !== -1 && posB !== -1),
          O.exists(({ posA, posB }) => posA === posB),
        );
      }
      case O.exists(dapp, AST.is(AST_NODE_TYPES.ForOfStatement))
        && O.exists(dbpp, AST.is(AST_NODE_TYPES.ForOfStatement)): {
        return F.pipe(
          O.Do,
          O.bind("rightA", () => O.map(dapp, (d) => d.right)),
          O.bind("rightB", () => O.map(dbpp, (d) => d.right)),
          O.exists(({ rightA, rightB }) => AST.isNodeEqual(rightA, rightB)),
        );
      }
      default: {
        if (O.isNone(na) || O.isNone(nb)) return false;
        return na.value === nb.value;
      }
    }
  }
  if (a.type === AST_NODE_TYPES.MemberExpression && b.type === AST_NODE_TYPES.MemberExpression) {
    return AST.isNodeEqual(a.property, b.property) && isNodeValueEqual(a.object, b.object, initialScopes);
  }
  if (a.type === AST_NODE_TYPES.ThisExpression && b.type === AST_NODE_TYPES.ThisExpression) {
    if (aScope.block === bScope.block) return true;
    const fa = AST.traverseUp(a, AST.isOneOf(thisBlockTypes));
    const fb = AST.traverseUp(a, AST.isOneOf(thisBlockTypes));
    if (O.isSome(fa) && O.isSome(fb)) return fa.value === fb.value;
    return false;
  }
  return false;
}
