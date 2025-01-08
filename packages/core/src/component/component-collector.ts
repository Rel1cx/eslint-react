import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { isChildrenOfCreateElement } from "../element";
import { isReactHookCall } from "../hook";
import { getId } from "../utils";
import type { ERFunctionComponent } from "./component";
import { DEFAULT_COMPONENT_HINT, ERComponentHint } from "./component-collector-hint";
import { ERFunctionComponentFlag } from "./component-flag";
import { getFunctionComponentIdentifier } from "./component-id";
import { getComponentNameFromIdentifier } from "./component-name";
import { isFunctionOfRenderMethod } from "./component-render-method";
import { hasNoneOrValidComponentName } from "./misc";

function hasValidHierarchy(node: AST.TSESTreeFunction, context: RuleContext, hint: bigint) {
  if (isChildrenOfCreateElement(node, context) || isFunctionOfRenderMethod(node)) {
    return false;
  }
  if (hint & ERComponentHint.SkipMapCallback && AST.isMapCallLoose(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipObjectMethod && AST.isFunctionOfObjectMethod(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipClassMethod && AST.isFunctionOfClassMethod(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipClassProperty && AST.isFunctionOfClassProperty(node.parent)) {
    return false;
  }
  return !O.exists(
    AST.findParentNode(
      node,
      AST.isOneOf([
        T.JSXExpressionContainer,
        T.ArrowFunctionExpression,
        T.FunctionExpression,
        T.Property,
        T.ClassBody,
      ]),
    ),
    AST.is(T.JSXExpressionContainer),
  );
}

function getComponentFlag(initPath: ERFunctionComponent["initPath"]) {
  let flag = ERFunctionComponentFlag.None;
  if (AST.hasCallInFunctionInitPath("memo")(initPath)) {
    flag |= ERFunctionComponentFlag.Memo;
  }
  if (AST.hasCallInFunctionInitPath("forwardRef")(initPath)) {
    flag |= ERFunctionComponentFlag.ForwardRef;
  }
  return flag;
}

export function useComponentCollector(
  context: RuleContext,
  hint = DEFAULT_COMPONENT_HINT,
) {
  const jsxCtx = { getScope: (node: TSESTree.Node) => context.sourceCode.getScope(node) } as const;
  const components = new Map<string, ERFunctionComponent>();
  const functionEntries: {
    key: string;
    node: AST.TSESTreeFunction;
    hookCalls: TSESTree.CallExpression[];
    isComponent: boolean;
  }[] = [];
  const getCurrentFunction = () => O.fromNullable(functionEntries.at(-1));
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const key = getId();
    functionEntries.push({ key, node, hookCalls: [], isComponent: false });
  };
  const onFunctionExit = () => {
    const entry = functionEntries.at(-1);
    if (!entry?.isComponent) {
      return functionEntries.pop();
    }
    const shouldDrop = AST.getNestedReturnStatements(entry.node.body)
      .slice()
      .reverse()
      .some(r => {
        return context.sourceCode.getScope(r).block === entry.node
          && r.argument !== null
          && !JSX.isJSXValue(r.argument, jsxCtx, hint);
      });
    if (shouldDrop) {
      components.delete(entry.key);
    }
    return functionEntries.pop();
  };

  const ctx = {
    getAllComponents(_: TSESTree.Program): typeof components {
      return components;
    },
    getCurrentFunction,
    getCurrentFunctionStack() {
      return [...functionEntries];
    },
  } as const;

  const listeners = {
    ":function[type]": onFunctionEnter,
    ":function[type]:exit": onFunctionExit,
    "ArrowFunctionExpression[type][body.type!='BlockStatement']"() {
      const mbEntry = getCurrentFunction();
      if (O.isNone(mbEntry)) {
        return;
      }
      const entry = mbEntry.value;
      const { body } = entry.node;
      const isComponent = hasNoneOrValidComponentName(entry.node, context)
        && JSX.isJSXValue(body, jsxCtx, hint)
        && hasValidHierarchy(entry.node, context, hint);
      if (!isComponent) {
        return;
      }
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentIdentifier(entry.node, context);
      const name = O.flatMapNullable(id, getComponentNameFromIdentifier);
      const key = getId();
      components.set(key, {
        _: key,
        id,
        kind: "function",
        name,
        node: entry.node,
        displayName: O.none(),
        flag: getComponentFlag(initPath),
        hint,
        hookCalls: entry.hookCalls,
        initPath,
      });
    },
    "AssignmentExpression[type][operator='='][left.type='MemberExpression'][left.property.name='displayName']"(
      node: TSESTree.AssignmentExpression & { left: TSESTree.MemberExpression },
    ) {
      const { left, right } = node;
      const mbComponentName = match(left.object)
        .with({ type: T.Identifier }, n => O.some(n.name))
        .otherwise(O.none);
      if (O.isNone(mbComponentName)) {
        return;
      }
      const componentName = mbComponentName.value;
      const component = Array
        .from(components.values())
        .findLast(({ name }) => O.exists(name, n => n === componentName));
      if (!component) {
        return;
      }
      components.set(component._, {
        ...component,
        displayName: O.some(right),
      });
    },
    "CallExpression[type]:exit"(node: TSESTree.CallExpression) {
      if (!isReactHookCall(node)) {
        return;
      }
      const mbEntry = getCurrentFunction();
      if (O.isNone(mbEntry)) {
        return;
      }
      const entry = mbEntry.value;
      functionEntries.pop();
      functionEntries.push({ ...entry, hookCalls: [...entry.hookCalls, node] });
    },
    "ReturnStatement[type]"(node: TSESTree.ReturnStatement) {
      const mbEntry = getCurrentFunction();
      if (O.isNone(mbEntry)) {
        return;
      }
      const entry = mbEntry.value;
      const isComponent = hasNoneOrValidComponentName(entry.node, context)
        && JSX.isJSXValue(node.argument, jsxCtx, hint)
        && hasValidHierarchy(entry.node, context, hint);
      if (!isComponent) {
        return;
      }
      functionEntries.pop();
      functionEntries.push({ ...entry, isComponent });
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentIdentifier(entry.node, context);
      const name = O.flatMapNullable(id, getComponentNameFromIdentifier);
      components.set(entry.key, {
        _: entry.key,
        id,
        kind: "function",
        name,
        node: entry.node,
        displayName: O.none(),
        flag: getComponentFlag(initPath),
        hint,
        hookCalls: entry.hookCalls,
        initPath,
      });
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, listeners } as const;
}
