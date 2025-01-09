import * as AST from "@eslint-react/ast";
import { isReactHookCallWithNameAlias } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
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

export const RULE_NAME = "no-direct-set-state-in-use-layout-effect";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

type MessageID = CamelCase<typeof RULE_NAME>;
type CallKind = "other" | "setState" | "then" | "useLayoutEffect" | "useState";
type FunctionKind = "cleanup" | "deferred" | "immediate" | "other" | "setup";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow direct calls to the 'set' function of 'useState' in 'useLayoutEffect'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDirectSetStateInUseLayoutEffect:
        "Do not call the 'set' function '{{name}}' of 'useState' directly in 'useLayoutEffect'.",
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

    const isUseLayoutEffectLikeCall = isReactHookCallWithNameAlias(
      "useLayoutEffect",
      context,
      additionalHooks.useLayoutEffect ?? [],
    );
    const isUseStateCall = isReactHookCallWithNameAlias("useState", context, additionalHooks.useState ?? []);
    const isUseMemoCall = isReactHookCallWithNameAlias("useMemo", context, additionalHooks.useMemo ?? []);
    const isUseCallbackCall = isReactHookCallWithNameAlias("useCallback", context, additionalHooks.useCallback ?? []);
    const isSetStateCall = isSetFunctionCall(context, settings);
    const isIdFromUseStateCall = isFromUseStateCall(context, settings);

    const functionStack: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
    const setupFunctionRef = { current: O.none<AST.TSESTreeFunction>() };
    const setupFunctionIdentifiers: TSESTree.Identifier[] = [];

    const indFunctionCalls: TSESTree.CallExpression[] = [];
    const indSetStateCalls = new WeakMap<AST.TSESTreeFunction, TSESTree.CallExpression[]>();
    const indSetStateCallsInUseLayoutEffectArg0 = new WeakMap<TSESTree.CallExpression, TSESTree.Identifier[]>();
    const indSetStateCallsInUseLayoutEffectSetup = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
    const indSetStateCallsInUseMemoOrCallback = new WeakMap<
      TSESTree.VariableDeclarator["init"] & {},
      TSESTree.CallExpression[]
    >();

    const onSetupFunctionEnter = (node: AST.TSESTreeFunction) => {
      setupFunctionRef.current = O.some(node);
    };
    const onSetupFunctionExit = (node: AST.TSESTreeFunction) => {
      setupFunctionRef.current = O.filter(setupFunctionRef.current, (current) => current !== node);
    };

    function isSetupFunction(node: TSESTree.Node) {
      return node.parent?.type === T.CallExpression
        && node.parent.callee !== node
        && isUseLayoutEffectLikeCall(node.parent);
    }
    function getCallKind(node: TSESTree.CallExpression) {
      return match<TSESTree.CallExpression, CallKind>(node)
        .when(isUseStateCall, () => "useState")
        .when(isUseLayoutEffectLikeCall, () => "useLayoutEffect")
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
        functionStack.push({ kind, node });
        if (kind === "setup") {
          onSetupFunctionEnter(node);
        }
      },
      ":function:exit"(node: AST.TSESTreeFunction) {
        const { kind } = functionStack.at(-1) ?? {};
        if (kind === "setup") {
          onSetupFunctionExit(node);
        }
        functionStack.pop();
      },
      CallExpression(node) {
        const setupFunction = O.getOrNull(setupFunctionRef.current);
        const pEntry = functionStack.at(-1);
        if (pEntry?.node.async) {
          return;
        }
        match(getCallKind(node))
          .with("setState", () => {
            if (pEntry == null) {
              return;
            }
            switch (true) {
              case pEntry.node === setupFunction
                || pEntry.kind === "immediate": {
                context.report({
                  messageId: "noDirectSetStateInUseLayoutEffect",
                  node,
                  data: {
                    name: context.sourceCode.getText(node.callee),
                  },
                });
                return;
              }
              default: {
                const mbVariableDeclarator = AST.findParentNodeGuard(node, isVariableDeclaratorFromHookCall);
                if (O.isNone(mbVariableDeclarator)) {
                  const calls = indSetStateCalls.get(pEntry.node) ?? [];
                  indSetStateCalls.set(pEntry.node, [...calls, node]);
                  return;
                }
                const vd = mbVariableDeclarator.value;
                const prevs = indSetStateCallsInUseMemoOrCallback.get(vd.init) ?? [];
                indSetStateCallsInUseMemoOrCallback.set(vd.init, [...prevs, node]);
              }
            }
          })
          .with("useLayoutEffect", () => {
            if (AST.isFunction(node.arguments.at(0))) {
              return;
            }
            setupFunctionIdentifiers.push(...AST.getNestedIdentifiers(node));
          })
          .with("other", () => {
            if (pEntry?.node !== setupFunction) {
              return;
            }
            indFunctionCalls.push(node);
          })
          .otherwise(F.constVoid);
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
            // useLayoutEffect(set, []);
            if (!isUseMemoCall(parent)) {
              break;
            }
            const mbVariableDeclarator = AST.findParentNodeGuard(parent, isVariableDeclaratorFromHookCall);
            if (O.isNone(mbVariableDeclarator)) {
              break;
            }
            const variableDeclarator = mbVariableDeclarator.value;
            const calls = indSetStateCallsInUseLayoutEffectArg0.get(variableDeclarator.init) ?? [];
            indSetStateCallsInUseLayoutEffectArg0.set(variableDeclarator.init, [...calls, node]);
            break;
          }
          case T.CallExpression: {
            if (node !== node.parent.arguments.at(0)) {
              break;
            }
            // const [state, setState] = useState();
            // const set = useCallback(setState, []);
            // useLayoutEffect(set, []);
            if (isUseCallbackCall(node.parent)) {
              const mbVariableDeclarator = AST.findParentNodeGuard(node.parent, isVariableDeclaratorFromHookCall);
              if (O.isNone(mbVariableDeclarator)) {
                break;
              }
              const variableDeclarator = mbVariableDeclarator.value;
              const prevs = indSetStateCallsInUseLayoutEffectArg0.get(variableDeclarator.init) ?? [];
              indSetStateCallsInUseLayoutEffectArg0.set(variableDeclarator.init, [...prevs, node]);
            }
            // const [state, setState] = useState();
            // useLayoutEffect(setState);
            if (isUseLayoutEffectLikeCall(node.parent)) {
              const prevs = indSetStateCallsInUseLayoutEffectArg0.get(node.parent) ?? [];
              indSetStateCallsInUseLayoutEffectSetup.set(node.parent, [...prevs, node]);
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
          const node = O.flatMap(VAR.findVariable(id, initialScope), VAR.getVariableNode(0)).pipe(O.getOrNull);
          switch (node?.type) {
            case T.ArrowFunctionExpression:
            case T.FunctionDeclaration:
            case T.FunctionExpression:
              return indSetStateCalls.get(node) ?? [];
            case T.CallExpression:
              return indSetStateCallsInUseMemoOrCallback.get(node) ?? indSetStateCallsInUseLayoutEffectArg0.get(node)
                ?? [];
          }
          return [];
        };
        for (const [_, calls] of indSetStateCallsInUseLayoutEffectSetup) {
          for (const call of calls) {
            context.report({
              messageId: "noDirectSetStateInUseLayoutEffect",
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
              messageId: "noDirectSetStateInUseLayoutEffect",
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
              messageId: "noDirectSetStateInUseLayoutEffect",
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
