import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

export function isFunctionExpressionLike(node: TSESTree.Node): node is TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression {
  return node.type === AST.FunctionExpression || node.type === AST.ArrowFunctionExpression;
}

export function resolveAlias(name: string, aliases: Map<string, string>): string {
  const seen = new Set<string>();
  while (aliases.has(name) && !seen.has(name)) {
    seen.add(name);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    name = aliases.get(name)!;
  }
  return name;
}

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
    if (grandparent.type === AST.UnaryExpression && grandparent.operator === "!" && isIfTest(grandparent)) {
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

function isBinaryNullCheckOperand(a: TSESTree.Node, b: TSESTree.Node, refName: string): boolean {
  a = Check.isTypeExpression(a) ? Extract.unwrap(a) : a;
  if (a.type !== AST.MemberExpression) return false;
  if (Extract.getPropertyName(a.property) !== "current") return false;
  const obj = Extract.unwrap(a.object);
  return obj.type === AST.Identifier && obj.name === refName && b.type === AST.Literal && b.value == null;
}

function isBinaryNullCheck(test: TSESTree.Expression, refName: string): test is TSESTree.BinaryExpression {
  if (test.type !== AST.BinaryExpression) return false;
  if (!/^(===|==|!==|!=)$/.test(test.operator)) return false;
  const { left, right } = test;
  return isBinaryNullCheckOperand(left, right, refName) || isBinaryNullCheckOperand(right, left, refName);
}

/**
 * Which branch of an `if` statement is guaranteed to observe `ref.current` as `null`/`undefined`,
 * for a test expression recognized by `isRefCurrentNullCheck`.
 *
 * `"consequent"` means the true-branch is the null branch (e.g. `== null`, `=== null`,
 * `!ref.current`); `"alternate"` means the false-branch is the null branch (e.g. `!= null`,
 * `!== null`, `!(ref.current === null)`).
 */
export type NullCheckBranch = "consequent" | "alternate";

/**
 * Determine which branch of an `if` statement is guaranteed to see `ref.current` as null, given
 * a test expression. Returns `null` if the test isn't a recognized null check on `refName`.
 * @param test The test expression to check.
 * @param refName The name of the ref variable.
 */
export function getRefCurrentNullCheckBranch(test: TSESTree.Expression, refName: string): NullCheckBranch | null {
  // Direct binary check: ref.current === null / == null -> consequent is null branch
  //                       ref.current !== null / != null -> alternate is null branch
  if (isBinaryNullCheck(test, refName)) {
    return test.operator === "===" || test.operator === "==" ? "consequent" : "alternate";
  }

  // !ref.current  or  !(ref.current === null)
  if (test.type === AST.UnaryExpression && test.operator === "!") {
    const arg = Extract.unwrap(test.argument);
    // !ref.current: truthy check, so the true-branch (falsy, i.e. null-like) is the null branch
    if (arg.type === AST.MemberExpression) {
      const obj = Extract.unwrap(arg.object);
      const isRefCurrent = obj.type === AST.Identifier
        && obj.name === refName
        && Extract.getPropertyName(arg.property) === "current";
      return isRefCurrent ? "consequent" : null;
    }
    // !(ref.current === null): flip the inner binary check's direction
    if (arg.type === AST.BinaryExpression) {
      const inner = getRefCurrentNullCheckBranch(arg, refName);
      if (inner === "consequent") return "alternate";
      if (inner === "alternate") return "consequent";
    }
  }

  return null;
}

/**
 * Check if a test expression is a null check on `ref.current` for a given ref name.
 * Matches forms like `ref.current === null`, `null === ref.current`, `!ref.current`,
 * `!(ref.current === null)`, and their != variants.
 * @param test The test expression to check.
 * @param refName The name of the ref variable.
 */
export function isRefCurrentNullCheck(test: TSESTree.Expression, refName: string): boolean {
  return getRefCurrentNullCheckBranch(test, refName) != null;
}

/**
 * Check whether `node` (a `ref.current` MemberExpression) is being written to indirectly through
 * a nested property write, e.g. `ref.current.inner = value` or `ref.current.inner++`.
 * @param node The MemberExpression node for ref.current
 */
export function isNestedRefCurrentWrite(node: TSESTree.MemberExpression): boolean {
  let outer: TSESTree.Node = node;
  let sawNesting = false;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    let parent: TSESTree.Node = outer.parent;
    while (Check.isTypeExpression(parent)) parent = parent.parent;
    if (parent.type === AST.MemberExpression && (parent.object === outer || Extract.unwrap(parent.object) === outer)) {
      outer = parent;
      sawNesting = true;
      continue;
    }
    if (!sawNesting) return false;
    if (parent.type === AST.AssignmentExpression) {
      return parent.left === outer || Extract.unwrap(parent.left) === outer;
    }
    if (parent.type === AST.UpdateExpression) {
      return parent.argument === outer || Extract.unwrap(parent.argument) === outer;
    }
    return false;
  }
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
        if (initObj.type === AST.Identifier && (initObj.name === "ref" || initObj.name.endsWith("Ref"))) {
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
