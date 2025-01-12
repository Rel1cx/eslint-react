import * as AST from "@eslint-react/ast";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import {
  createRule,
  isFromUseStateCall,
  isSetFunctionCall,
  isThenCall,
  isVariableDeclaratorFromHookCall,
} from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-effect";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

type MessageID = CamelCase<typeof RULE_NAME>;
type CallKind = "other" | "setState" | "then" | "useEffect" | "useState";
type FunctionKind = "cleanup" | "deferred" | "immediate" | "other" | "setup";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct calls to the 'set' function of 'useState' in 'useEffect'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDirectSetStateInUseEffect: "Do not call the 'set' function '{{name}}' of 'useState' directly in 'useEffect'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!/use\w*Effect/u.test(context.sourceCode.text)) {
      return {};
    }
    const settings = getSettingsFromContext(context);
    const additionalHooks = settings.additionalHooks ?? {};

    const isUseEffectLikeCall = isReactHookCallWithNameAlias("useEffect", context, additionalHooks.useEffect ?? []);
    const isUseStateCall = isReactHookCallWithNameAlias("useState", context, additionalHooks.useState ?? []);
    const isUseMemoCall = isReactHookCallWithNameAlias("useMemo", context, additionalHooks.useMemo ?? []);
    const isUseCallbackCall = isReactHookCallWithNameAlias("useCallback", context, additionalHooks.useCallback ?? []);
    const isSetStateCall = isSetFunctionCall(context, settings);
    const isIdFromUseStateCall = isFromUseStateCall(context, settings);

    const functionEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
    const setupFunctionRef: { current: AST.TSESTreeFunction | null } = { current: null };
    const setupFunctionIdentifiers: TSESTree.Identifier[] = [];

    const indFunctionCalls: TSESTree.CallExpression[] = [];
    const indSetStateCalls = new WeakMap<AST.TSESTreeFunction, TSESTree.CallExpression[]>();
    const indSetStateCallsInUseEffectArg0 = new WeakMap<TSESTree.CallExpression, TSESTree.Identifier[]>();
    const indSetStateCallsInUseEffectSetup = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
    const indSetStateCallsInUseMemoOrCallback = new WeakMap<
      TSESTree.VariableDeclarator["init"] & {},
      TSESTree.CallExpression[]
    >();

    const onSetupFunctionEnter = (node: AST.TSESTreeFunction) => {
      setupFunctionRef.current = node;
    };
    const onSetupFunctionExit = (node: AST.TSESTreeFunction) => {
      if (setupFunctionRef.current === node) {
        setupFunctionRef.current = null;
      }
    };

    function isSetupFunction(node: TSESTree.Node) {
      return node.parent?.type === T.CallExpression
        && node.parent.callee !== node
        && isUseEffectLikeCall(node.parent);
    }
    function getCallKind(node: TSESTree.CallExpression) {
      return match<TSESTree.CallExpression, CallKind>(node)
        .when(isUseStateCall, () => "useState")
        .when(isUseEffectLikeCall, () => "useEffect")
        .when(isSetStateCall, () => "setState")
        .when(isThenCall, () => "then")
        .otherwise(() => "other");
    }
    function getFunctionKind(node: AST.TSESTreeFunction) {
      return match<AST.TSESTreeFunction, FunctionKind>(node)
        .when(isSetupFunction, () => "setup")
        .when(AST.isFunctionOfImmediatelyInvoked, () => "immediate")
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
              case pEntry.node === setupFunction
                || pEntry.kind === "immediate": {
                context.report({
                  messageId: "noDirectSetStateInUseEffect",
                  node,
                  data: {
                    name: context.sourceCode.getText(node.callee),
                  },
                });
                return;
              }
              default: {
                const variableDeclarator = AST.findParentNodeGuard(node, isVariableDeclaratorFromHookCall);
                if (variableDeclarator == null) {
                  const calls = indSetStateCalls.get(pEntry.node) ?? [];
                  indSetStateCalls.set(pEntry.node, [...calls, node]);
                  return;
                }
                const init = variableDeclarator.init;
                const prevs = indSetStateCallsInUseMemoOrCallback.get(init) ?? [];
                indSetStateCallsInUseMemoOrCallback.set(init, [...prevs, node]);
              }
            }
          })
          .with("useEffect", () => {
            if (AST.isFunction(node.arguments.at(0))) {
              return;
            }
            setupFunctionIdentifiers.push(...AST.getNestedIdentifiers(node));
          })
          .with("other", () => {
            if (pEntry.node !== setupFunction) {
              return;
            }
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
            const variableDeclarator = AST.findParentNodeGuard(parent, isVariableDeclaratorFromHookCall);
            if (variableDeclarator == null) {
              break;
            }
            const calls = indSetStateCallsInUseEffectArg0.get(variableDeclarator.init) ?? [];
            indSetStateCallsInUseEffectArg0.set(variableDeclarator.init, [...calls, node]);
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
              const variableDeclarator = AST.findParentNodeGuard(node.parent, isVariableDeclaratorFromHookCall);
              if (variableDeclarator == null) {
                break;
              }
              const prevs = indSetStateCallsInUseEffectArg0.get(variableDeclarator.init) ?? [];
              indSetStateCallsInUseEffectArg0.set(variableDeclarator.init, [...prevs, node]);
            }
            // const [state, setState] = useState();
            // useEffect(setState);
            if (isUseEffectLikeCall(node.parent)) {
              const prevs = indSetStateCallsInUseEffectArg0.get(node.parent) ?? [];
              indSetStateCallsInUseEffectSetup.set(node.parent, [...prevs, node]);
            }
            break;
          }
        }
      },
      "Program:exit"() {
        const getSetStateCalls = (
          id: string | TSESTree.Identifier,
          initialScope: Scope.Scope,
        ): TSESTree.CallExpression[] | TSESTree.Identifier[] => {
          const node = VAR.getVariableNode(VAR.findVariable(id, initialScope), 0);
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
            context.report({
              messageId: "noDirectSetStateInUseEffect",
              node: call,
              data: { name: call.name },
            });
          }
        }
        for (const { callee } of indFunctionCalls) {
          if (!("name" in callee)) {
            continue;
          }
          const { name } = callee;
          const setStateCalls = getSetStateCalls(name, context.sourceCode.getScope(callee));
          for (const setStateCall of setStateCalls) {
            context.report({
              messageId: "noDirectSetStateInUseEffect",
              node: setStateCall,
              data: {
                name: AST.toReadableNodeName(setStateCall, (n) => context.sourceCode.getText(n)),
              },
            });
          }
        }
        for (const id of setupFunctionIdentifiers) {
          const setStateCalls = getSetStateCalls(id.name, context.sourceCode.getScope(id));
          for (const setStateCall of setStateCalls) {
            context.report({
              messageId: "noDirectSetStateInUseEffect",
              node: setStateCall,
              data: {
                name: AST.toReadableNodeName(setStateCall, (n) => context.sourceCode.getText(n)),
              },
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});
