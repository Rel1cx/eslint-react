import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolve } from "@eslint-react/var";
import { constVoid, getOrInsertComputed, not } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { match } from "ts-pattern";

import { createRule } from "@/utils/create-rule";
import {
  getNestedIdentifiers,
  getSetStateCallExpression,
  isHookDecl,
  isInitializedFromRef,
  isRefGatedContext,
} from "./lib";

export const RULE_NAME = "set-state-in-effect";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

type MessageID = "default";

type CallKind =
  | "useEffect"
  | "useState"
  | "setState"
  | "then"
  | "other";

type FunctionKind =
  | "setup"
  | "cleanup"
  | "deferred"
  | "immediate"
  | "other";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Validates against setting state synchronously in an effect, which can lead to re-renders that degrade performance.",
    },
    messages: {
      default:
        "Do not call the 'set' function '{{name}}' of 'useState' synchronously in an effect. This can lead to unnecessary re-renders and performance issues.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};

  const { additionalEffectHooks, additionalStateHooks } = getSettingsFromContext(context);
  const functionEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const setupFnRef: { current: TSESTreeFunction | null } = { current: null };
  const setupFnIds: TSESTree.Identifier[] = [];

  const trackedFnCalls: TSESTree.CallExpression[] = [];
  const setStateCallsByFn = new WeakMap<TSESTreeFunction, TSESTree.CallExpression[]>();
  const setStateInEffectArg = new WeakMap<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const setStateInEffectSetup = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const setStateInHookCallbacks = new WeakMap<TSESTree.Node, TSESTree.CallExpression[]>();

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);

  const onSetupFunctionEnter = (node: TSESTreeFunction) => {
    setupFnRef.current = node;
  };

  const onSetupFunctionExit = (node: TSESTreeFunction) => {
    if (setupFnRef.current === node) {
      setupFnRef.current = null;
    }
  };

  function isThenCall(node: TSESTree.CallExpression) {
    const callee = Extract.unwrap(node.callee);
    return callee.type === AST.MemberExpression
      && callee.property.type === AST.Identifier
      && callee.property.name === "then";
  }

  function isUseStateCall(node: TSESTree.Node) {
    return core.isUseStateLikeCall(node, additionalStateHooks);
  }

  function isUseEffectCall(node: TSESTree.Node) {
    return core.isUseEffectLikeCall(node, additionalEffectHooks);
  }

  function isUseEffectSetupCallback(node: TSESTree.Node) {
    return node.parent?.type === AST.CallExpression
      && node.parent.callee !== node
      && isUseEffectCall(node.parent);
  }

  function getCallName(node: TSESTree.Node) {
    if (node.type === AST.CallExpression) {
      return Extract.getFullyQualifiedName(node.callee, getText);
    }
    return Extract.getFullyQualifiedName(node, getText);
  }

  function getCallKind(node: TSESTree.CallExpression) {
    return match<TSESTree.CallExpression, CallKind>(node)
      .when(isUseStateCall, () => "useState")
      .when(isUseEffectCall, () => "useEffect")
      .when(isSetStateCall, () => "setState")
      .when(isThenCall, () => "then")
      .otherwise(() => "other");
  }

  function getFunctionKind(node: TSESTreeFunction) {
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

  function isIdFromUseStateCall(id: TSESTree.Identifier, at?: number) {
    const initNode = resolve(context, id);
    if (initNode == null) return false;
    if (initNode.type !== AST.CallExpression) return false;
    if (!isUseStateCall(initNode)) return false;
    const variableNodeParent = initNode.parent;
    if (!("id" in variableNodeParent) || variableNodeParent.id?.type !== AST.ArrayPattern) {
      return true;
    }
    return variableNodeParent
      .id
      .elements
      .findIndex((e) => e?.type === AST.Identifier && e.name === id.name) === at;
  }

  function isSetStateCall(node: TSESTree.CallExpression) {
    const callee = Extract.unwrap(node.callee);
    switch (callee.type) {
      // const data = useState();
      // data.at(1)();
      case AST.CallExpression: {
        const innerCallee = Extract.unwrap(callee.callee);
        if (innerCallee.type !== AST.MemberExpression) {
          return false;
        }
        if (!("name" in innerCallee.object)) {
          return false;
        }
        const isAt = innerCallee.property.type === AST.Identifier && innerCallee.property.name === "at";
        const [index] = callee.arguments;
        if (!isAt || index == null) {
          return false;
        }
        const indexScope = context.sourceCode.getScope(node);
        const indexValue = getStaticValue(index, indexScope)?.value;
        return indexValue === 1 && isIdFromUseStateCall(innerCallee.object);
      }
      // const [data, setData] = useState();
      // setData();
      case AST.Identifier: {
        return isIdFromUseStateCall(callee, 1);
      }
      // const data = useState();
      // data[1]();
      case AST.MemberExpression: {
        if (!("name" in callee.object)) {
          return false;
        }
        const property = callee.property;
        const propertyScope = context.sourceCode.getScope(node);
        const propertyValue = getStaticValue(property, propertyScope)?.value;
        return propertyValue === 1 && isIdFromUseStateCall(callee.object, 1);
      }
      default: {
        return false;
      }
    }
  }

  return merge(
    {
      ":function"(node: TSESTreeFunction) {
        const kind = getFunctionKind(node);
        functionEntries.push({ kind, node });
        if (kind === "setup") {
          onSetupFunctionEnter(node);
        }
      },
      ":function:exit"(node: TSESTreeFunction) {
        const { kind } = functionEntries.at(-1) ?? {};
        if (kind === "setup") {
          onSetupFunctionExit(node);
        }
        functionEntries.pop();
      },
      CallExpression(node) {
        const setupFunction = setupFnRef.current;
        const entry = functionEntries.at(-1);
        if (entry == null || entry.node.async) {
          return;
        }
        match(getCallKind(node))
          .with("setState", () => {
            switch (true) {
              case entry.kind === "deferred":
              case entry.node.async:
                // do nothing, this is a deferred setState call
                break;
              case entry.node === setupFunction:
              case entry.kind === "immediate"
                && Traverse.findParent(entry.node, Check.isFunction) === setupFunction: {
                const args0 = node.arguments.at(0);
                // setState() without arguments, which is invalid but other tools will report it
                if (args0 == null) return;
                // Check if the setState call is using a ref value, which is safe to use in an effect (ex: `setState(ref.current.scrollTop)`)
                function isArgumentUsingRefValue(context: RuleContext, node: TSESTree.CallExpressionArgument) {
                  const isUsingRefValue = (n: TSESTree.Node): boolean => {
                    switch (n.type) {
                      case AST.Identifier:
                        return isInitializedFromRef(context, n.name, context.sourceCode.getScope(n));
                      case AST.MemberExpression:
                        return isUsingRefValue(n.object);
                      case AST.CallExpression:
                        return isUsingRefValue(n.callee) || getNestedIdentifiers(n).some(isUsingRefValue);
                      case AST.BinaryExpression:
                      case AST.LogicalExpression:
                        return isUsingRefValue(n.left) || isUsingRefValue(n.right);
                      case AST.UnaryExpression:
                      case AST.UpdateExpression:
                        return isUsingRefValue(n.argument);
                      case AST.ConditionalExpression:
                        return isUsingRefValue(n.consequent) || isUsingRefValue(n.alternate);
                      case AST.SequenceExpression:
                        return n.expressions.some(isUsingRefValue);
                      case AST.AssignmentExpression:
                        return isUsingRefValue(n.right);
                      default:
                        return false;
                    }
                  };
                  // Case 1: setState(ref.current.scrollTop);
                  if (isUsingRefValue(node)) return true;
                  // Case 2: setState(() => ref.current.scrollTop);
                  return Check.isFunction(node)
                    && context.sourceCode
                      .getScope(node.body)
                      .references
                      .some((r) => isUsingRefValue(r.identifier));
                }
                if (isArgumentUsingRefValue(context, args0)) return;
                if (isRefGatedContext(context, node)) return;
                context.report({
                  data: {
                    name: context.sourceCode.getText(Extract.unwrap(node.callee)),
                  },
                  messageId: "default",
                  node,
                });
                return;
              }
              default: {
                const init = Traverse.findParent(node, isHookDecl)?.init;
                if (init == null) getOrInsertComputed(setStateCallsByFn, entry.node, () => []).push(node);
                else getOrInsertComputed(setStateInHookCallbacks, init, () => []).push(node);
              }
            }
          })
          .with("useEffect", () => {
            if (Check.isFunction(node.arguments.at(0))) return;
            setupFnIds.push(...getNestedIdentifiers(node));
          })
          .with("other", () => {
            if (entry.node !== setupFunction) return;
            trackedFnCalls.push(node);
          })
          .otherwise(constVoid);
      },
      Identifier(node) {
        if (node.parent.type === AST.CallExpression && node.parent.callee === node) {
          return;
        }
        if (!isIdFromUseStateCall(node, 1)) {
          return;
        }
        switch (node.parent.type) {
          case AST.ArrowFunctionExpression: {
            const parent = node.parent.parent;
            if (parent.type !== AST.CallExpression) {
              break;
            }
            // const [state, setState] = useState();
            // const set = useMemo(() => setState, []);
            // useEffect(set, []);
            if (!core.isUseMemoCall(context, parent)) {
              break;
            }
            const init = Traverse.findParent(parent, isHookDecl)?.init;
            if (init != null) {
              getOrInsertComputed(setStateInEffectArg, init, () => []).push(node);
            }
            break;
          }
          case AST.CallExpression: {
            if (node !== node.parent.arguments.at(0)) {
              break;
            }
            // const [state, setState] = useState();
            // const set = useCallback(setState, []);
            // useEffect(set, []);
            if (core.isUseCallbackCall(context, node.parent)) {
              const init = Traverse.findParent(node.parent, isHookDecl)?.init;
              if (init != null) {
                getOrInsertComputed(setStateInEffectArg, init, () => []).push(node);
              }
              break;
            }
            // const [state, setState] = useState();
            // useEffect(setState);
            if (isUseEffectCall(node.parent)) {
              getOrInsertComputed(setStateInEffectSetup, node.parent, () => []).push(node);
            }
          }
        }
      },
      "Program:exit"() {
        const getSetStateCalls = (
          context: RuleContext,
          id: TSESTree.Identifier,
        ): TSESTree.CallExpression[] | TSESTree.Identifier[] => {
          const node = resolve(context, id);
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
            if (isRefGatedContext(context, getSetStateCallExpression(call))) continue;
            context.report({
              data: {
                name: call.name,
              },
              messageId: "default",
              node: call,
            });
          }
        }
        for (const { callee } of trackedFnCalls) {
          const unwrappedCallee = Extract.unwrap(callee);
          if (unwrappedCallee.type !== AST.Identifier) {
            continue;
          }
          const setStateCalls = getSetStateCalls(context, unwrappedCallee);
          for (const setStateCall of setStateCalls) {
            if (isRefGatedContext(context, getSetStateCallExpression(setStateCall))) continue;
            context.report({
              data: {
                name: getCallName(setStateCall),
              },
              messageId: "default",
              node: setStateCall,
            });
          }
        }
        for (const id of setupFnIds) {
          const setStateCalls = getSetStateCalls(context, id);
          for (const setStateCall of setStateCalls) {
            if (isRefGatedContext(context, getSetStateCallExpression(setStateCall))) continue;
            context.report({
              data: {
                name: getCallName(setStateCall),
              },
              messageId: "default",
              node: setStateCall,
            });
          }
        }
      },
    },
  );
}
