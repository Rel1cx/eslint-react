import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { match } from "ts-pattern";

import { isChildrenOfCreateElement } from "../element";
import { isReactHookCall } from "../hook";
import { getId } from "../utils";
import type { ERFunctionComponent } from "./component";
import { DEFAULT_COMPONENT_HINT, ERComponentHint } from "./component-collector-hint";
import { ERFunctionComponentFlag } from "./component-flag";
import { getFunctionComponentIdentifier } from "./component-id";
import { getComponentNameFromIdentifier } from "./component-name";
import { isFunctionOfRenderMethod } from "./component-render-method";
import { hasNoneOrValidComponentName } from "./misc";

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
  hint = DEFAULT_COMPONENT_HINT,
) {
  const jsxCtx = { getScope: (node: TSESTree.Node) => context.sourceCode.getScope(node) } as const;
  const components = new Map<string, ERFunctionComponent>();
  const functionStack: {
    key: string;
    node: AST.TSESTreeFunction;
    hookCalls: TSESTree.CallExpression[];
    isComponent: boolean;
  }[] = [];
  const getCurrentFunction = () => O.fromNullable(functionStack.at(-1));
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const key = getId();
    functionStack.push({ key, node, hookCalls: [], isComponent: false });
  };
  const onFunctionExit = () => {
    const { key, node, isComponent } = functionStack.at(-1) ?? {};
    if (!key || !node || !isComponent) return functionStack.pop();
    const shouldDrop = AST.getNestedReturnStatements(node.body)
      .slice()
      .reverse()
      .some(r => {
        return context.sourceCode.getScope(r).block === node
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
    getCurrentFunction,
    getCurrentFunctionStack() {
      return [...functionStack];
    },
  } as const;

  const listeners = {
    ":function[type]": onFunctionEnter,
    ":function[type]:exit": onFunctionExit,
    "ArrowFunctionExpression[type][body.type!='BlockStatement']"() {
      O.match(getCurrentFunction(), {
        onNone() {},
        onSome(a) {
          const { body } = a.node;
          const isComponent = hasNoneOrValidComponentName(a.node, context)
            && JSX.isJSXValue(body, jsxCtx, hint)
            && hasValidHierarchy(a.node, context, hint);
          if (!isComponent) return;
          const initPath = AST.getFunctionInitPath(a.node);
          const id = getFunctionComponentIdentifier(a.node, context);
          const name = O.flatMapNullable(id, getComponentNameFromIdentifier);
          const key = getId();
          components.set(key, {
            _: key,
            id,
            kind: "function",
            name,
            node: a.node,
            displayName: O.none(),
            flag: getComponentFlag(initPath),
            hint,
            hookCalls: a.hookCalls,
            initPath,
          });
        },
      });
    },
    "AssignmentExpression[type][operator='='][left.type='MemberExpression'][left.property.name='displayName']"(
      node: TSESTree.AssignmentExpression & { left: TSESTree.MemberExpression },
    ) {
      const { left, right } = node;
      const componentName = match(left.object)
        .with({ type: AST_NODE_TYPES.Identifier }, n => O.some(n.name))
        .otherwise(O.none);
      O.match(componentName, {
        onNone() {},
        onSome(a) {
          const component = Array
            .from(components.values())
            .findLast(({ name }) => O.exists(name, n => n === a));
          if (!component) return;
          components.set(component._, {
            ...component,
            displayName: O.some(right),
          });
        },
      });
    },
    "CallExpression[type]:exit"(node: TSESTree.CallExpression) {
      if (!isReactHookCall(node)) return;
      O.match(getCurrentFunction(), {
        onNone() {},
        onSome(a) {
          functionStack.pop();
          functionStack.push({ ...a, hookCalls: [...a.hookCalls, node] });
        },
      });
    },
    "ReturnStatement[type]"(node: TSESTree.ReturnStatement) {
      O.match(getCurrentFunction(), {
        onNone() {},
        onSome(a) {
          const isComponent = hasNoneOrValidComponentName(a.node, context)
            && JSX.isJSXValue(node.argument, jsxCtx, hint)
            && hasValidHierarchy(a.node, context, hint);
          if (!isComponent) return;
          functionStack.pop();
          functionStack.push({ ...a, isComponent });
          const initPath = AST.getFunctionInitPath(a.node);
          const id = getFunctionComponentIdentifier(a.node, context);
          const name = O.flatMapNullable(id, getComponentNameFromIdentifier);
          components.set(a.key, {
            _: a.key,
            id,
            kind: "function",
            name,
            node: a.node,
            displayName: O.none(),
            flag: getComponentFlag(initPath),
            hint,
            hookCalls: a.hookCalls,
            initPath,
          });
        },
      });
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, listeners } as const;
}
