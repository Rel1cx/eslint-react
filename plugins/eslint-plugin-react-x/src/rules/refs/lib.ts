import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

const SYNC_ARRAY_CALLBACKS = new Set([
  "every",
  "filter",
  "find",
  "findIndex",
  "findLast",
  "findLastIndex",
  "flatMap",
  "forEach",
  "map",
  "reduce",
  "reduceRight",
  "some",
  "sort",
]);

export type RefAccess = {
  isInitializationWrite: boolean;
  isWrite: boolean;
  node: TSESTree.MemberExpression;
};

export type NullCheckBranch = "alternate" | "consequent";

export type GetNullBranch = (test: TSESTree.Expression) => NullCheckBranch | null;

export function isFunctionExpressionLike(node: TSESTree.Node): node is TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression {
  return node.type === AST.FunctionExpression || node.type === AST.ArrowFunctionExpression;
}

export function isRefLikeName(name: string): boolean {
  return name === "ref" || name.endsWith("Ref");
}

// Call reachability

export function getSynchronousCallbackIndexes(node: TSESTree.CallExpression): number[] {
  const callee = Extract.unwrap(node.callee);
  const name = Extract.getCalleeName(node);
  if (name == null) return [];
  if (callee.type === AST.MemberExpression && SYNC_ARRAY_CALLBACKS.has(name)) return [0];
  switch (name) {
    case "useMemo":
    case "useState":
      return [0];
    case "useReducer":
      return [0, 2];
    default:
      return [];
  }
}

export function isReachedThroughFunctions(node: TSESTree.Node, boundary: TSESTreeFunction, reached: ReadonlySet<TSESTreeFunction>): boolean {
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null && current !== boundary) {
    if (Check.isFunction(current) && !reached.has(current)) return false;
    current = current.parent;
  }
  return current === boundary;
}

// Ref access classification

export function getRefAccess(node: TSESTree.MemberExpression): RefAccess {
  let parent: TSESTree.Node = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;
  const isDirectWrite = parent.type === AST.AssignmentExpression
    ? parent.left === node || Extract.unwrap(parent.left) === node
    : parent.type === AST.UpdateExpression
    ? parent.argument === node || Extract.unwrap(parent.argument) === node
    : parent.type === AST.UnaryExpression && parent.operator === "delete"
    ? parent.argument === node || Extract.unwrap(parent.argument) === node
    : false;
  return {
    isInitializationWrite: parent.type === AST.AssignmentExpression
      && parent.operator === "="
      && (parent.left === node || Extract.unwrap(parent.left) === node),
    isWrite: isDirectWrite || isNestedRefCurrentWrite(node) || isPatternWriteTarget(node),
    node,
  };
}

/**
 * Check whether `node` (a `ref.current` MemberExpression) is assigned through a
 * destructuring pattern or a for-in/of loop target, e.g.
 * `({ a: ref.current } = value)`, `[ref.current] = value`,
 * `({ a: ref.current.x } = value)`, or `for (ref.current of items)`. Defaults
 * and computed keys inside patterns are reads, not writes.
 */
function isPatternWriteTarget(node: TSESTree.MemberExpression): boolean {
  let child: TSESTree.Node = node;
  let current: TSESTree.Node = node.parent;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    switch (current.type) {
      case AST.MemberExpression:
        // The ref access may be the root of a deeper member target, e.g.
        // `({ a: ref.current.x } = value)`. Only the object position extends
        // the write target; a computed property (`b[ref.current]`) is a read.
        if (current.object !== child && Extract.unwrap(current.object) !== child) return false;
        break;
      case AST.Property:
        // Only the value position is a write target; computed keys are reads.
        if (current.value !== child) return false;
        break;
      case AST.ObjectPattern:
      case AST.ArrayPattern:
      case AST.RestElement:
        break;
      case AST.AssignmentPattern:
        // The default value is evaluated, not assigned.
        if (current.left !== child) return false;
        break;
      case AST.AssignmentExpression:
        return current.operator === "=" && current.left === child;
      case AST.ForInStatement:
      case AST.ForOfStatement:
        return current.left === child;
      default:
        return false;
    }
    child = current;
    current = current.parent;
  }
}

/**
 * Check whether `node` (a `ref.current` MemberExpression) is being written to indirectly through
 * a nested property write, e.g. `ref.current.inner = value` or `ref.current.inner++`.
 */
