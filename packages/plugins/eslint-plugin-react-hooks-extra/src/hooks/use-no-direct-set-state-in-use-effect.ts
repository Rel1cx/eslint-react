import * as AST from "@eslint-react/ast";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import { _, getOrUpdate } from "@eslint-react/eff";
import { getSettingsFromContext, type RuleContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import { match } from "ts-pattern";

import {
  isFromUseStateCall,
  isFunctionOfImmediatelyInvoked,
  isSetFunctionCall,
  isThenCall,
  isVariableDeclaratorFromHookCall,
} from "../utils";

type CallKind = "other" | "setState" | "then" | "useEffect" | "useLayoutEffect" | "useState";
type FunctionKind = "cleanup" | "deferred" | "immediate" | "other" | "setup";

export declare namespace useNoDirectSetStateInUseEffect {
  type Options<Ctx> = {
    onViolation: (context: Ctx, node: TSESTree.Node | TSESTree.Token, data: { name: string }) => void;
    useEffectKind: "useEffect" | "useLayoutEffect";
  };
  type ReturnType = ESLintUtils.RuleListener;
}

export function useNoDirectSetStateInUseEffect<Ctx extends RuleContext>(
  context: Ctx,
  options: useNoDirectSetStateInUseEffect.Options<Ctx>,
): useNoDirectSetStateInUseEffect.ReturnType {
  const { onViolation, useEffectKind } = options;
  const settings = getSettingsFromContext(context);
  const additionalHooks = settings.additionalHooks;
  const isUseEffectLikeCall = isReactHookCallWithNameAlias(context, useEffectKind, additionalHooks[useEffectKind]);
  const isUseStateCall = isReactHookCallWithNameAlias(context, "useState", additionalHooks.useState);
  const isUseMemoCall = isReactHookCallWithNameAlias(context, "useMemo", additionalHooks.useMemo);
  const isUseCallbackCall = isReactHookCallWithNameAlias(context, "useCallback", additionalHooks.useCallback);
  const isSetStateCall = isSetFunctionCall(context, settings);
  const isIdFromUseStateCall = isFromUseStateCall(context, settings);

  const functionEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
  const setupFunctionRef: { current: AST.TSESTreeFunction | null } = { current: null };
  const setupFunctionIdentifiers: TSESTree.Identifier[] = [];

  const indFunctionCalls: TSESTree.CallExpression[] = [];
  const indSetStateCalls = new Map<AST.TSESTreeFunction, TSESTree.CallExpression[]>();
  const indSetStateCallsInUseEffectArg0 = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const indSetStateCallsInUseEffectSetup = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const indSetStateCallsInUseMemoOrCallback = new Map<TSESTree.Node, TSESTree.CallExpression[]>();

  const onSetupFunctionEnter = (node: AST.TSESTreeFunction) => {
    setupFunctionRef.current = node;
  };

  const onSetupFunctionExit = (node: AST.TSESTreeFunction) => {
    if (setupFunctionRef.current === node) {
      setupFunctionRef.current = null;
    }
  };

  function isFunctionOfUseEffectSetup(node: TSESTree.Node) {
    return node.parent?.type === T.CallExpression
      && node.parent.callee !== node
      && isUseEffectLikeCall(node.parent);
  }

  function getCallKind(node: TSESTree.CallExpression) {
    return match<TSESTree.CallExpression, CallKind>(node)
      .when(isUseStateCall, () => "useState")
      .when(isUseEffectLikeCall, () => useEffectKind)
      .when(isSetStateCall, () => "setState")
      .when(isThenCall, () => "then")
      .otherwise(() => "other");
  }

  function getFunctionKind(node: AST.TSESTreeFunction) {
    return match<AST.TSESTreeFunction, FunctionKind>(node)
      .when(isFunctionOfUseEffectSetup, () => "setup")
      .when(isFunctionOfImmediatelyInvoked, () => "immediate")
      .otherwise(() => "other");
  }

  return {
    ":function"(node: AST.TSESTreeFunction) {
      const kind = getFunctionKind(node);
      functionEntries.push({ kind, node });
      if (kind === "setup") {
        onSetupFunctionEnter(node);
      }
    },
    ":function:exit"(node: AST.TSESTreeFunction) {
      const { kind } = functionEntries.at(-1) ?? {};
      if (kind === "setup") {
        onSetupFunctionExit(node);
      }
      functionEntries.pop();
    },
    CallExpression(node) {
      const setupFunction = setupFunctionRef.current;
      const pEntry = functionEntries.at(-1);
      if (pEntry == null || pEntry.node.async) {
        return;
      }
      match(getCallKind(node))
        .with("setState", () => {
          switch (true) {
            case pEntry.node === setupFunction:
            case pEntry.kind === "immediate"
              && AST.findParentNode(pEntry.node, AST.isFunction) === setupFunction: {
              onViolation(context, node, {
                name: context.sourceCode.getText(node.callee),
              });
              return;
            }
            default: {
              const vd = AST.findParentNode(node, isVariableDeclaratorFromHookCall);
              if (vd == null) getOrUpdate(indSetStateCalls, pEntry.node, () => []).push(node);
              else getOrUpdate(indSetStateCallsInUseMemoOrCallback, vd.init, () => []).push(node);
            }
          }
        })
        .with(useEffectKind, () => {
          if (AST.isFunction(node.arguments.at(0))) return;
          setupFunctionIdentifiers.push(...AST.getNestedIdentifiers(node));
        })
        .with("other", () => {
          if (pEntry.node !== setupFunction) return;
          indFunctionCalls.push(node);
        })
        .otherwise(() => _);
    },
    Identifier(node) {
      if (node.parent.type === T.CallExpression && node.parent.callee === node) {
        return;
      }
      if (!isIdFromUseStateCall(node)) {
        return;
      }
      switch (node.parent.type) {
        case T.ArrowFunctionExpression: {
          const parent = node.parent.parent;
          if (parent.type !== T.CallExpression) {
            break;
          }
          // const [state, setState] = useState();
          // const set = useMemo(() => setState, []);
          // useEffect(set, []);
          if (!isUseMemoCall(parent)) {
            break;
          }
          const vd = AST.findParentNode(parent, isVariableDeclaratorFromHookCall);
          if (vd != null) {
            getOrUpdate(indSetStateCallsInUseEffectArg0, vd.init, () => []).push(node);
          }
          break;
        }
        case T.CallExpression: {
          if (node !== node.parent.arguments.at(0)) {
            break;
          }
          // const [state, setState] = useState();
          // const set = useCallback(setState, []);
          // useEffect(set, []);
          if (isUseCallbackCall(node.parent)) {
            const vd = AST.findParentNode(node.parent, isVariableDeclaratorFromHookCall);
            if (vd != null) {
              getOrUpdate(indSetStateCallsInUseEffectArg0, vd.init, () => []).push(node);
            }
            break;
          }
          // const [state, setState] = useState();
          // useEffect(setState);
          if (isUseEffectLikeCall(node.parent)) {
            getOrUpdate(indSetStateCallsInUseEffectSetup, node.parent, () => []).push(node);
          }
        }
      }
    },
    "Program:exit"() {
      const getSetStateCalls = (
        id: string | TSESTree.Identifier,
        initialScope: Scope.Scope,
      ): TSESTree.CallExpression[] | TSESTree.Identifier[] => {
        const node = VAR.getVariableInitNode(VAR.findVariable(id, initialScope), 0);
        switch (node?.type) {
          case T.ArrowFunctionExpression:
          case T.FunctionDeclaration:
          case T.FunctionExpression:
            return indSetStateCalls.get(node) ?? [];
          case T.CallExpression:
            return indSetStateCallsInUseMemoOrCallback.get(node) ?? indSetStateCallsInUseEffectArg0.get(node) ?? [];
        }
        return [];
      };
      for (const [, calls] of indSetStateCallsInUseEffectSetup) {
        for (const call of calls) {
          onViolation(context, call, { name: call.name });
        }
      }
      for (const { callee } of indFunctionCalls) {
        if (!("name" in callee)) {
          continue;
        }
        const { name } = callee;
        const setStateCalls = getSetStateCalls(name, context.sourceCode.getScope(callee));
        for (const setStateCall of setStateCalls) {
          onViolation(context, setStateCall, {
            name: AST.toReadableNodeName(setStateCall, (n) => context.sourceCode.getText(n)),
          });
        }
      }
      for (const id of setupFunctionIdentifiers) {
        const setStateCalls = getSetStateCalls(id.name, context.sourceCode.getScope(id));
        for (const setStateCall of setStateCalls) {
          onViolation(context, setStateCall, {
            name: AST.toReadableNodeName(setStateCall, (n) => context.sourceCode.getText(n)),
          });
        }
      }
    },
  };
}
