import {
  is,
  isFunctionOfClassMethod,
  isFunctionOfClassProperty,
  isFunctionOfObjectMethod,
  isOneOf,
  NodeType,
  traverseUp,
  type TSESTreeFunction,
} from "@eslint-react/ast";
import { getPragmaFromContext, isChildrenOfCreateElement, isJSXValue } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, MutableList as MutList, MutableRef as MutRef, Option as O } from "effect";
import ShortUniqueId from "short-unique-id";
import { isMatching, match } from "ts-pattern";

import { isReactHookCall } from "../hook";
import type { ERFunctionComponent } from "./component";
import { DEFAULT_COMPONENT_HINT, ERComponentHint } from "./component-collector-hint";
import { ERFunctionComponentFlag } from "./component-flag";
import { getFunctionComponentIdentifier } from "./component-id";
import { getComponentInitPath, hasCallInInitPath } from "./component-init-path";
import { getComponentNameFromIdentifier, hasNoneOrValidComponentName } from "./component-name";
import { isFunctionOfRenderMethod } from "./component-render-method";

const uid = new ShortUniqueId({ length: 10 });

const isMapCall = isMatching({
  callee: {
    type: NodeType.MemberExpression,
    property: {
      name: "map",
    },
  },
});

function hasValidHierarchy(node: TSESTreeFunction, context: RuleContext, hint: bigint) {
  if (isChildrenOfCreateElement(node, context) || isFunctionOfRenderMethod(node, context)) {
    return false;
  }

  if (hint & ERComponentHint.SkipMapCallback && isMapCall(node.parent)) {
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

  return !F.pipe(
    traverseUp(
      node,
      isOneOf([
        NodeType.JSXExpressionContainer,
        NodeType.ArrowFunctionExpression,
        NodeType.FunctionExpression,
        NodeType.Property,
        NodeType.ClassBody,
      ]),
    ),
    O.exists(is(NodeType.JSXExpressionContainer)),
  );
}

function getComponentFlag(initPath: ERFunctionComponent["initPath"], pragma: string) {
  const flagRef = MutRef.make(ERFunctionComponentFlag.None);

  if (hasCallInInitPath("memo")(initPath) || hasCallInInitPath(`${pragma}.memo`)(initPath)) {
    MutRef.update(flagRef, f => f | ERFunctionComponentFlag.Memo);
  }

  if (hasCallInInitPath("forwardRef")(initPath) || hasCallInInitPath(`${pragma}.forwardRef`)(initPath)) {
    MutRef.update(flagRef, f => f | ERFunctionComponentFlag.ForwardRef);
  }

  return MutRef.get(flagRef);
}

export function useComponentCollector(
  context: RuleContext,
  hint: bigint = DEFAULT_COMPONENT_HINT,
  pragma = getPragmaFromContext(context),
) {
  const components = new Map<string, ERFunctionComponent>();
  const functionStack = MutList.make<[
    node: TSESTreeFunction,
    isComponent: boolean,
    hookCalls: TSESTree.CallExpression[],
  ]>();
  const getCurrentFunction = () => O.fromNullable(MutList.tail(functionStack));
  const onFunctionEnter = (node: TSESTreeFunction) => MutList.append(functionStack, [node, false, []]);
  const onFunctionExit = () => MutList.pop(functionStack);

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
    ":function": onFunctionEnter,
    ":function:exit": onFunctionExit,
    ReturnStatement(node: TSESTree.ReturnStatement) {
      const maybeCurrentFn = getCurrentFunction();
      if (O.isNone(maybeCurrentFn)) return;
      const [currentFn, isKnown, hookCalls] = maybeCurrentFn.value;
      if (isKnown) return;
      const isComponent = hasNoneOrValidComponentName(currentFn, context)
        && isJSXValue(node.argument, context, hint)
        && hasValidHierarchy(currentFn, context, hint);
      if (!isComponent) return;

      MutList.pop(functionStack);
      MutList.append(functionStack, [currentFn, true, []]);

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
        flag: getComponentFlag(initPath, pragma),
        hint,
        hookCalls,
        initPath,
        node: currentFn,
      });
    },
    // eslint-disable-next-line perfectionist/sort-objects
    "ArrowFunctionExpression[body.type!='BlockStatement']"() {
      const maybeCurrentFn = getCurrentFunction();
      if (O.isNone(maybeCurrentFn)) return;
      const [currentFn, _, hookCalls] = maybeCurrentFn.value;
      const { body } = currentFn;
      const isComponent = F.constTrue()
        && hasNoneOrValidComponentName(currentFn, context)
        && isJSXValue(body, context, hint)
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
        flag: getComponentFlag(initPath, pragma),
        hint,
        hookCalls,
        initPath,
        node: currentFn,
      });
    },
    "CallExpression:exit"(node: TSESTree.CallExpression) {
      if (!isReactHookCall(node)) return;
      const maybeCurrentFn = getCurrentFunction();
      if (O.isNone(maybeCurrentFn)) return;
      const [currentFn, IsComponent, hookCalls] = maybeCurrentFn.value;

      MutList.pop(functionStack);
      MutList.append(functionStack, [currentFn, IsComponent, [...hookCalls, node]]);
    },
    // eslint-disable-next-line perfectionist/sort-objects
    "AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']"(
      node: TSESTree.Node,
    ) {
      if (node.type !== NodeType.AssignmentExpression) return;
      const { left, right } = node;
      if (left.type !== NodeType.MemberExpression) return;
      const maybeComponentName = match(left.object)
        .with({ type: NodeType.Identifier }, n => O.some(n.name))
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
  } as const satisfies ESLintUtils.RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
