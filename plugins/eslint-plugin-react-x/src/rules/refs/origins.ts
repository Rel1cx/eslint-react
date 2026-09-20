import { Check, Extract, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { RefsFacts } from "./collect";
import { type NullCheckBranch, getNullCheckBranch, isFunctionExpressionLike, isRefLikeName } from "./lib";

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

/**
 * Resolve which variables hold refs and which resolve to callable functions.
 * Maps are keyed by ESLint variables, not source names, so shadowed
 * identifiers and separate components cannot contaminate each other.
 */
export function createBindingResolver(context: RuleContext, facts: RefsFacts) {
  const { additionalRefHooks } = getSettingsFromContext(context);
  const bindings = new Map<Variable, BindingEvent[]>();
  const memberBindings = new Map<Variable, Map<string, BindingEvent[]>>();
  const jsxRefs = new Set<Variable>();

  function getVariable(node: TSESTree.Identifier): Variable | null {
    return findVariable(context.sourceCode.getScope(node), node) ?? null;
  }

  function getBindingValue(node: TSESTree.Node): BindingValue {
    const value = Extract.unwrap(node);
    if (Check.isIdentifier(value)) {
      const variable = getVariable(value);
      return variable == null ? { kind: "unknown" } : { kind: "variable", variable };
    }
    if (isFunctionExpressionLike(value)) return { kind: "function", node: value };
    if (value.type === AST.CallExpression && (core.isUseRefLikeCall(value, additionalRefHooks) || core.isCreateRefCall(context, value))) {
      return { kind: "ref" };
    }
    if (value.type === AST.MemberExpression && Check.isIdentifier(value.property)) {
      if (isRefLikeName(value.property.name)) return { kind: "ref" };
    }
    return { kind: "unknown" };
  }

  function addBinding(variable: Variable, value: BindingValue, position: number) {
    const events = bindings.get(variable) ?? [];
    bindings.set(variable, events);
    events.push({ position, value });
  }

  for (const fact of facts.bindings) {
    switch (fact.kind) {
      case "function": {
        const variable = getVariable(fact.id);
        if (variable != null) addBinding(variable, { kind: "function", node: fact.node }, fact.position);
        break;
      }
      case "identifier": {
        const variable = getVariable(fact.id);
        if (variable != null) addBinding(variable, getBindingValue(fact.value), fact.position);
        break;
      }
      case "member": {
        const variable = getVariable(fact.object);
        if (variable == null) break;
        const properties = memberBindings.get(variable) ?? new Map<string, BindingEvent[]>();
        memberBindings.set(variable, properties);
        const events = properties.get(fact.property) ?? [];
        properties.set(fact.property, events);
        events.push({ position: fact.position, value: getBindingValue(fact.value) });
        break;
      }
    }
  }

  for (const node of facts.jsxRefs) {
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
    if (Check.isIdentifier(callee)) {
      const variable = getVariable(callee);
      return variable == null ? null : resolveFunction(variable, position);
    }
    if (callee.type !== AST.MemberExpression || !Check.isIdentifier(callee.property)) return null;
    const object = Extract.unwrap(callee.object);
    const property = callee.property.name;
    if (!Check.isIdentifier(object)) return null;
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
    if (Check.isIdentifier(object)) {
      const variable = getVariable(object);
      if (variable == null) return null;
      const identity = resolveRef(variable, node.range[0]);
      return identity == null ? null : { identity };
    }
    if (object.type === AST.MemberExpression && Check.isIdentifier(object.property)) {
      if (isRefLikeName(object.property.name)) return { identity: null };
    }
    return null;
  }

  function getNullBranch(test: TSESTree.Expression, identity: Variable): NullCheckBranch | null {
    return getNullCheckBranch(
      test,
      (candidate) => {
        if (candidate.type !== AST.MemberExpression) return false;
        if (!Check.isIdentifier(candidate.property, "current")) return false;
        return getRefTarget(candidate)?.identity === identity;
      },
      (candidate) => {
        if (candidate.type === AST.Literal) return candidate.value == null;
        if (candidate.type === AST.UnaryExpression && candidate.operator === "void") return true;
        if (!Check.isIdentifier(candidate, "undefined")) return false;
        const variable = getVariable(candidate);
        return variable == null || variable.defs.length === 0;
      },
    );
  }

  return {
    getNullBranch,
    getRefTarget,
    getVariable,
    resolveCallable,
    resolveRef,
  };
}

export type BindingResolver = ReturnType<typeof createBindingResolver>;

function getLatestValue<T>(events: PositionedValue<T>[] | undefined, position: number): PositionedValue<T> | null {
  let latest: PositionedValue<T> | null = null;
  for (const event of events ?? []) {
    if (event.position > position) continue;
    if (latest == null || event.position >= latest.position) latest = event;
  }
  return latest;
}
