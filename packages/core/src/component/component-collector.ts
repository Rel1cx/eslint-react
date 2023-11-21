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
import { isChildrenOfCreateElement, isJSXValue } from "@eslint-react/jsx";
import { E, F, MutList, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { isString } from "effect/Predicate";
import { match } from "ts-pattern";

import { uid } from "../helper";
import {
  defaultComponentCollectorHint,
  ExRComponentCollectorHint,
  ExRComponentFlag,
  type ExRFunctionComponent,
} from "../types";
import { isFunctionOfRenderMethod } from "./component-collector-legacy";
import { getComponentInitPath } from "./component-init-path";
import { isValidReactComponentName } from "./component-name";

function hasNoneOrValidName(node: TSESTreeFunction) {
  const id = getFunctionIdentifier(node);

  return !id || isValidReactComponentName(id.name);
}

function hasValidHierarchy(node: TSESTreeFunction, context: RuleContext, hint: bigint) {
  if (isChildrenOfCreateElement(node, context) || isFunctionOfRenderMethod(node, context)) {
    return false;
  }

  if (hint & ExRComponentCollectorHint.SkipMapCallback && unsafeIsMapCall(node.parent)) {
    return false;
  }

  if (hint & ExRComponentCollectorHint.SkipObjectMethod && isFunctionOfObjectMethod(node.parent)) {
    return false;
  }

  if (hint & ExRComponentCollectorHint.SkipClassMethod && isFunctionOfClassMethod(node.parent)) {
    return false;
  }

  return !(hint & ExRComponentCollectorHint.SkipClassProperty && isFunctionOfClassProperty(node.parent));
}

export function componentCollector(
  context: RuleContext,
  hint: bigint = defaultComponentCollectorHint,
) {
  const components = new Map<string, ExRFunctionComponent>();
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

      const id = O.fromNullable(getFunctionIdentifier(currentFn));
      const key = uid.rnd();
      components.set(key, {
        _: key,
        id,
        kind: "function",
        name: O.flatMapNullable(id, n => n.name),
        displayName: O.none(),
        flag: ExRComponentFlag.None,
        hint,
        initPath: getComponentInitPath(currentFn),
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

      const id = O.fromNullable(getFunctionIdentifier(node));
      const key = uid.rnd();
      components.set(key, {
        _: key,
        id,
        kind: "function",
        name: O.fromNullable(getFunctionIdentifier(node)?.name),
        displayName: O.none(),
        flag: ExRComponentFlag.None,
        hint,
        initPath: getComponentInitPath(node),
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

      components.set(component._, {
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
