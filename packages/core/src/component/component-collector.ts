import {
  findVariableByNameUpToGlobal,
  getFunctionIdentifier,
  getStaticValue,
  getVariableInit,
  isFunctionOfClassMethod,
  isFunctionOfClassProperty,
  isFunctionOfObjectMethod,
  isOneOf,
  NodeType,
  type TSESTreeFunction,
  unsafeIsMapCall,
} from "@eslint-react/ast";
import { isChildrenOfCreateElement, isJSXValue, JSXValueCheckHint } from "@eslint-react/jsx";
import { E, F, MutList, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { isString } from "effect/Predicate";
import { match } from "ts-pattern";

import { uid } from "../helper";
import type { ESLRFunctionComponent } from "../types";
import { isFunctionOfRenderMethod } from "./component-collector-legacy";
import * as ComponentType from "./component-type";
import { isValidReactComponentName } from "./is-valid-react-component-name";

const hasNoneOrValidName = (node: TSESTreeFunction) => {
  const id = getFunctionIdentifier(node);

  return !id || isValidReactComponentName(id.name);
};

const hasValidHierarchy = (node: TSESTreeFunction, context: RuleContext, hint: bigint) => {
  if (isChildrenOfCreateElement(node, context) || isFunctionOfRenderMethod(node, context)) {
    return false;
  }

  if (hint & ComponentCollectorHint.SkipMapCallback && unsafeIsMapCall(node.parent)) {
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

/* eslint-disable perfectionist/sort-objects */
export const ComponentCollectorHint = {
  ...JSXValueCheckHint,
  // 1n << 0n - 1n << 63n are reserved for JSXValueCheckHint
  // Skip function component created by React.memo
  SkipMemo: 1n << 64n,
  // Skip function component created by React.forwardRef
  SkipForwardRef: 1n << 65n,
  // Skip function component defined in map function callback
  SkipMapCallback: 1n << 66n,
  // Skip function component defined on object method
  SkipObjectMethod: 1n << 67n,
  // Skip function component defined on class method
  SkipClassMethod: 1n << 68n,
  // Skip function component defined on class property
  SkipClassProperty: 1n << 69n,
} as const;
/* eslint-enable perfectionist/sort-objects */

export const defaultComponentCollectorHint = ComponentCollectorHint.SkipMemo
  | ComponentCollectorHint.SkipForwardRef
  | ComponentCollectorHint.SkipStringLiteral
  | ComponentCollectorHint.SkipNumberLiteral;

// TODO: support memo, forwardRef and SkipMemo, SkipForwardRef
// TODO: support for detecting component types listed in core/component/component-types.ts
export function componentCollector(
  context: RuleContext,
  hint: bigint = defaultComponentCollectorHint,
) {
  const components = new Map<string, ESLRFunctionComponent>();
  const functionStack = MutList.make<TSESTreeFunction>();
  const getCurrentFunction = () => O.fromNullable(MutList.tail(functionStack));
  const onFunctionEnter = (node: TSESTreeFunction) => MutList.append(functionStack, node);
  const onFunctionExit = () => MutList.pop(functionStack);

  const ctx = {
    // get allComponents(): E.Either<Error, TSESTreeFunction[]>
    getAllComponents(): E.Either<Error, typeof components> {
      if (context.getScope().block.type !== NodeType.Program) {
        return E.left(new Error("getAllComponents should only be called in Program:exit"));
      }

      return E.right(components);
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

      const currentFn = maybeCurrentFn.value;

      if (
        !hasNoneOrValidName(currentFn)
        || !isJSXValue(node.argument, context, hint)
        || !hasValidHierarchy(currentFn, context, hint)
      ) {
        return;
      }

      const id = uid.rnd();
      components.set(id, {
        id,
        type: ComponentType.ESLRFunctionComponent,
        name: O.fromNullable(getFunctionIdentifier(currentFn)?.name),
        displayName: O.none(),
        hint,
        node: currentFn,
      });
    },
    // eslint-disable-next-line perfectionist/sort-objects
    "ArrowFunctionExpression[body.type!='BlockStatement']"(node: TSESTree.ArrowFunctionExpression) {
      const { body } = node;
      if (
        !hasNoneOrValidName(node)
        || !isJSXValue(body, context, hint)
        || !hasValidHierarchy(node, context, hint)
      ) {
        return;
      }

      const id = uid.rnd();
      components.set(id, {
        id,
        type: ComponentType.ESLRFunctionComponent,
        name: O.fromNullable(getFunctionIdentifier(node)?.name),
        displayName: O.none(),
        hint,
        node,
      });
    },
    "AssignmentExpression[operator='='][left.type='MemberExpression'][left.property.name='displayName']"(
      node: TSESTree.AssignmentExpression,
    ) {
      const { left, right } = node;

      if (left.type !== NodeType.MemberExpression) {
        return;
      }

      const maybeComponentName = match(left.object)
        .with({ type: NodeType.Identifier }, n => O.some(n.name))
        .otherwise(O.none);

      if (O.isNone(maybeComponentName)) {
        return;
      }

      const component = Array.from(components.values()).findLast(c => {
        return O.isSome(c.name)
          && c.name.value === maybeComponentName.value;
      });

      if (!component) {
        return;
      }

      const maybeRightValue = match(right)
        .with({ type: NodeType.Literal }, ({ value }) => O.some(value))
        .with({ type: NodeType.TemplateLiteral }, n => O.some(getStaticValue(n)?.value))
        .with({ type: NodeType.Identifier }, n => {
          return F.pipe(
            findVariableByNameUpToGlobal(n.name, context.getScope()),
            O.flatMap(getVariableInit(0)),
            O.filter(isOneOf([NodeType.Literal, NodeType.TemplateLiteral])),
            O.map(getStaticValue),
            O.flatMapNullable(v => v?.value),
          );
        })
        .otherwise(O.none);

      components.set(component.id, {
        ...component,
        displayName: O.filter(isString)(maybeRightValue),
      });
    },
  } as const satisfies ESLintUtils.RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