function isNestedRefCurrentWrite(node: TSESTree.MemberExpression): boolean {
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
    if (parent.type === AST.UnaryExpression && parent.operator === "delete") {
      return parent.argument === outer || Extract.unwrap(parent.argument) === outer;
    }
    return false;
  }
}

// Null-guard analysis

/**
 * Parse an exact nullish check and return the branch where the checked value is null/undefined.
 * Truthiness checks such as `!ref.current` are deliberately excluded: falsy ref values are not
 * necessarily uninitialized.
 */
export function getNullCheckBranch(
  test: TSESTree.Expression,
  isCheckedValue: (node: TSESTree.Node) => boolean,
  isNullishValue: (node: TSESTree.Node) => boolean,
): NullCheckBranch | null {
  const unwrapped = Extract.unwrap(test);
  if (unwrapped.type === AST.UnaryExpression && unwrapped.operator === "!") {
    const inner = Extract.unwrap(unwrapped.argument);
    if (inner.type !== AST.BinaryExpression) return null;
    const branch = getNullCheckBranch(inner, isCheckedValue, isNullishValue);
    if (branch === "consequent") return "alternate";
    if (branch === "alternate") return "consequent";
    return null;
  }
  if (unwrapped.type !== AST.BinaryExpression || !/^(===|==|!==|!=)$/.test(unwrapped.operator)) return null;
  const matches = (left: TSESTree.Node, right: TSESTree.Node) => {
    return isCheckedValue(Extract.unwrap(left)) && isNullishValue(Extract.unwrap(right));
  };
  if (!matches(unwrapped.left, unwrapped.right) && !matches(unwrapped.right, unwrapped.left)) return null;
  return unwrapped.operator === "===" || unwrapped.operator === "==" ? "consequent" : "alternate";
}

export function isGuardTestAccess(node: TSESTree.MemberExpression, getNullBranch: GetNullBranch): boolean {
  let current: TSESTree.Node = node;
  while (Check.isTypeExpression(current.parent)) current = current.parent;
  if (current.parent.type === AST.BinaryExpression) current = current.parent;
  if (current.parent.type === AST.UnaryExpression && current.parent.operator === "!") current = current.parent;
  return current.parent.type === AST.IfStatement
    && current.parent.test === current
    && getNullBranch(current.parent.test) != null;
}

export function getGuardDisposition(node: TSESTree.MemberExpression, getNullBranch: GetNullBranch): { inNullBranch: boolean } | null {
  let child: TSESTree.Node = node;
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null && !Check.isFunction(current)) {
    if (current.type === AST.IfStatement) {
      const actualBranch = current.consequent === child
        ? "consequent"
        : current.alternate === child
        ? "alternate"
        : null;
      const nullBranch = getNullBranch(current.test);
      if (actualBranch != null && nullBranch != null) return { inNullBranch: actualBranch === nullBranch };
    }
    child = current;
    current = current.parent;
  }
  return null;
}

/** Return whether every path through a statement exits the current function. */
function isUnconditionallyTerminating(statement: TSESTree.Statement): boolean {
  switch (statement.type) {
    case AST.ReturnStatement:
    case AST.ThrowStatement:
      return true;
    case AST.BlockStatement: {
      const last = statement.body.at(-1);
      return last != null && isUnconditionallyTerminating(last);
    }
    case AST.IfStatement:
      return statement.alternate != null
        && isUnconditionallyTerminating(statement.consequent)
        && isUnconditionallyTerminating(statement.alternate);
    default:
      return false;
  }
}

export function isAfterTerminatingNonNullGuard(node: TSESTree.MemberExpression, getNullBranch: GetNullBranch): boolean {
  let statement: TSESTree.Node = node;
  while (statement.parent?.type !== AST.BlockStatement) {
    if (statement.parent == null || Check.isFunction(statement.parent)) return false;
    statement = statement.parent;
  }
  const block = statement.parent;
  const index = block.body.findIndex((sibling) => sibling === statement);
  for (let i = index - 1; i >= 0; i--) {
    const sibling = block.body[i];
    if (sibling?.type !== AST.IfStatement) continue;
    const nullBranch = getNullBranch(sibling.test);
    if (nullBranch == null) continue;
    const nonNullBranch = nullBranch === "alternate" ? sibling.consequent : sibling.alternate;
    return nonNullBranch != null && isUnconditionallyTerminating(nonNullBranch);
  }
  return false;
}
