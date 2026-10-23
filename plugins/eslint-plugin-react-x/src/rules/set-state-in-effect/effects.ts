import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, getText } from "@eslint-react/eslint";
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

  const isUseEffectCall = (node: TSESTree.Node) => core.isUseEffectLikeCall(node, additionalEffectHooks);
  const isUseStateOrThenCall = or(resolver.isUseStateCall, isThenCall);

  // setState calls grouped by the local function that directly contains them
  const setStateCallsByFn = new Map<TSESTreeFunction, TSESTree.CallExpression[]>();
  // setState calls grouped by the hook call whose callback contains them
  // (ex: `const f = useCallback(() => setState(), [])`)
  const setStateInHookCallbacks = new Map<TSESTree.CallExpression, TSESTree.CallExpression[]>();
  // setState identifiers forwarded through a memoization hook
  // (ex: `const set = useMemo(() => setState, [])`)
  const setStateInEffectArg = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  // setState identifiers passed directly as the effect setup (ex: `useEffect(setState)`)
  const setStateInEffectSetup = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  // Plain calls made directly in a setup body, pending indirect resolution
  const trackedFnCalls: TSESTree.CallExpression[] = [];
  const violations: SetStateViolation[] = [];

  for (const { enclosingFunction, enclosingFunctionKind, node, setupFunction } of facts.calls) {
    if (isUseStateOrThenCall(node)) continue;
    if (!resolver.isSetStateCall(node)) {
      // A plain call made directly in the setup body may reach a setState
      // through a local function or hook callback; track it for resolution
      if (setupFunction == null) continue;
      if (enclosingFunction !== setupFunction) continue;
      trackedFnCalls.push(node);
      continue;
    }
    // Deferred setState calls (`.then` callbacks) are treated as running after
    // the setup has returned
    if (enclosingFunctionKind === "deferred") continue;
    // The function synchronously containing the call: the enclosing function
    // itself, or the function an IIFE is immediately invoked in
    const syncEnclosingFunction = enclosingFunctionKind === "immediate"
      ? Traverse.findParent(enclosingFunction, Check.isFunction)
      : enclosingFunction;
    const isDirectlyInSetup = setupFunction != null && syncEnclosingFunction === setupFunction;
    if (isDirectlyInSetup) {
      const args0 = node.arguments.at(0);
      // setState() without arguments, which is invalid but other tools will report it
      if (args0 == null) continue;
      // Ref-derived values and ref-gated calls are legitimate (ex: storing DOM
      // measurements in state)
      if (isArgumentUsingRefValue(context, args0)) continue;
      if (isRefGatedContext(context, node)) continue;
      violations.push({
        name: getText(context, Extract.unwrap(node.callee)),
        node,
      });
      continue;
    }
    // Group the remaining setState calls by their container so that indirect
    // resolution can look them up later
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
  const isExemptSetStateCall = (setStateCall: TSESTree.CallExpression | TSESTree.Identifier, refParams?: ReadonlySet<TSESTree.Node>) => {
    const callNode = getSetStateCallExpression(setStateCall);
    if (isRefGatedContext(context, callNode, refParams)) return true;
    if (callNode.type !== AST.CallExpression) return false;
    const args0 = callNode.arguments.at(0);
    return args0 != null && isArgumentUsingRefValue(context, args0, refParams);
  };

  // The function whose parameters a helper call's arguments land in: the
  // helper itself, or the callback of the `useCallback` wrapping it
  // (ex: `const measure = useCallback((el) => ..., [])`)
  const getHelperFunction = (callee: TSESTree.Identifier): TSESTreeFunction | null => {
    const origin = resolveOrigin(context, callee);
    if (Check.isFunction(origin)) return origin;
    if (!core.isUseCallbackCall(context, origin)) return null;
    const callback = origin.arguments.at(0);
    if (callback == null || callback.type === AST.SpreadElement) return null;
    const unwrapped = Extract.unwrap(callback);
    return Check.isFunction(unwrapped) ? unwrapped : null;
  };

  // A helper invoked from the setup receives its values through parameters:
  // when the call-site argument is ref-derived, the corresponding parameter is
  // treated as ref-derived inside the helper regardless of its name
  // (ex: `updateEdges(ref.current)` where `updateEdges = (el) => ...`)
  const getRefDerivedParams = (call: TSESTree.CallExpression, callee: TSESTree.Identifier) => {
    const origin = getHelperFunction(callee);
    if (origin == null) return undefined;
    const refParams = new Set<TSESTree.Node>();
    origin.params.forEach((param, index) => {
      // Resolve the parameter identifier, including defaulted parameters
      // (ex: `(el = defaultEl) => ...`)
      const paramId = param.type === AST.Identifier
        ? param
        : param.type === AST.AssignmentPattern && param.left.type === AST.Identifier
        ? param.left
        : null;
      if (paramId == null) return;
      const arg = call.arguments.at(index);
      // A spread argument does not map to a single parameter position
      if (arg == null || arg.type === AST.SpreadElement) return;
      if (isArgumentUsingRefValue(context, arg)) refParams.add(paramId);
    });
    return refParams.size > 0 ? refParams : undefined;
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
  // Resolve the plain calls made directly in setup bodies to the setState
  // calls they reach through local functions and hook callbacks
  for (const trackedCall of trackedFnCalls) {
    const unwrappedCallee = Extract.unwrap(trackedCall.callee);
    if (!Check.isIdentifier(unwrappedCallee)) {
      continue;
    }
    // A helper call behind a ref-derived guard is gated the same way a
    // setState call written in its place would be
    // (ex: `if (!anchorRef.current) return; commitPosition(0, true);`)
    if (isRefGatedContext(context, trackedCall)) continue;
    const refParams = getRefDerivedParams(trackedCall, unwrappedCallee);
    for (const setStateCall of getSetStateCalls(unwrappedCallee)) {
      if (isExemptSetStateCall(setStateCall, refParams)) continue;
      violations.push({
        name: getCallName(setStateCall, getText(context)),
        node: setStateCall,
      });
    }
  }
  // Resolve the identifiers passed as the setup argument of an effect
  // (ex: `useEffect(setup, [])`)
  for (const id of facts.setupIdentifiers) {
    for (const setStateCall of getSetStateCalls(id)) {
      if (isExemptSetStateCall(setStateCall)) continue;
      violations.push({
        name: getCallName(setStateCall, getText(context)),
        node: setStateCall,
      });
    }
  }

  return violations;
}
