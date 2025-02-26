/* eslint-disable no-restricted-syntax */
import * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import { getId, type RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";

import { DISPLAY_NAME_ASSIGNMENT_SELECTOR } from "../constants";
import { isReactHookCall } from "../hook";
import type { ERComponentHint } from "./component-collector-hint";
import { DEFAULT_COMPONENT_HINT } from "./component-collector-hint";
import { ERComponentFlag } from "./component-flag";
import { getFunctionComponentIdentifier } from "./component-id";
import { getComponentNameFromIdentifier, hasNoneOrValidComponentName } from "./component-name";
import type { ERFunctionComponent } from "./component-semantic-node";
import { hasValidHierarchy } from "./hierarchy";

type FunctionEntry = {
  key: string;
  node: AST.TSESTreeFunction;
  hookCalls: TSESTree.CallExpression[];
  isComponent: boolean;
};

export declare namespace useComponentCollector {
  type Options = {
    collectDisplayName?: boolean;
    collectHookCalls?: boolean;
    hint?: ERComponentHint;
  };
  type ReturnType = {
    ctx: {
      getAllComponents: (node: TSESTree.Program) => Map<string, ERFunctionComponent>;
      getCurrentEntries: () => FunctionEntry[];
      getCurrentEntry: () => FunctionEntry | _;
    };
    listeners: ESLintUtils.RuleListener;
  };
}

/**
 * Get a ctx and listeners for the rule to collect function components
 * @param context The ESLint rule context
 * @param options The options to use
 * @returns The component collector
 */
export function useComponentCollector(
  context: RuleContext,
  options: useComponentCollector.Options = {},
): useComponentCollector.ReturnType {
  const {
    collectDisplayName = false,
    collectHookCalls = false,
    hint = DEFAULT_COMPONENT_HINT,
  } = options;

  const jsxCtx = { getScope: (node: TSESTree.Node) => context.sourceCode.getScope(node) } as const;
  const components = new Map<string, ERFunctionComponent>();
  const functionEntries: FunctionEntry[] = [];

  const getCurrentEntry = () => functionEntries.at(-1);
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const key = getId();
    functionEntries.push({ key, node, hookCalls: [], isComponent: false });
  };
  const onFunctionExit = () => {
    const entry = functionEntries.at(-1);
    if (entry == null) return;
    if (!entry.isComponent) return functionEntries.pop();
    const shouldDrop = AST.getNestedReturnStatements(entry.node.body)
      .slice()
      .reverse()
      .some((r) => {
        return context.sourceCode.getScope(r).block === entry.node
          && r.argument != null
          && !JSX.isJSXValue(r.argument, jsxCtx, hint);
      });
    if (shouldDrop) {
      components.delete(entry.key);
    }
    return functionEntries.pop();
  };

  const ctx = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllComponents(node: TSESTree.Program): typeof components {
      return components;
    },
    getCurrentEntries() {
      return [...functionEntries];
    },
    getCurrentEntry,
  } as const;

  const listeners = {
    ":function[type]": onFunctionEnter,
    ":function[type]:exit": onFunctionExit,
    "ArrowFunctionExpression[type][body.type!='BlockStatement']"() {
      const entry = getCurrentEntry();
      if (entry == null) return;
      const { body } = entry.node;
      const isComponent = hasNoneOrValidComponentName(context, entry.node)
        && JSX.isJSXValue(body, jsxCtx, hint)
        && hasValidHierarchy(context, entry.node, hint);
      if (!isComponent) return;
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentIdentifier(context, entry.node);
      const name = getComponentNameFromIdentifier(id);
      const key = getId();
      components.set(key, {
        id,
        key,
        kind: "function",
        name,
        node: entry.node,
        displayName: _,
        flag: getComponentFlag(initPath),
        hint,
        hookCalls: entry.hookCalls,
        initPath,
      });
    },
    ...collectDisplayName
      ? {
        [DISPLAY_NAME_ASSIGNMENT_SELECTOR](node: TSESTree.AssignmentExpression) {
          const { left, right } = node;
          if (left.type !== T.MemberExpression) return;
          const componentName = left.object.type === T.Identifier
            ? left.object.name
            : _;
          const component = [...components.values()]
            .findLast(({ name }) => name != null && name === componentName);
          if (component == null) return;
          component.displayName = right;
        },
      }
      : {},
    ...collectHookCalls
      ? {
        "CallExpression[type]:exit"(node: TSESTree.CallExpression) {
          if (!isReactHookCall(node)) return;
          const entry = getCurrentEntry();
          if (entry == null) return;
          entry.hookCalls.push(node);
        },
      }
      : {},
    "ReturnStatement[type]"(node: TSESTree.ReturnStatement) {
      const entry = getCurrentEntry();
      if (entry == null) return;
      const isComponent = hasNoneOrValidComponentName(context, entry.node)
        && JSX.isJSXValue(node.argument, jsxCtx, hint)
        && hasValidHierarchy(context, entry.node, hint);
      if (!isComponent) return;
      entry.isComponent = true;
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentIdentifier(context, entry.node);
      const name = getComponentNameFromIdentifier(id);
      components.set(entry.key, {
        id,
        key: entry.key,
        kind: "function",
        name,
        node: entry.node,
        displayName: _,
        flag: getComponentFlag(initPath),
        hint,
        hookCalls: entry.hookCalls,
        initPath,
      });
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, listeners } as const;
}

function getComponentFlag(initPath: ERFunctionComponent["initPath"]) {
  let flag = ERComponentFlag.None;
  if (initPath != null && AST.hasCallInFunctionInitPath("memo", initPath)) {
    flag |= ERComponentFlag.Memo;
  }
  if (initPath != null && AST.hasCallInFunctionInitPath("forwardRef", initPath)) {
    flag |= ERComponentFlag.ForwardRef;
  }
  return flag;
}
