import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

/**
 * Check if the node is the operand of a `ref.current === null` test inside an IfStatement.
 * @param node The MemberExpression node for ref.current
 * @returns true if the node is part of a null check test in an if statement
 */
export function isInNullCheckTest(node: TSESTree.MemberExpression): boolean {
  let parent: TSESTree.Node = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;

  const isNullCompareBinary = (n: TSESTree.Node): n is TSESTree.BinaryExpression => {
    return n.type === AST.BinaryExpression && /^(===|==|!==|!=)$/.test(n.operator);
  };

  const isLiteralNull = (n: TSESTree.Node): boolean => {
    return n.type === AST.Literal && n.value == null;
  };

  const isIfTest = (testNode: TSESTree.Node): boolean => {
    return testNode.parent?.type === AST.IfStatement && testNode.parent.test === testNode;
  };

  // Binary comparison: ref.current === null, or wrapped in !: !(ref.current === null)
  if (isNullCompareBinary(parent)) {
    const isLeftSide = parent.left === node || Extract.unwrap(parent.left) === node;
    const otherSide = isLeftSide ? parent.right : parent.left;
    if (!isLiteralNull(otherSide)) return false;

    // Direct: if (ref.current === null)
    if (isIfTest(parent)) return true;

    // Wrapped in !: if (!(ref.current === null))
    const grandparent = parent.parent;
    if (grandparent?.type === AST.UnaryExpression && grandparent.operator === "!" && isIfTest(grandparent)) {
      return true;
    }

    return false;
  }

  // Unary !: !ref.current
  if (parent.type === AST.UnaryExpression && parent.operator === "!") {
    return isIfTest(parent);
  }

  return false;
}

function isBinaryNullCheck(test: TSESTree.Expression, refName: string): boolean {
  if (test.type !== AST.BinaryExpression) return false;
  if (!/^(===|==|!==|!=)$/.test(test.operator)) return false;
  const { left, right } = test;
  const checkSides = (a: TSESTree.Node, b: TSESTree.Node) => {
    a = Check.isTypeExpression(a) ? Extract.unwrap(a) : a;
    if (a.type !== AST.MemberExpression) return false;
    if (Extract.getPropertyName(a.property) !== "current") return false;
    const obj = Extract.unwrap(a.object);
    return obj.type === AST.Identifier && obj.name === refName && b.type === AST.Literal && b.value == null;
  };
  return checkSides(left, right) || checkSides(right, left);
}

/**
 * Check if a test expression is a null check on `ref.current` for a given ref name.
 * Matches forms like `ref.current === null`, `null === ref.current`, `!ref.current`,
 * `!(ref.current === null)`, and their != variants.
 * @param test The test expression to check.
 * @param refName The name of the ref variable.
 */
export function isRefCurrentNullCheck(test: TSESTree.Expression, refName: string): boolean {
  // Direct binary check
  if (isBinaryNullCheck(test, refName)) return true;

  // !ref.current  or  !(ref.current === null)
  if (test.type === AST.UnaryExpression && test.operator === "!") {
    const arg = Extract.unwrap(test.argument);
    // !ref.current
    if (arg.type === AST.MemberExpression) {
      const obj = Extract.unwrap(arg.object);
      return obj.type === AST.Identifier
        && obj.name === refName
        && Extract.getPropertyName(arg.property) === "current";
    }
    // !(ref.current === null)
    return isBinaryNullCheck(arg as TSESTree.Expression, refName);
  }

  return false;
}

export function isInitializedFromRef(context: RuleContext, name: string, initialScope: Scope) {
  for (const { node } of findVariable(initialScope, name)?.defs ?? []) {
    if (node.type !== AST.VariableDeclarator) continue;
    const init = node.init;
    if (init == null) continue;
    switch (true) {
      // const identifier = anotherRef.current;
      case init.type === AST.MemberExpression: {
        const initObj = Extract.unwrap(init.object);
        if (
          initObj.type === AST.Identifier
          && (initObj.name === "ref" || initObj.name.endsWith("Ref"))
        ) {
          return true;
        }
        break;
      }
      // const identifier = useRef();
      case init.type === AST.CallExpression
        && core.isUseRefCall(context, init):
        return true;
    }
  }
  return false;
}
