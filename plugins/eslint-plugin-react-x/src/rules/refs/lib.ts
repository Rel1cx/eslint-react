import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import { P, isMatching } from "ts-pattern";

/**
 * Check if the node is the operand of a `ref.current === null` test inside an IfStatement.
 * @param node The MemberExpression node for ref.current
 * @returns true if the node is part of a null check test in an if statement
 */
export function isInNullCheckTest(node: TSESTree.MemberExpression): boolean {
  let parent: TSESTree.Node = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;
  if (!isMatching({ type: AST.BinaryExpression, operator: P.union("===", "==", "!==", "!=") }, parent)) return false;
  const isLeftSide = parent.left === node || Extract.unwrap(parent.left) === node;
  const otherSide = isLeftSide ? parent.right : parent.left;
  if (otherSide.type !== AST.Literal || otherSide.value != null) return false;
  return parent.parent.type === AST.IfStatement && parent.parent.test === parent;
}

/**
 * Check if a test expression is a null check on `ref.current` for a given ref name.
 * Matches forms like `ref.current === null`, `null === ref.current`, and their != variants.
 * @param test The test expression to check.
 * @param refName The name of the ref variable.
 */
export function isRefCurrentNullCheck(test: TSESTree.Expression, refName: string): boolean {
  if (test.type !== AST.BinaryExpression) return false;
  const op = test.operator;
  if (op !== "===" && op !== "==" && op !== "!==" && op !== "!=") return false;
  const { left, right } = test;
  const checkSides = (a: TSESTree.Node, b: TSESTree.Node) => {
    a = Check.isTypeExpression(a) ? Extract.unwrap(a) : a;
    return a.type === AST.MemberExpression
      && a.object.type === AST.Identifier
      && a.object.name === refName
      && b.type === AST.Literal
      && b.value == null
      && Extract.getPropertyName(a.property) === "current";
  };
  return checkSides(left, right) || checkSides(right, left);
}

export function isInitializedFromRef(context: RuleContext, name: string, initialScope: Scope) {
  for (const { node } of findVariable(initialScope, name)?.defs ?? []) {
    if (node.type !== AST.VariableDeclarator) continue;
    const init = node.init;
    if (init == null) continue;
    switch (true) {
      // const identifier = anotherRef.current;
      case init.type === AST.MemberExpression
        && init.object.type === AST.Identifier
        && (init.object.name === "ref" || init.object.name.endsWith("Ref")):
        return true;
      // const identifier = useRef();
      case init.type === AST.CallExpression
        && core.isUseRefCall(context, init):
        return true;
    }
  }
  return false;
}
