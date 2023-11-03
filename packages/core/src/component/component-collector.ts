import { getFunctionIdentifier, NodeType, type TSESTreeFunction, unsafeIsMapCall } from "@eslint-react/ast";
import { isChildrenOfCreateElement, isJSXValue, JSXValueCheckHint } from "@eslint-react/jsx";
import { E, MutList, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { isFunctionOfRenderMethod } from "./component-collector-legacy";
import { isValidReactComponentName } from "./is-valid-react-component-name";

const hasNoneOrValidName = (node: TSESTreeFunction) => {
  const id = getFunctionIdentifier(node);

  return !id || isValidReactComponentName(id.name);
};

const hasValidHierarchy = (node: TSESTreeFunction, context: RuleContext, ignoreMapCall = false) => {
  return !(isChildrenOfCreateElement(node, context)
    || isFunctionOfRenderMethod(node, context)
    // eslint-disable-next-line @typescript-eslint/no-extra-parens
    || (ignoreMapCall && unsafeIsMapCall(node.parent)));
};

export type ComponentCollectorCache = WeakMap<TSESTreeFunction, bigint>;

export const ComponentCollectorHint = {
  ...JSXValueCheckHint,
  IgnoreMapCall: 1n << 4n,
} as const;

export function componentCollector(
  context: RuleContext,
  hint: bigint = ComponentCollectorHint.None,
  cache: ComponentCollectorCache = new WeakMap(),
) {
  const components: TSESTreeFunction[] = [];
  const functionStack = MutList.make<TSESTreeFunction>();
  const getCurrentFunction = () => O.fromNullable(MutList.tail(functionStack));
  const onFunctionEnter = (node: TSESTreeFunction) => MutList.append(functionStack, node);
  const onFunctionExit = () => MutList.pop(functionStack);

  const ctx = {
    // get allComponents(): E.Either<Error, TSESTreeFunction[]>
    getAllComponents(): E.Either<Error, TSESTreeFunction[]> {
      if (context.getScope().block.type !== NodeType.Program) {
        return E.left(new Error("getAllComponents should only be called in Program:exit"));
      }

      return E.right(components);
    },
    getCurrentComponents() {
      return [...components];
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

      const currentFn = maybeCurrentFn.value;

      if (cache.has(currentFn) && cache.get(currentFn) === hint) {
        components.push(currentFn);

        return;
      }

      if (
        !(hasNoneOrValidName(currentFn)
          && isJSXValue(node.argument, context, hint)
          && hasValidHierarchy(currentFn, context, Boolean(hint & ComponentCollectorHint.IgnoreMapCall)))
      ) {
        return;
      }

      cache.set(currentFn, hint);
      components.push(currentFn);
    },
    // eslint-disable-next-line perfectionist/sort-objects
    "ArrowFunctionExpression[body.type!='BlockStatement']"(node: TSESTree.ArrowFunctionExpression) {
      if (cache.has(node) && cache.get(node) === hint) {
        components.push(node);

        return;
      }

      const { body } = node;
      if (
        !(hasNoneOrValidName(node)
          && isJSXValue(body, context, hint)
          && hasValidHierarchy(node, context, Boolean(hint & ComponentCollectorHint.IgnoreMapCall)))
      ) {
        return;
      }

      cache.set(node, hint);
      components.push(node);
    },
  } as const satisfies ESLintUtils.RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
