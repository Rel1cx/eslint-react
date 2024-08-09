import type { TSESTreeFunction } from "@eslint-react/ast";
import {
  getNestedReturnStatements,
  is,
  isFunctionOfClassMethod,
  isFunctionOfClassProperty,
  isFunctionOfObjectMethod,
  isMapCallLoose,
  isOneOf,
  traverseUp,
} from "@eslint-react/ast";
import { isJSXValue } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
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
import { getComponentInitPath, hasCallInComponentInitPath } from "./component-init-path";
import { getComponentNameFromIdentifier } from "./component-name";
import { isFunctionOfRenderMethod } from "./component-render-method";
import { hasNoneOrValidComponentName } from "./misc";

const uid = new ShortUniqueId({ length: 10 });

function hasValidHierarchy(node: TSESTreeFunction, context: RuleContext, hint: bigint) {
  if (isChildrenOfCreateElement(node, context) || isFunctionOfRenderMethod(node)) {
    return false;
  }
  if (hint & ERComponentHint.SkipMapCallback && isMapCallLoose(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipObjectMethod && isFunctionOfObjectMethod(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipClassMethod && isFunctionOfClassMethod(node.parent)) {
    return false;
  }
  if (hint & ERComponentHint.SkipClassProperty && isFunctionOfClassProperty(node.parent)) {
    return false;
  }
  return !O.exists(
    traverseUp(
      node,
      isOneOf([
        AST_NODE_TYPES.JSXExpressionContainer,
        AST_NODE_TYPES.ArrowFunctionExpression,
        AST_NODE_TYPES.FunctionExpression,
        AST_NODE_TYPES.Property,
        AST_NODE_TYPES.ClassBody,
      ]),
    ),
    is(AST_NODE_TYPES.JSXExpressionContainer),
  );
}

function getComponentFlag(initPath: ERFunctionComponent["initPath"]) {
  let flagRef = ERFunctionComponentFlag.None;
  if (hasCallInComponentInitPath("memo")(initPath)) {
    flagRef |= ERFunctionComponentFlag.Memo;
  }
  if (hasCallInComponentInitPath("forwardRef")(initPath)) {
    flagRef |= ERFunctionComponentFlag.ForwardRef;
  }
  return flagRef;
}

export function useComponentCollector(
  context: RuleContext,
  hint: bigint = DEFAULT_COMPONENT_HINT,
) {
  const jsxCtx = { getScope: (node: TSESTree.Node) => context.sourceCode.getScope(node) };
  const components = new Map<string, ERFunctionComponent>();
  const functionStack: [
    key: string,
    node: TSESTreeFunction,
    isComponent: boolean,
    hookCalls: TSESTree.CallExpression[],
  ][] = [];
  const getCurrentFunction = () => O.fromNullable(functionStack.at(-1));
  const onFunctionEnter = (node: TSESTreeFunction) => functionStack.push([uid.rnd(), node, false, []]);
  const onFunctionExit = () => {
    const [key, fn, isComponent] = functionStack.at(-1) ?? [];
    if (!key || !fn || !isComponent) return functionStack.pop();
    const shouldDrop = getNestedReturnStatements(fn.body)
      .slice()
      .reverse()
      .some(r => {
        return context.sourceCode.getScope(r).block === fn
          && r.argument !== null
          && !isJSXValue(r.argument, jsxCtx, hint);
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
        && isJSXValue(body, jsxCtx, hint)
        && hasValidHierarchy(currentFn, context, hint);
      if (!isComponent) return;
      const initPath = getComponentInitPath(currentFn);
      const id = getFunctionComponentIdentifier(currentFn, context);
      const name = O.flatMapNullable(id, getComponentNameFromIdentifier);
      const key = uid.rnd();
      components.set(key, {
        _: key,
        id,
        kind: "function",
        name,
        displayName: O.none(),
        flag: getComponentFlag(initPath),
        hint,
        hookCalls,
        initPath,
        node: currentFn,
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
        && isJSXValue(node.argument, jsxCtx, hint)
        && hasValidHierarchy(currentFn, context, hint);
      if (!isComponent) return;
      functionStack.pop();
      functionStack.push([key, currentFn, true, []]);
      const initPath = getComponentInitPath(currentFn);
      const id = getFunctionComponentIdentifier(currentFn, context);
      const name = O.flatMapNullable(id, getComponentNameFromIdentifier);
      components.set(key, {
        _: key,
        id,
        kind: "function",
        name,
        displayName: O.none(),
        flag: getComponentFlag(initPath),
        hint,
        hookCalls,
        initPath,
        node: currentFn,
      });
    },
  } as const satisfies ESLintUtils.RuleListener;
  return {
    ctx,
    listeners,
  } as const;
}
