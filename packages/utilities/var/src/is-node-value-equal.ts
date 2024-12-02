import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

import { findVariable } from "./find-variable";
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
    const na = O.flatMap(va, getVariableNode(0));
    const nb = O.flatMap(vb, getVariableNode(0));
    if (O.isNone(na) || O.isNone(nb)) return false;
    if (O.exists(na, AST.isFunction) && O.exists(nb, AST.isFunction)) {
      const fa = na.value;
      const fb = nb.value;
      const pa = fa.parent;
      const pb = fb.parent;
      if (pa.type !== AST_NODE_TYPES.CallExpression || pb.type !== AST_NODE_TYPES.CallExpression) return false;
      if (!AST.isNodeEqual(pa.callee, pb.callee)) return false;
      const paramsA = fa.params;
      const paramsB = fb.params;
      const posA = paramsA.findIndex((p) => AST.isNodeEqual(p, a));
      const posB = paramsB.findIndex((p) => AST.isNodeEqual(p, b));
      if (posA === -1 || posB === -1) return false;
      return posA === posB;
    }
    return na.value === nb.value;
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
