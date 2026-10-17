import { Check, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleListener } from "@eslint-react/eslint";
import type { RegExpLike } from "@eslint-react/shared";
import { not } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getNestedIdentifiers, isThenCall } from "./helpers";

export type FunctionKind =
  | "setup"
  | "cleanup"
  | "deferred"
  | "immediate"
  | "other";

/**
 * A call expression observed while traversing, with the function-phase context
 * captured eagerly so inference never re-walks ancestors.
 */
export type CallFact = {
  enclosingFunction: TSESTreeFunction;
  enclosingFunctionKind: FunctionKind;
  node: TSESTree.CallExpression;
  setupFunction: TSESTreeFunction | null;
};

/**
 * An identifier in a position where a setState function may be aliased or
 * passed along: as the body of a callback (`useMemo(() => setState, [])`) or
 * as the first argument of a call (`useCallback(setState, [])`, `useEffect(setState)`).
 */
export type SetStateReferenceFact = {
  kind: "callback-body" | "call-argument";
  node: TSESTree.Identifier;
};

export type SetStateInEffectFacts = {
  calls: CallFact[];
  setStateReferences: SetStateReferenceFact[];
  setupIdentifiers: TSESTree.Identifier[];
};

/**
 * Create a collector that gathers the raw facts needed to infer synchronous
 * setState calls in effect setups: observed call expressions with their
 * function-phase context, setState references in aliasing positions, and the
 * identifiers passed as the setup argument of an effect
 * @param additionalStateHooks Additional hooks treated as `useState`-like
 * @param additionalEffectHooks Additional hooks treated as `useEffect`-like
 * @returns The collected facts and the visitor that fills them
 */
export function createFactCollector(additionalStateHooks: RegExpLike, additionalEffectHooks: RegExpLike) {
  const facts: SetStateInEffectFacts = {
    calls: [],
    setStateReferences: [],
    setupIdentifiers: [],
  };

  const functionEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const setupFnRef: { current: TSESTreeFunction | null } = { current: null };

  function isUseStateCall(node: TSESTree.Node): boolean {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function isUseEffectCall(node: TSESTree.Node): boolean {
    return core.isUseEffectLikeCall(node, additionalEffectHooks);
  }

  function isUseEffectSetupCallback(node: TSESTree.Node) {
    return node.parent?.type === AST.CallExpression
      && node.parent.callee !== node
      && isUseEffectCall(node.parent);
  }

  /**
   * Classify a function by the phase in which its body runs relative to the
   * effect setup it belongs to
   * @param node The function node to classify
   * @returns The function kind
   */
  function getFunctionKind(node: TSESTreeFunction): FunctionKind {
    const parent = Traverse.findParent(node, not(Check.isTypeExpression)) ?? node.parent;
    // An async function body runs synchronously only until its first `await`;
    // the rule treats the whole body as deferred, accepting setState calls
    // before the first `await` as a blind spot (a documented limitation)
    if (node.async) return "deferred";
    // `.then` callbacks run after the setup has returned
    if (parent.type === AST.CallExpression && isThenCall(parent)) return "deferred";
    // An immediately invoked function expression runs synchronously as part of
    // the enclosing setup
    if (node.type !== AST.FunctionDeclaration && parent.type === AST.CallExpression && parent.callee === node) {
      return "immediate";
    }
    // The callback passed to an effect hook is the setup function
    if (isUseEffectSetupCallback(node)) return "setup";
    return "other";
  }

  const visitor: RuleListener = {
    ":function"(node: TSESTreeFunction) {
      const kind = getFunctionKind(node);
      functionEntries.push({ kind, node });
      if (kind === "setup") {
        setupFnRef.current = node;
      }
    },
    ":function:exit"(node: TSESTreeFunction) {
      const { kind } = functionEntries.at(-1) ?? {};
      if (kind === "setup" && setupFnRef.current === node) {
        setupFnRef.current = null;
      }
      functionEntries.pop();
    },
    CallExpression(node: TSESTree.CallExpression) {
      const entry = functionEntries.at(-1);
      // A call outside any function (ex: module scope) has no setup context
      if (entry == null) return;
      // Calls inside async functions are not collected (see getFunctionKind)
      if (entry.node.async) return;
      // A `useState` call declares the setter; it is not a setState usage
      if (isUseStateCall(node)) return;
      if (isUseEffectCall(node)) {
        // useEffect(setupIdentifier, []): the setup is referenced rather than
        // defined inline, so collect the identifiers of the setup argument for
        // later resolution
        const setup = node.arguments.at(0);
        if (setup != null && !Check.isFunction(setup)) {
          facts.setupIdentifiers.push(...getNestedIdentifiers(setup));
        }
        return;
      }
      facts.calls.push({
        enclosingFunction: entry.node,
        enclosingFunctionKind: entry.kind,
        node,
        setupFunction: setupFnRef.current,
      });
    },
    Identifier(node: TSESTree.Identifier) {
      // A callee position is a call, not an aliasing reference
      if (node.parent.type === AST.CallExpression && node.parent.callee === node) return;
      // `useMemo(() => setState, [])`: setState referenced as the callback body
      if (node.parent.type === AST.ArrowFunctionExpression && node === node.parent.body) {
        facts.setStateReferences.push({ kind: "callback-body", node });
        return;
      }
      // `useCallback(setState, [])` / `useEffect(setState)`: setState referenced
      // as the first call argument
      if (node.parent.type === AST.CallExpression && node === node.parent.arguments.at(0)) {
        facts.setStateReferences.push({ kind: "call-argument", node });
      }
    },
  };

  return { facts, visitor } as const;
}
