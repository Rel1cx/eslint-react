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

import type { ERFunctionComponent } from "../types";
import * as ComponentType from "../types/component-type";
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
  const components: ERFunctionComponent[] = [];
  const functionStack = MutList.make<TSESTreeFunction>();
  const getCurrentFunction = () => O.fromNullable(MutList.tail(functionStack));
  const onFunctionEnter = (node: TSESTreeFunction) => MutList.append(functionStack, node);
  const onFunctionExit = () => MutList.pop(functionStack);

  const ctx = {
    // get allComponents(): E.Either<Error, TSESTreeFunction[]>
    getAllComponents(): E.Either<Error, ERFunctionComponent[]> {
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

      if (
        !hasNoneOrValidName(currentFn)
        || !isJSXValue(node.argument, context, hint)
        || !hasValidHierarchy(currentFn, context, hint)
      ) {
        return;
      }
      components.push({
        type: ComponentType.FunctionComponent,
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

      components.push({
        type: ComponentType.FunctionComponent,
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

      const { object } = left;

      const maybeLeftInit = F.pipe(
        match(object)
          .with({ type: NodeType.Identifier }, O.some)
          .with({ type: NodeType.MemberExpression }, ({ property }) => {
            return match(property)
              .with({ type: NodeType.Identifier }, O.some)
              .otherwise(O.none);
          })
          .otherwise(O.none),
        O.flatMap(id => findVariableByNameUpToGlobal(id.name, context.getScope())),
        O.flatMap(getVariableInit(0)),
      );

      if (O.isNone(maybeLeftInit)) {
        return;
      }

      const componentIndex = components.findLastIndex(c => c.node === maybeLeftInit.value);

      if (componentIndex === -1) {
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

      // eslint-disable-next-line security/detect-object-injection
      const component = components[componentIndex];

      if (!component) {
        return;
      }

      component.displayName = O.filter(isString)(maybeRightValue);
    },
  } as const satisfies ESLintUtils.RuleListener;

  return {
    ctx,
    listeners,
  } as const;
}
