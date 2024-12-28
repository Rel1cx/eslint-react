import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import ShortUniqueId from "short-unique-id";
import { match } from "ts-pattern";

import { isChildrenOfCreateElement } from "../element";
import { isReactHookCall } from "../hook";
import type { ERFunctionComponent } from "./component";
import { DEFAULT_COMPONENT_HINT, ERComponentHint } from "./component-collector-hint";
import { ERFunctionComponentFlag } from "./component-flag";
import { getFunctionComponentIdentifier } from "./component-id";
import { getComponentNameFromIdentifier } from "./component-name";
import { isFunctionOfRenderMethod } from "./component-render-method";
import { hasNoneOrValidComponentName } from "./misc";

const uid = new ShortUniqueId({ length: 10 });

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
    AST.traverseUp(
      node,
      AST.isOneOf([
        AST_NODE_TYPES.JSXExpressionContainer,
        AST_NODE_TYPES.ArrowFunctionExpression,
        AST_NODE_TYPES.FunctionExpression,
        AST_NODE_TYPES.Property,
        AST_NODE_TYPES.ClassBody,
      ]),
    ),
    AST.is(AST_NODE_TYPES.JSXExpressionContainer),
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
  hint: bigint = DEFAULT_COMPONENT_HINT,
) {
  const jsxCtx = { getScope: (node: TSESTree.Node) => context.sourceCode.getScope(node) } as const;
  const components = new Map<string, ERFunctionComponent>();
  const functionStack: [
    key: string,
    node: AST.TSESTreeFunction,
    isComponent: boolean,
    hookCalls: TSESTree.CallExpression[],
  ][] = [];
  const getCurrentFunction = () => O.fromNullable(functionStack.at(-1));
  const onFunctionEnter = (node: AST.TSESTreeFunction) => functionStack.push([uid.rnd(), node, false, []]);
  const onFunctionExit = () => {
    const [key, fn, isComponent] = functionStack.at(-1) ?? [];
    if (!key || !fn || !isComponent) return functionStack.pop();
    const shouldDrop = AST.getNestedReturnStatements(fn.body)
      .slice()
      .reverse()
      .some(r => {
        return context.sourceCode.getScope(r).block === fn
          && r.argument !== null
          && !JSX.isJSXValue(r.argument, jsxCtx, hint);
      });
    if (shouldDrop) components.delete(key);
    return functionStack.pop();
  };

  const ctx = {
    getAllComponents(_: TSESTree.Program): typeof components {
      return components;
    },
    getCurrentComponents() {
      return new Map(components);
    },
    getCurrentFunction,
    getCurrentFunctionStack() {
      return [...functionStack];
    },
  } as const;

  const listeners = {
    ":function[type]": onFunctionEnter,
    ":function[type]:exit": onFunctionExit,
    "ArrowFunctionExpression[type][body.type!='BlockStatement']"() {
      const maybeCurrentFn = getCurrentFunction();
      if (O.isNone(maybeCurrentFn)) return;
      const [_key, currentFn, _isComponent, hookCalls] = maybeCurrentFn.value;
      const { body } = currentFn;
      const isComponent = hasNoneOrValidComponentName(currentFn, context)
        && JSX.isJSXValue(body, jsxCtx, hint)
        && hasValidHierarchy(currentFn, context, hint);
      if (!isComponent) return;
      const initPath = AST.getFunctionInitPath(currentFn);
      const id = getFunctionComponentIdentifier(currentFn, context);
      const name = O.flatMapNullable(id, getComponentNameFromIdentifier);
      const key = uid.rnd();
      components.set(key, {
        _: key,
        id,
        kind: "function",
        name,
        node: currentFn,
        displayName: O.none(),
        flag: getComponentFlag(initPath),
        hint,
        hookCalls,
        initPath,
      });
    },
    "AssignmentExpression[type][operator='='][left.type='MemberExpression'][left.property.name='displayName']"(
      node: TSESTree.Node,
    ) {
      if (node.type !== AST_NODE_TYPES.AssignmentExpression) return;
      const { left, right } = node;
      if (left.type !== AST_NODE_TYPES.MemberExpression) return;
      const maybeComponentName = match(left.object)
        .with({ type: AST_NODE_TYPES.Identifier }, n => O.some(n.name))
        .otherwise(O.none);
      if (O.isNone(maybeComponentName)) return;
      const component = Array
        .from(components.values())
        .findLast(({ name }) => O.exists(name, n => n === maybeComponentName.value));
      if (!component) return;
      components.set(component._, {
        ...component,
        displayName: O.some(right),
      });
    },
    "CallExpression[type]:exit"(node: TSESTree.CallExpression) {
      if (!isReactHookCall(node)) return;
      const maybeCurrentFn = getCurrentFunction();
      if (O.isNone(maybeCurrentFn)) return;
      const [key, currentFn, isComponent, hookCalls] = maybeCurrentFn.value;
      functionStack.pop();
      functionStack.push([key, currentFn, isComponent, [...hookCalls, node]]);
    },
    "ReturnStatement[type]"(node: TSESTree.ReturnStatement) {
      const maybeCurrentFn = getCurrentFunction();
      if (O.isNone(maybeCurrentFn)) return;
      const [key, currentFn, isKnown, hookCalls] = maybeCurrentFn.value;
      if (isKnown) return;
      const isComponent = hasNoneOrValidComponentName(currentFn, context)
        && JSX.isJSXValue(node.argument, jsxCtx, hint)
        && hasValidHierarchy(currentFn, context, hint);
      if (!isComponent) return;
      functionStack.pop();
      functionStack.push([key, currentFn, true, []]);
      const initPath = AST.getFunctionInitPath(currentFn);
      const id = getFunctionComponentIdentifier(currentFn, context);
      const name = O.flatMapNullable(id, getComponentNameFromIdentifier);
      components.set(key, {
        _: key,
        id,
        kind: "function",
        name,
        node: currentFn,
        displayName: O.none(),
        flag: getComponentFlag(initPath),
        hint,
        hookCalls,
        initPath,
      });
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, listeners } as const;
}
