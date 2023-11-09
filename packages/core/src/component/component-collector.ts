import {
  getFunctionIdentifier,
  isFunctionOfClassMethod,
  isFunctionOfClassProperty,
  isFunctionOfObjectMethod,
  NodeType,
  type TSESTreeFunction,
  unsafeIsMapCall,
} from "@eslint-react/ast";
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

const hasValidHierarchy = (node: TSESTreeFunction, context: RuleContext, hint: bigint) => {
  if (isChildrenOfCreateElement(node, context) || isFunctionOfRenderMethod(node, context)) {
    return false;
  }

  if (hint & ComponentCollectorHint.SkipMapCall && unsafeIsMapCall(node.parent)) {
    return false;
  }

  if (hint & ComponentCollectorHint.SkipObjectMethod && isFunctionOfObjectMethod(node.parent)) {
    return false;
  }

  if (hint & ComponentCollectorHint.SkipClassMethod && isFunctionOfClassMethod(node.parent)) {
    return false;
  }

  return !(hint & ComponentCollectorHint.SkipClassProperty && isFunctionOfClassProperty(node.parent));
};

export type ComponentCollectorCache = WeakMap<TSESTreeFunction, bigint>;

/* eslint-disable perfectionist/sort-objects */
export const ComponentCollectorHint = {
  ...JSXValueCheckHint,
  // 1n << 0n - 1n << 63n are reserved for JSXValueCheckHint
  // Skip function component defined in map call
  SkipMapCall: 1n << 64n,
  // Skip function component defined on object method
  SkipObjectMethod: 1n << 65n,
  // Skip function component defined on class method
  SkipClassMethod: 1n << 66n,
  // Skip function component defined on class property
  SkipClassProperty: 1n << 67n,
} as const;
/* eslint-enable perfectionist/sort-objects */

export const defaultComponentCollectorHint = ComponentCollectorHint.SkipStringLiteral
  | ComponentCollectorHint.SkipNumberLiteral;

// TODO: support for detecting component types listed in core/component/component-types.ts
export function componentCollector(
  context: RuleContext,
  hint: bigint = defaultComponentCollectorHint,
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
        !hasNoneOrValidName(currentFn)
        || !isJSXValue(node.argument, context, hint)
        || !hasValidHierarchy(currentFn, context, hint)
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
        !hasNoneOrValidName(node)
        || !isJSXValue(body, context, hint)
        || !hasValidHierarchy(node, context, hint)
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
