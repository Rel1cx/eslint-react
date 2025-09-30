import * as AST from "@eslint-react/ast";
import { isUseCallbackCall, isUseEffectLikeCall, isUseMemoCall, isUseStateCall } from "@eslint-react/core";
import { constVoid, getOrElseUpdate, not } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { findVariable, getVariableDefinitionNode } from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule, isVariableDeclaratorFromHookCall } from "../utils";

export const RULE_NAME = "no-direct-set-state-in-use-effect";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

type MessageID = CamelCase<typeof RULE_NAME>;

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
      description: "Disallow direct calls to the `set` function of `useState` in `useEffect`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDirectSetStateInUseEffect: "Do not call the 'set' function '{{name}}' of 'useState' directly in 'useEffect'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `useEffect` like symbols are not present in the file
  if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};

  const functionEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];

  const setupFnRef: { current: AST.TSESTreeFunction | null } = { current: null };
  const setupFnIds: TSESTree.Identifier[] = [];

  const trackedFnCalls: TSESTree.CallExpression[] = [];
  const setStateCallsByFn = new WeakMap<AST.TSESTreeFunction, TSESTree.CallExpression[]>();
  const setStateInEffectArg = new WeakMap<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const setStateInEffectSetup = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const setStateInHookCallbacks = new WeakMap<TSESTree.Node, TSESTree.CallExpression[]>();

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);

  const onSetupFunctionEnter = (node: AST.TSESTreeFunction) => {
    setupFnRef.current = node;
  };

  const onSetupFunctionExit = (node: AST.TSESTreeFunction) => {
    if (setupFnRef.current === node) {
      setupFnRef.current = null;
    }
  };

  function isFunctionOfUseEffectSetup(node: TSESTree.Node) {
    return node.parent?.type === T.CallExpression
      && node.parent.callee !== node
      && isUseEffectLikeCall(node.parent);
  }

  function getCallName(node: TSESTree.Node) {
    if (node.type === T.CallExpression) {
      return AST.toStringFormat(node.callee, getText);
    }
    return AST.toStringFormat(node, getText);
  }

  function getCallKind(node: TSESTree.CallExpression) {
    return match<TSESTree.CallExpression, CallKind>(node)
      .when(isUseStateCall, () => "useState")
      .when(isUseEffectLikeCall, () => "useEffect")
      .when(isSetStateCall, () => "setState")
      .when(AST.isThenCall, () => "then")
      .otherwise(() => "other");
  }

  function getFunctionKind(node: AST.TSESTreeFunction) {
    const parent = AST.findParentNode(node, not(AST.isTypeExpression)) ?? node.parent;
    switch (true) {
      case node.async:
      case parent.type === T.CallExpression
        && AST.isThenCall(parent):
        return "deferred";
      case node.type !== T.FunctionDeclaration
        && parent.type === T.CallExpression
        && parent.callee === node:
        return "immediate";
      case isFunctionOfUseEffectSetup(node):
        return "setup";
      default:
        return "other";
    }
  }

  function isIdFromUseStateCall(topLevelId: TSESTree.Identifier, at?: number) {
    const variable = findVariable(topLevelId, context.sourceCode.getScope(topLevelId));
    const variableNode = getVariableDefinitionNode(variable, 0);
    if (variableNode == null) return false;
    if (variableNode.type !== T.CallExpression) return false;
    if (!isUseStateCall(variableNode)) return false;
    const variableNodeParent = variableNode.parent;
    if (!("id" in variableNodeParent) || variableNodeParent.id?.type !== T.ArrayPattern) {
      return true;
    }
    return variableNodeParent
      .id
      .elements
      .findIndex((e) => e?.type === T.Identifier && e.name === topLevelId.name) === at;
  }

  function isSetStateCall(node: TSESTree.CallExpression) {
    switch (node.callee.type) {
      // const data = useState();
      // data.at(1)();
      case T.CallExpression: {
        const { callee } = node.callee;
        if (callee.type !== T.MemberExpression) {
          return false;
        }
        if (!("name" in callee.object)) {
          return false;
        }
        const isAt = callee.property.type === T.Identifier && callee.property.name === "at";
        const [index] = node.callee.arguments;
        if (!isAt || index == null) {
          return false;
        }
        const indexScope = context.sourceCode.getScope(node);
        const indexValue = getStaticValue(index, indexScope)?.value;
        return indexValue === 1 && isIdFromUseStateCall(callee.object);
      }
      // const [data, setData] = useState();
      // setData();
      case T.Identifier: {
        return isIdFromUseStateCall(node.callee, 1);
      }
      // const data = useState();
      // data[1]();
      case T.MemberExpression: {
        if (!("name" in node.callee.object)) {
          return false;
        }
        const property = node.callee.property;
        const propertyScope = context.sourceCode.getScope(node);
        const propertyValue = getStaticValue(property, propertyScope)?.value;
        return propertyValue === 1 && isIdFromUseStateCall(node.callee.object, 1);
      }
      default: {
        return false;
      }
    }
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
      const setupFunction = setupFnRef.current;
      const pEntry = functionEntries.at(-1);
      if (pEntry == null || pEntry.node.async) {
        return;
      }
      match(getCallKind(node))
        .with("setState", () => {
          switch (true) {
            case pEntry.kind === "deferred":
            case pEntry.node.async:
              // do nothing, this is a deferred setState call
              break;
            case pEntry.node === setupFunction:
            case pEntry.kind === "immediate"
              && AST.findParentNode(pEntry.node, AST.isFunction) === setupFunction: {
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
              const init = AST.findParentNode(node, isVariableDeclaratorFromHookCall)?.init;
              if (init == null) getOrElseUpdate(setStateCallsByFn, pEntry.node, () => []).push(node);
              else getOrElseUpdate(setStateInHookCallbacks, init, () => []).push(node);
            }
          }
        })
        .with("useEffect", () => {
          if (AST.isFunction(node.arguments.at(0))) return;
          setupFnIds.push(...AST.getNestedIdentifiers(node));
        })
        .with("other", () => {
          if (pEntry.node !== setupFunction) return;
          trackedFnCalls.push(node);
        })
        .otherwise(constVoid);
    },
    Identifier(node) {
      if (node.parent.type === T.CallExpression && node.parent.callee === node) {
        return;
      }
      if (!isIdFromUseStateCall(node, 1)) {
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
          const init = AST.findParentNode(parent, isVariableDeclaratorFromHookCall)?.init;
          if (init != null) {
            getOrElseUpdate(setStateInEffectArg, init, () => []).push(node);
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
            const init = AST.findParentNode(node.parent, isVariableDeclaratorFromHookCall)?.init;
            if (init != null) {
              getOrElseUpdate(setStateInEffectArg, init, () => []).push(node);
            }
            break;
          }
          // const [state, setState] = useState();
          // useEffect(setState);
          if (isUseEffectLikeCall(node.parent)) {
            getOrElseUpdate(setStateInEffectSetup, node.parent, () => []).push(node);
          }
        }
      }
    },
    "Program:exit"() {
      const getSetStateCalls = (
        id: string | TSESTree.Identifier,
        initialScope: Scope.Scope,
      ): TSESTree.CallExpression[] | TSESTree.Identifier[] => {
        const node = getVariableDefinitionNode(findVariable(id, initialScope), 0);
        switch (node?.type) {
          case T.ArrowFunctionExpression:
          case T.FunctionDeclaration:
          case T.FunctionExpression:
            return setStateCallsByFn.get(node) ?? [];
          case T.CallExpression:
            return setStateInHookCallbacks.get(node) ?? setStateInEffectArg.get(node) ?? [];
        }
        return [];
      };
      for (const [, calls] of setStateInEffectSetup) {
        for (const call of calls) {
          context.report({
            messageId: "noDirectSetStateInUseEffect",
            node: call,
            data: {
              name: call.name,
            },
          });
        }
      }
      for (const { callee } of trackedFnCalls) {
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
              name: getCallName(setStateCall),
            },
          });
        }
      }
      for (const id of setupFnIds) {
        const setStateCalls = getSetStateCalls(id.name, context.sourceCode.getScope(id));
        for (const setStateCall of setStateCalls) {
          context.report({
            messageId: "noDirectSetStateInUseEffect",
            node: setStateCall,
            data: {
              name: getCallName(setStateCall),
            },
          });
        }
      }
    },
  };
}
