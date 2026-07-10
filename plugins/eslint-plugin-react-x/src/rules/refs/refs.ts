import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import {
  type NullCheckBranch,
  type PositionedValue,
  type RefAccess,
  getCalleeName,
  getGuardDisposition,
  getLatestValue,
  getNullCheckBranch,
  getRefAccess,
  getSynchronousCallbackIndexes,
  isAfterTerminatingNonNullGuard,
  isFunctionExpressionLike,
  isGuardTestAccess,
  isReachedThroughFunctions,
  isRefLikeName,
} from "./lib";

export const RULE_NAME = "refs";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID =
  | "readDuringRender"
  | "writeDuringRender"
  | "refPassedToFunction"
  | "duplicateRefInit";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates correct usage of refs by checking that 'ref.current' is not read or written during render.",
    },
    messages: {
      duplicateRefInit:
        "Ref is initialized more than once during render. Only a single 'if (ref.current == null)' initialization is allowed; move any additional initialization into an effect or event handler.",
      readDuringRender: "Cannot access refs during render",
      refPassedToFunction: "Passing a ref to a function may read its value during render",
      writeDuringRender: "Cannot update ref during render",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

type Variable = NonNullable<ReturnType<typeof findVariable>>;

type BindingValue =
  | { kind: "function"; node: TSESTreeFunction }
  | { kind: "ref" }
  | { kind: "unknown" }
  | { kind: "variable"; variable: Variable };

type BindingEvent = PositionedValue<BindingValue>;

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const hc = core.getHookCollector(context);
  const fc = core.getFunctionComponentCollector(context);

  // Phase 1: collect binding identities and ref operations. Maps are keyed by ESLint variables,
  // not source names, so shadowed identifiers and separate components cannot contaminate each other.
  const bindings = new Map<Variable, BindingEvent[]>();
  const memberBindings = new Map<Variable, Map<string, BindingEvent[]>>();
  const jsxRefs = new Set<Variable>();
  const calls: TSESTree.CallExpression[] = [];
  const refAccesses: RefAccess[] = [];

  function getVariable(node: TSESTree.Identifier): Variable | null {
    return findVariable(context.sourceCode.getScope(node), node) ?? null;
  }

  function addBinding(variable: Variable, value: BindingValue, position: number) {
    const events = bindings.get(variable) ?? [];
    bindings.set(variable, events);
    events.push({ position, value });
  }

  function addIdentifierBinding(node: TSESTree.Identifier, value: BindingValue, position = node.range[0]) {
    const variable = getVariable(node);
    if (variable != null) addBinding(variable, value, position);
  }

  function addMemberBinding(object: TSESTree.Identifier, property: string, value: BindingValue, position: number) {
    const variable = getVariable(object);
    if (variable == null) return;
    const properties = memberBindings.get(variable) ?? new Map<string, BindingEvent[]>();
    memberBindings.set(variable, properties);
    const events = properties.get(property) ?? [];
    properties.set(property, events);
    events.push({ position, value });
  }

  function bindingValueFrom(node: TSESTree.Node): BindingValue {
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

  return merge(
    hc.visitor,
    fc.visitor,
    {
      AssignmentExpression(node: TSESTree.AssignmentExpression) {
        if (node.operator !== "=") return;
        const left = Extract.unwrap(node.left);
        if (left.type === AST.Identifier) {
          addIdentifierBinding(left, bindingValueFrom(node.right), node.range[0]);
          return;
        }
        if (left.type !== AST.MemberExpression) return;
        const object = Extract.unwrap(left.object);
        const property = Extract.getPropertyName(left.property);
        if (object.type === AST.Identifier && property != null) {
          addMemberBinding(object, property, bindingValueFrom(node.right), node.range[0]);
        }
      },
      CallExpression(node: TSESTree.CallExpression) {
        calls.push(node);
      },
      FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
        if (node.id != null) addIdentifierBinding(node.id, { kind: "function", node }, -1);
      },
      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (
          node.name.type !== AST.JSXIdentifier
          || node.name.name !== "ref"
          || node.value?.type !== AST.JSXExpressionContainer
        ) return;
        const expression = Extract.unwrap(node.value.expression);
        if (expression.type !== AST.Identifier) return;
        const variable = getVariable(expression);
        if (variable != null) jsxRefs.add(variable);
      },
      MemberExpression(node: TSESTree.MemberExpression) {
        if (Extract.getPropertyName(node.property) !== "current") return;
        refAccesses.push(getRefAccess(node));
      },
      "Program:exit"(program) {
        const boundaries = new Set<TSESTreeFunction>([
          ...fc.api.getAllComponents(program).map((component) => component.node),
          ...hc.api.getAllHooks(program).map((hook) => hook.node),
        ]);
        const isBoundary = (node: TSESTree.Node): node is TSESTreeFunction => {
          return Check.isFunction(node) && boundaries.has(node);
        };

        // Phase 2: construct render-time invocation edges, then propagate reachability to a fixed
        // point. Direct calls, IIFEs, known synchronous callbacks, function declarations, aliases,
        // and simple object-property bindings all share the same identity-based resolver.
        const reachedByBoundary = new Map<TSESTreeFunction, Set<TSESTreeFunction>>();
        for (const boundary of boundaries) reachedByBoundary.set(boundary, new Set([boundary]));
        let changed = true;
        while (changed) {
          changed = false;
          for (const call of calls) {
            const boundary = Traverse.findParent(call, isBoundary);
            if (boundary == null) continue;
            const reached = reachedByBoundary.get(boundary);
            if (reached == null) continue;
            const host = Traverse.findParent(call, Check.isFunction) ?? boundary;
            if (!reached.has(host)) continue;
            const targets = [resolveCallable(call.callee, call.range[0])];
            for (const index of getSynchronousCallbackIndexes(call)) {
              const argument = call.arguments[index];
              if (argument == null || argument.type === AST.SpreadElement) continue;
              targets.push(resolveCallable(argument, call.range[0]));
            }
            for (const target of targets) {
              if (target == null || reached.has(target) || Traverse.findParent(target, isBoundary) !== boundary) continue;
              reached.add(target);
              changed = true;
            }
          }
        }

        function isReachedDuringRender(node: TSESTree.Node, boundary: TSESTreeFunction): boolean {
          const reached = reachedByBoundary.get(boundary);
          return reached != null && isReachedThroughFunctions(node, boundary, reached);
        }

        // Phase 3/4: validate reached accesses and track the one permitted initialization per ref.
        const initializedRefs = new Map<TSESTreeFunction, Set<Variable>>();
        for (const access of refAccesses.toSorted((a, b) => a.node.range[0] - b.node.range[0])) {
          const target = getRefTarget(access.node);
          if (target == null) continue;
          const boundary = Traverse.findParent(access.node, isBoundary);
          if (boundary == null || !isReachedDuringRender(access.node, boundary)) continue;

          let isLazyInitialization = false;
          if (target.identity != null) {
            const identity = target.identity;
            const getTargetNullBranch = (test: TSESTree.Expression) => getNullBranch(test, identity);
            if (isGuardTestAccess(access.node, getTargetNullBranch)) continue;
            const guard = getGuardDisposition(access.node, getTargetNullBranch);
            if (guard != null) {
              if (guard.inNullBranch && access.isInitializationWrite) {
                isLazyInitialization = true;
              } else if (!guard.inNullBranch && !access.isWrite) {
                continue;
              }
            } else if (access.isInitializationWrite && isAfterTerminatingNonNullGuard(access.node, getTargetNullBranch)) {
              isLazyInitialization = true;
            }
          }

          if (isLazyInitialization && target.identity != null) {
            const initialized = initializedRefs.get(boundary) ?? new Set<Variable>();
            initializedRefs.set(boundary, initialized);
            if (initialized.has(target.identity)) {
              context.report({ messageId: "duplicateRefInit", node: access.node });
            } else {
              initialized.add(target.identity);
            }
            continue;
          }

          context.report({
            messageId: access.isWrite ? "writeDuringRender" : "readDuringRender",
            node: access.node,
          });
        }

        // Passing a ref to an unknown function can expose its value during render. Hook callbacks,
        // mergeRefs, and the existing render-prop compatibility case remain exempt.
        for (const call of calls) {
          const boundary = Traverse.findParent(call, isBoundary);
          if (boundary == null || !isReachedDuringRender(call, boundary)) continue;
          const callee = Extract.unwrap(call.callee);
          const calleeName = getCalleeName(call);
          const callArguments = call.arguments;
          if (core.isHookCall(call) || calleeName === "mergeRefs" || (calleeName === "render" && callee.type === AST.MemberExpression)) continue;
          for (const argument of callArguments) {
            if (argument.type === AST.SpreadElement) continue;
            const value = Extract.unwrap(argument);
            if (value.type !== AST.Identifier) continue;
            const variable = getVariable(value);
            if (variable == null || resolveRef(variable, value.range[0]) == null) continue;
            context.report({ messageId: "refPassedToFunction", node: value });
          }
        }
      },
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (node.id.type !== AST.Identifier || node.init == null) return;
        addIdentifierBinding(node.id, bindingValueFrom(node.init), node.range[0]);
      },
    },
  );
}
