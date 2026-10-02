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

  function getFunctionKind(node: TSESTreeFunction): FunctionKind {
    const parent = Traverse.findParent(node, not(Check.isTypeExpression)) ?? node.parent;
    switch (true) {
      case node.async:
      case parent.type === AST.CallExpression
        && isThenCall(parent):
        return "deferred";
      case node.type !== AST.FunctionDeclaration
        && parent.type === AST.CallExpression
        && parent.callee === node:
        return "immediate";
      case isUseEffectSetupCallback(node):
        return "setup";
      default:
        return "other";
    }
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
      if (entry == null || entry.node.async) {
        return;
      }
      if (isUseStateCall(node)) {
        return;
      }
      if (isUseEffectCall(node)) {
        // useEffect(setupIdentifier, []): the setup is referenced rather than
        // defined inline, so collect the identifiers for later resolution
        if (!Check.isFunction(node.arguments.at(0))) {
          facts.setupIdentifiers.push(...getNestedIdentifiers(node));
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
      if (node.parent.type === AST.CallExpression && node.parent.callee === node) {
        return;
      }
      switch (node.parent.type) {
        case AST.ArrowFunctionExpression: {
          facts.setStateReferences.push({ kind: "callback-body", node });
          return;
        }
        case AST.CallExpression: {
          if (node === node.parent.arguments.at(0)) {
            facts.setStateReferences.push({ kind: "call-argument", node });
          }
          return;
        }
      }
    },
  };

  return { facts, visitor } as const;
}
