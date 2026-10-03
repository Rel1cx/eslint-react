import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolveOrigin } from "@eslint-react/var";
import { getOrInsertComputed, or } from "@local/eff";
import { DefinitionType } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { findVariable } from "@typescript-eslint/utils/ast-utils";
import type { SetStateInEffectFacts } from "./collect";
import { getCallName, getSetStateCallExpression, isHookDecl, isThenCall } from "./helpers";
import { createSetStateResolver, isArgumentUsingRefValue, isRefGatedContext } from "./origins";

export type SetStateViolation = {
  name: string;
  node: TSESTree.CallExpression | TSESTree.Identifier;
};

/**
 * Infer the setState calls that run synchronously during an effect setup from
 * the collected facts: calls made directly in the setup body (or an IIFE within
 * it), and calls reached indirectly through local functions, hook callbacks, or
 * setup identifiers passed to the effect.
 * @param context The rule context
 * @param facts The collected facts
 * @returns The violations to report, in report order
 */
export function inferViolations(context: RuleContext, facts: SetStateInEffectFacts): SetStateViolation[] {
  const { additionalEffectHooks } = getSettingsFromContext(context);
  const resolver = createSetStateResolver(context);
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);

  const isUseEffectCall = (node: TSESTree.Node) => core.isUseEffectLikeCall(node, additionalEffectHooks);
  const isUseStateOrThenCall = or(resolver.isUseStateCall, isThenCall);

  const setStateCallsByFn = new Map<TSESTreeFunction, TSESTree.CallExpression[]>();
  const setStateInHookCallbacks = new Map<TSESTree.CallExpression, TSESTree.CallExpression[]>();
  const setStateInEffectArg = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const setStateInEffectSetup = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const trackedFnCalls: TSESTree.CallExpression[] = [];
  const violations: SetStateViolation[] = [];

  for (const { enclosingFunction, enclosingFunctionKind, node, setupFunction } of facts.calls) {
    if (isUseStateOrThenCall(node)) continue;
    if (!resolver.isSetStateCall(node)) {
      // A plain call made directly in the setup body may reach a setState
      // through a local function or hook callback; track it for resolution
      if (setupFunction != null && enclosingFunction === setupFunction) {
        trackedFnCalls.push(node);
      }
      continue;
    }
    if (enclosingFunctionKind === "deferred") {
      // do nothing, this is a deferred setState call
      continue;
    }
    const isDirectlyInSetup = setupFunction != null
      && (enclosingFunction === setupFunction
        || enclosingFunctionKind === "immediate"
          && Traverse.findParent(enclosingFunction, Check.isFunction) === setupFunction);
    if (isDirectlyInSetup) {
      const args0 = node.arguments.at(0);
      // setState() without arguments, which is invalid but other tools will report it
      if (args0 == null) continue;
      if (isArgumentUsingRefValue(context, args0)) continue;
      if (isRefGatedContext(context, node)) continue;
      violations.push({
        name: getText(Extract.unwrap(node.callee)),
        node,
      });
      continue;
    }
    const init = Traverse.findParent(node, isHookDecl)?.init;
    if (init == null) {
      getOrInsertComputed(setStateCallsByFn, enclosingFunction, () => []).push(node);
    } else {
      getOrInsertComputed(setStateInHookCallbacks, init, () => []).push(node);
    }
  }

  for (const { kind, node } of facts.setStateReferences) {
    if (!resolver.isSetStateId(node, 1)) continue;
    if (kind === "callback-body") {
      // const [state, setState] = useState();
      // const set = useMemo(() => setState, []);
      // useEffect(set, []);
      const parent = node.parent.parent;
      if (parent?.type !== AST.CallExpression) continue;
      if (!core.isUseMemoCall(context, parent)) continue;
      const init = Traverse.findParent(parent, isHookDecl)?.init;
      if (init != null) {
        getOrInsertComputed(setStateInEffectArg, init, () => []).push(node);
      }
      continue;
    }
    const parent = node.parent;
    if (parent.type !== AST.CallExpression) continue;
    // const [state, setState] = useState();
    // const set = useCallback(setState, []);
    // useEffect(set, []);
    if (core.isUseCallbackCall(context, parent)) {
      const init = Traverse.findParent(parent, isHookDecl)?.init;
      if (init != null) {
        getOrInsertComputed(setStateInEffectArg, init, () => []).push(node);
      }
      continue;
    }
    // const [state, setState] = useState();
    // useEffect(setState);
    if (isUseEffectCall(parent)) {
      getOrInsertComputed(setStateInEffectSetup, parent, () => []).push(node);
    }
  }

  // The ref-derived value exemption that applies to direct setup calls
  // applies to indirectly reached setState calls as well (ex: a `measure`
  // helper invoked from the setup whose setState carries DOM measurements)
  const isExemptSetStateCall = (setStateCall: TSESTree.CallExpression | TSESTree.Identifier) => {
    const callNode = getSetStateCallExpression(setStateCall);
    if (isRefGatedContext(context, callNode)) return true;
    if (callNode.type !== AST.CallExpression) return false;
    const args0 = callNode.arguments.at(0);
    return args0 != null && isArgumentUsingRefValue(context, args0);
  };

  const getSetStateCalls = (id: TSESTree.Identifier): (TSESTree.CallExpression | TSESTree.Identifier)[] => {
    // The value of a function parameter (e.g. a function received via props) is provided
    // by the caller and cannot be resolved to a function defined in this component.
    // `resolveOrigin` maps a parameter to its containing function, which would wrongly attribute
    // the component's own render-phase setState calls to the effect (https://github.com/Rel1cx/eslint-react/issues/1944).
    const variable = findVariable(context.sourceCode.getScope(id), id);
    if (variable != null && variable.defs.some((def) => def.type === DefinitionType.Parameter)) {
      return [];
    }
    const node = resolveOrigin(context, id);
    switch (node?.type) {
      case AST.ArrowFunctionExpression:
      case AST.FunctionDeclaration:
      case AST.FunctionExpression:
        return setStateCallsByFn.get(node) ?? [];
      case AST.CallExpression:
        return setStateInHookCallbacks.get(node) ?? setStateInEffectArg.get(node) ?? [];
    }
    return [];
  };

  for (const [, calls] of setStateInEffectSetup) {
    for (const call of calls) {
      if (isExemptSetStateCall(call)) continue;
      violations.push({ name: call.name, node: call });
    }
  }
  for (const { callee } of trackedFnCalls) {
    const unwrappedCallee = Extract.unwrap(callee);
    if (!Check.isIdentifier(unwrappedCallee)) {
      continue;
    }
    for (const setStateCall of getSetStateCalls(unwrappedCallee)) {
      if (isExemptSetStateCall(setStateCall)) continue;
      violations.push({
        name: getCallName(setStateCall, getText),
        node: setStateCall,
      });
    }
  }
  for (const id of facts.setupIdentifiers) {
    for (const setStateCall of getSetStateCalls(id)) {
      if (isExemptSetStateCall(setStateCall)) continue;
      violations.push({
        name: getCallName(setStateCall, getText),
        node: setStateCall,
      });
    }
  }

  return violations;
}
