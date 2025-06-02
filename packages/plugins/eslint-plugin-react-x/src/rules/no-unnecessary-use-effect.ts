import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { Scope } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { constVoid, getOrElseUpdate } from "@eslint-react/eff";
import { getSettingsFromContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { match } from "ts-pattern";
import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-use-effect";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow unnecessary use of 'useEffect'.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      // TODO: Align the error messages precisely with the 6 scenarios described in react.dev/learn/you-might-not-need-an-effect.
      noUnnecessaryUseEffect:
        "You Might Not Need an Effect. Visit https://react.dev/learn/you-might-not-need-an-effect to learn how to remove unnecessary Effects.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!/use\w*Effect/u.test(context.sourceCode.text)) return {};
  return useNoDirectSetStateInUseEffect(context, {
    onViolation(ctx, node, data) {
      ctx.report({ messageId: "noUnnecessaryUseEffect", node, data });
    },
    useEffectKind: "useEffect",
  });
}

type CallKind =
  | "useEffect"
  | "useLayoutEffect"
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
  const hooks = settings.additionalHooks;
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const isUseEffectLikeCall = ER.isReactHookCallWithNameAlias(context, useEffectKind, hooks[useEffectKind]);
  const isUseStateCall = ER.isReactHookCallWithNameAlias(context, "useState", hooks.useState);
  const isUseMemoCall = ER.isReactHookCallWithNameAlias(context, "useMemo", hooks.useMemo);
  const isUseCallbackCall = ER.isReactHookCallWithNameAlias(context, "useCallback", hooks.useCallback);

  const functionEntries: { kind: FunctionKind; node: AST.TSESTreeFunction }[] = [];
  const setupFunctionRef: { current: AST.TSESTreeFunction | null } = { current: null };
  const setupFunctionIdentifiers: TSESTree.Identifier[] = [];

  const indFunctionCalls: TSESTree.CallExpression[] = [];
  const indSetStateCalls = new WeakMap<AST.TSESTreeFunction, TSESTree.CallExpression[]>();
  const indSetStateCallsInUseEffectArg0 = new WeakMap<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const indSetStateCallsInUseEffectSetup = new Map<TSESTree.CallExpression, TSESTree.Identifier[]>();
  const indSetStateCallsInUseMemoOrCallback = new WeakMap<TSESTree.Node, TSESTree.CallExpression[]>();

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

  function getCallName(node: TSESTree.Node) {
    if (node.type === T.CallExpression) {
      return AST.toStringFormat(node.callee, getText);
    }
    return AST.toStringFormat(node, getText);
  }

  function getCallKind(node: TSESTree.CallExpression) {
    return match<TSESTree.CallExpression, CallKind>(node)
      .when(isUseStateCall, () => "useState")
      .when(isUseEffectLikeCall, () => useEffectKind)
      .when(isSetStateCall, () => "setState")
      .when(AST.isThenCall, () => "then")
      .otherwise(() => "other");
  }

  function getFunctionKind(node: AST.TSESTreeFunction) {
    return match<AST.TSESTreeFunction, FunctionKind>(node)
      .when(isFunctionOfUseEffectSetup, () => "setup")
      .when(AST.isImmediatelyInvokedFunction, () => "immediate")
      .otherwise(() => "other");
  }

  function isIdFromUseStateCall(topLevelId: TSESTree.Identifier, at?: number) {
    const variable = VAR.findVariable(topLevelId, context.sourceCode.getScope(topLevelId));
    const variableNode = VAR.getVariableInitNode(variable, 0);
    if (variableNode == null) return false;
    if (variableNode.type !== T.CallExpression) return false;
    if (!ER.isReactHookCallWithNameAlias(context, "useState", hooks.useState)(variableNode)) return false;
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
        const indexValue = VAR.toStaticValue({
          kind: "lazy",
          node: index,
          initialScope: indexScope,
        }).value;
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
        const propertyValue = VAR.toStaticValue({
          kind: "lazy",
          node: property,
          initialScope: propertyScope,
        }).value;
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
              if (vd == null) getOrElseUpdate(indSetStateCalls, pEntry.node, () => []).push(node);
              else getOrElseUpdate(indSetStateCallsInUseMemoOrCallback, vd.init, () => []).push(node);
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
          const vd = AST.findParentNode(parent, isVariableDeclaratorFromHookCall);
          if (vd != null) {
            getOrElseUpdate(indSetStateCallsInUseEffectArg0, vd.init, () => []).push(node);
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
              getOrElseUpdate(indSetStateCallsInUseEffectArg0, vd.init, () => []).push(node);
            }
            break;
          }
          // const [state, setState] = useState();
          // useEffect(setState);
          if (isUseEffectLikeCall(node.parent)) {
            getOrElseUpdate(indSetStateCallsInUseEffectSetup, node.parent, () => []).push(node);
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
            name: getCallName(setStateCall),
          });
        }
      }
      for (const id of setupFunctionIdentifiers) {
        const setStateCalls = getSetStateCalls(id.name, context.sourceCode.getScope(id));
        for (const setStateCall of setStateCalls) {
          onViolation(context, setStateCall, {
            name: getCallName(setStateCall),
          });
        }
      }
    },
  };
}

function isInitFromHookCall(init: TSESTree.Expression | null) {
  if (init?.type !== T.CallExpression) return false;
  switch (init.callee.type) {
    case T.Identifier:
      return ER.isReactHookName(init.callee.name);
    case T.MemberExpression:
      return init.callee.property.type === T.Identifier
        && ER.isReactHookName(init.callee.property.name);
    default:
      return false;
  }
}

function isVariableDeclaratorFromHookCall(node: TSESTree.Node): node is
  & TSESTree.VariableDeclarator
  & { init: TSESTree.VariableDeclarator["init"] & {} }
{
  if (node.type !== T.VariableDeclarator) return false;
  if (node.id.type !== T.Identifier) return false;
  return isInitFromHookCall(node.init);
}
