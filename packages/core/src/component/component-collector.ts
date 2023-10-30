import { getFunctionIdentifier, NodeType, type TSESTreeFunction, unsafeIsMapCall } from "@eslint-react/ast";
import {
  defaultJSXValueCheckOptions,
  isChildrenOfCreateElement,
  isJSXValue,
  type JSXValueCheckOptions,
} from "@eslint-react/jsx";
import { E, MutList, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { shallowEqual } from "fast-equals";

import { isFunctionOfRenderMethod } from "./component-collector-legacy";
import { isValidReactComponentName } from "./is-valid-react-component-name";

const hasInvalidName = (node: TSESTreeFunction) => {
  const id = getFunctionIdentifier(node);

  return id && !isValidReactComponentName(id.name);
};

const hasInvalidHierarchy = (node: TSESTreeFunction, context: RuleContext, ignoreMapCall = false) => {
  return isChildrenOfCreateElement(node, context)
    || isFunctionOfRenderMethod(node, context)
    // eslint-disable-next-line @typescript-eslint/no-extra-parens
    || (ignoreMapCall && unsafeIsMapCall(node.parent));
};

export type ComponentCollectorOptions = JSXValueCheckOptions & {
  /**
   * ignore components in map method's callback function
   */
  ignoreMapCall?: boolean;
};

export type ComponentCollectorCache = WeakMap<TSESTreeFunction, ComponentCollectorOptions>;

const defaultComponentCollectorOptions: ComponentCollectorOptions = {
  ...defaultJSXValueCheckOptions,
  ignoreMapCall: false,
};

export function componentCollector(
  context: RuleContext,
  options: ComponentCollectorOptions = defaultComponentCollectorOptions,
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
        console.warn("Unexpected empty function stack");

        return;
      }

      const currentFn = maybeCurrentFn.value;

      if (cache.has(currentFn) && shallowEqual(cache.get(currentFn), options)) {
        components.push(currentFn);

        return;
      }

      if (
        hasInvalidName(currentFn)
        || !isJSXValue(node.argument, context, options)
        || hasInvalidHierarchy(currentFn, context, options.ignoreMapCall)
      ) {
        return;
      }

      cache.set(currentFn, options);
      components.push(currentFn);
    },
    // eslint-disable-next-line perfectionist/sort-objects
    "ArrowFunctionExpression[body.type!='BlockStatement']"(node: TSESTree.ArrowFunctionExpression) {
      if (cache.has(node) && shallowEqual(cache.get(node), options)) {
        components.push(node);

        return;
      }

      const { body } = node;
      if (
        hasInvalidName(node)
        || !isJSXValue(body, context, options)
        || hasInvalidHierarchy(node, context, options.ignoreMapCall)
      ) {
        return;
      }

      cache.set(node, options);
      components.push(node);
    },
  } as const satisfies RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
