import {
  isFunctionOfClassMethod,
  isFunctionOfClassProperty,
  isFunctionOfObjectMethod,
  NodeType,
  type TSESTreeFunction,
  unsafeIsMapCall,
} from "@eslint-react/ast";
import { getPragmaFromContext, isChildrenOfCreateElement, isJSXValue } from "@eslint-react/jsx";
import { M, MutList, MutRef, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { uid } from "@eslint-react/utils";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { unsafeIsReactHookCall } from "../hook";
import type { ERFunctionComponent } from "./component";
import { DEFAULT_COMPONENT_COLLECTOR_HINT, ERComponentCollectorHint } from "./component-collector-hint";
import { ERFunctionComponentFlag } from "./component-flag";
import { getFunctionComponentIdentifier } from "./component-Identifier";
import { getComponentInitPath, hasCallInInitPath } from "./component-init-path";
import { getComponentNameFromIdentifier, hasNoneOrValidComponentName } from "./component-name";
import { isFunctionOfRenderMethod } from "./component-render-method";

function hasValidHierarchy(node: TSESTreeFunction, context: RuleContext, hint: bigint) {
  if (isChildrenOfCreateElement(node, context) || isFunctionOfRenderMethod(node, context)) {
    return false;
  }

  if (hint & ERComponentCollectorHint.SkipMapCallback && unsafeIsMapCall(node.parent)) {
    return false;
  }

  if (hint & ERComponentCollectorHint.SkipObjectMethod && isFunctionOfObjectMethod(node.parent)) {
    return false;
  }

  if (hint & ERComponentCollectorHint.SkipClassMethod && isFunctionOfClassMethod(node.parent)) {
    return false;
  }

  return !(hint & ERComponentCollectorHint.SkipClassProperty && isFunctionOfClassProperty(node.parent));
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

export function componentCollector(
  context: RuleContext,
  hint: bigint = DEFAULT_COMPONENT_COLLECTOR_HINT,
  pragma = getPragmaFromContext(context),
) {
  const components = new Map<string, ERFunctionComponent>();
  const functionStack = MutList.make<[TSESTreeFunction, boolean, TSESTree.CallExpression[]]>();
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

      if (O.isNone(maybeCurrentFn)) {
        return;
      }

      const [currentFn, isComponent, hookCalls] = maybeCurrentFn.value;

      if (isComponent) {
        return;
      }

      if (
        !hasNoneOrValidComponentName(currentFn)
        || !isJSXValue(node.argument, context, hint)
        || !hasValidHierarchy(currentFn, context, hint)
      ) {
        return;
      }

      MutList.pop(functionStack);
      MutList.append(functionStack, [currentFn, true, []]);

      const id = getFunctionComponentIdentifier(currentFn, context);
      const key = uid.rnd();
      const name = O.flatMapNullable(
        id,
        getComponentNameFromIdentifier,
      );
      const initPath = getComponentInitPath(currentFn);

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

      if (O.isNone(maybeCurrentFn)) {
        return;
      }

      const [currentFn, _, hookCalls] = maybeCurrentFn.value;

      const { body } = currentFn;

      if (
        !hasNoneOrValidComponentName(currentFn)
        || !isJSXValue(body, context, hint)
        || !hasValidHierarchy(currentFn, context, hint)
      ) {
        return;
      }

      const id = getFunctionComponentIdentifier(currentFn, context);
      const key = uid.rnd();
      const name = O.flatMapNullable(
        id,
        getComponentNameFromIdentifier,
      );
      const initPath = getComponentInitPath(currentFn);

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
      if (!unsafeIsReactHookCall(node)) {
        return;
      }

      const maybeCurrentFn = getCurrentFunction();

      if (O.isNone(maybeCurrentFn)) {
        return;
      }

      const [currentFn, IsComponent, hookCalls] = maybeCurrentFn.value;

      MutList.pop(functionStack);
      MutList.append(functionStack, [currentFn, IsComponent, [...hookCalls, node]]);
    },
    // eslint-disable-next-line perfectionist/sort-objects
    "AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']"(
      node: TSESTree.AssignmentExpression,
    ) {
      const { left, right } = node;

      if (left.type !== NodeType.MemberExpression) {
        return;
      }

      const maybeComponentName = M.match(left.object)
        .with({ type: NodeType.Identifier }, n => O.some(n.name))
        .otherwise(O.none);

      if (O.isNone(maybeComponentName)) {
        return;
      }

      const component = Array
        .from(components.values())
        .findLast(({ name }) => O.exists(name, n => n === maybeComponentName.value));

      if (!component) {
        return;
      }

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
