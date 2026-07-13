import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";

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

export type Variable = NonNullable<ReturnType<typeof findVariable>>;

type PositionedValue<T> = {
  position: number;
  value: T;
};

type BindingValue =
  | { kind: "function"; node: TSESTreeFunction }
  | { kind: "ref" }
  | { kind: "unknown" }
  | { kind: "variable"; variable: Variable };

type BindingEvent = PositionedValue<BindingValue>;

type NullCheckBranch = "alternate" | "consequent";

type GetNullBranch = (test: TSESTree.Expression) => NullCheckBranch | null;

// Binding resolution

export function createBindingResolver(context: RuleContext) {
  const bindings = new Map<Variable, BindingEvent[]>();
  const memberBindings = new Map<Variable, Map<string, BindingEvent[]>>();
  const jsxRefs = new Set<Variable>();

  function getVariable(node: TSESTree.Identifier): Variable | null {
    return findVariable(context.sourceCode.getScope(node), node) ?? null;
  }

  function getBindingValue(node: TSESTree.Node): BindingValue {
    const value = Extract.unwrap(node);
    if (value.type === AST.Identifier) {
      const variable = getVariable(value);
      return variable == null ? { kind: "unknown" } : { kind: "variable", variable };
    }
    if (isFunctionExpressionLike(value)) return { kind: "function", node: value };
    if (value.type === AST.CallExpression && (core.isUseRefCall(context, value) || core.isCreateRefCall(context, value))) {
      return { kind: "ref" };
    }
    if (value.type === AST.MemberExpression) {
      const property = Extract.getPropertyName(value.property);
      if (property != null && isRefLikeName(property)) return { kind: "ref" };
    }
    return { kind: "unknown" };
  }

  function addBinding(variable: Variable, value: BindingValue, position: number) {
    const events = bindings.get(variable) ?? [];
    bindings.set(variable, events);
    events.push({ position, value });
  }

  function addIdentifierBinding(node: TSESTree.Identifier, value: TSESTree.Node, position = node.range[0]) {
    const variable = getVariable(node);
    if (variable != null) addBinding(variable, getBindingValue(value), position);
  }

  function addFunctionBinding(node: TSESTree.Identifier, value: TSESTreeFunction, position: number) {
    const variable = getVariable(node);
    if (variable != null) addBinding(variable, { kind: "function", node: value }, position);
  }

  function addMemberBinding(object: TSESTree.Identifier, property: string, value: TSESTree.Node, position: number) {
    const variable = getVariable(object);
    if (variable == null) return;
    const properties = memberBindings.get(variable) ?? new Map<string, BindingEvent[]>();
    memberBindings.set(variable, properties);
    const events = properties.get(property) ?? [];
    properties.set(property, events);
    events.push({ position, value: getBindingValue(value) });
  }

  function addJsxRef(node: TSESTree.Identifier) {
    const variable = getVariable(node);
    if (variable != null) jsxRefs.add(variable);
  }

  function resolveRef(variable: Variable, position: number, seen = new Set<Variable>()): Variable | null {
    if (seen.has(variable)) return null;
    seen.add(variable);
    if (jsxRefs.has(variable) || isRefLikeName(variable.name)) return variable;
    const event = getLatestValue(bindings.get(variable), position);
    if (event != null) {
      switch (event.value.kind) {
        case "ref":
          return variable;
        case "variable":
          return resolveRef(event.value.variable, event.position, seen);
        case "function":
        case "unknown":
          return null;
      }
    }
    return null;
  }

  function resolveFunction(variable: Variable, position: number, seen = new Set<Variable>()): TSESTreeFunction | null {
    if (seen.has(variable)) return null;
    seen.add(variable);
    const event = getLatestValue(bindings.get(variable), position);
    if (event == null) return null;
    switch (event.value.kind) {
      case "function":
        return event.value.node;
      case "variable":
        return resolveFunction(event.value.variable, event.position, seen);
      case "ref":
      case "unknown":
        return null;
    }
  }

  function resolveCallable(node: TSESTree.Node, position: number): TSESTreeFunction | null {
    const callee = Extract.unwrap(node);
    if (isFunctionExpressionLike(callee)) return callee;
    if (callee.type === AST.Identifier) {
      const variable = getVariable(callee);
      return variable == null ? null : resolveFunction(variable, position);
    }
    if (callee.type !== AST.MemberExpression) return null;
    const object = Extract.unwrap(callee.object);
    const property = Extract.getPropertyName(callee.property);
    if (object.type !== AST.Identifier || property == null) return null;
    const variable = getVariable(object);
    if (variable == null) return null;
    const event = getLatestValue(memberBindings.get(variable)?.get(property), position);
    if (event == null) return null;
    if (event.value.kind === "function") return event.value.node;
    if (event.value.kind === "variable") return resolveFunction(event.value.variable, event.position);
    return null;
  }

  function getRefTarget(node: TSESTree.MemberExpression): { identity: Variable | null } | null {
    const object = Extract.unwrap(node.object);
    if (object.type === AST.Identifier) {
      const variable = getVariable(object);
      if (variable == null) return null;
      const identity = resolveRef(variable, node.range[0]);
      return identity == null ? null : { identity };
    }
    if (object.type === AST.MemberExpression) {
      const property = Extract.getPropertyName(object.property);
      if (property != null && isRefLikeName(property)) return { identity: null };
    }
    return null;
  }

  function getNullBranch(test: TSESTree.Expression, identity: Variable): NullCheckBranch | null {
    return getNullCheckBranch(
      test,
      (candidate) => {
        if (candidate.type !== AST.MemberExpression || Extract.getPropertyName(candidate.property) !== "current") return false;
        return getRefTarget(candidate)?.identity === identity;
      },
      (candidate) => {
        if (candidate.type === AST.Literal) return candidate.value == null;
        if (candidate.type === AST.UnaryExpression && candidate.operator === "void") return true;
        if (candidate.type !== AST.Identifier || candidate.name !== "undefined") return false;
        const variable = getVariable(candidate);
        return variable == null || variable.defs.length === 0;
      },
    );
  }

  return {
    addFunctionBinding,
    addIdentifierBinding,
    addJsxRef,
    addMemberBinding,
    getNullBranch,
    getRefTarget,
    getVariable,
    resolveCallable,
    resolveRef,
  };
}

function getLatestValue<T>(events: PositionedValue<T>[] | undefined, position: number): PositionedValue<T> | null {
  let latest: PositionedValue<T> | null = null;
  for (const event of events ?? []) {
    if (event.position > position) continue;
    if (latest == null || event.position >= latest.position) latest = event;
  }
  return latest;
}

function isFunctionExpressionLike(node: TSESTree.Node): node is TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression {
  return node.type === AST.FunctionExpression || node.type === AST.ArrowFunctionExpression;
}

function isRefLikeName(name: string): boolean {
  return name === "ref" || name.endsWith("Ref");
}

// Call reachability

export function getCalleeName(node: TSESTree.CallExpression): string | null {
  const callee = Extract.unwrap(node.callee);
  if (callee.type === AST.Identifier) return callee.name;
  if (callee.type === AST.MemberExpression) return Extract.getPropertyName(callee.property);
  return null;
}

export function getSynchronousCallbackIndexes(node: TSESTree.CallExpression): number[] {
  const callee = Extract.unwrap(node.callee);
  const name = getCalleeName(node);
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
    : false;
  return {
    isInitializationWrite: parent.type === AST.AssignmentExpression
      && parent.operator === "="
      && (parent.left === node || Extract.unwrap(parent.left) === node),
    isWrite: isDirectWrite || isNestedRefCurrentWrite(node),
    node,
  };
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
    return false;
  }
}

// Null-guard analysis

/**
 * Parse an exact nullish check and return the branch where the checked value is null/undefined.
 * Truthiness checks such as `!ref.current` are deliberately excluded: falsy ref values are not
 * necessarily uninitialized.
 */
function getNullCheckBranch(
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
