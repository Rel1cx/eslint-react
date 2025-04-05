import type { RuleContext } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ComponentDetectionHint } from "./component-detection-hint";
import type { FunctionComponent } from "./component-semantic-node";
import * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import { getId } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { DISPLAY_NAME_ASSIGNMENT_SELECTOR } from "../constants";
import { isReactHookCall } from "../hook";
import { isValidComponentDefinition } from "./component-definition";
import { DEFAULT_COMPONENT_DETECTION_HINT } from "./component-detection-hint";
import { getFunctionComponentId } from "./component-id";
import { getComponentFlagFromInitPath } from "./component-init-path";
import { getComponentNameFromId, hasNoneOrLooseComponentName } from "./component-name";

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
    hint?: ComponentDetectionHint;
  };
  type ReturnType = {
    ctx: {
      getAllComponents: (node: TSESTree.Program) => Map<string, FunctionComponent>;
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
    hint = DEFAULT_COMPONENT_DETECTION_HINT,
  } = options;

  const components = new Map<string, FunctionComponent>();
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
          && !JSX.isJsxLike(context.sourceCode, r.argument, hint);
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
      const isComponent = hasNoneOrLooseComponentName(context, entry.node)
        && JSX.isJsxLike(context.sourceCode, body, hint)
        && isValidComponentDefinition(context, entry.node, hint);
      if (!isComponent) return;
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentId(context, entry.node);
      const name = getComponentNameFromId(id);
      const key = getId();
      components.set(key, {
        id,
        key,
        kind: "function",
        name,
        node: entry.node,
        displayName: _,
        flag: getComponentFlagFromInitPath(initPath),
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
      const isComponent = hasNoneOrLooseComponentName(context, entry.node)
        && JSX.isJsxLike(context.sourceCode, node.argument, hint)
        && isValidComponentDefinition(context, entry.node, hint);
      if (!isComponent) return;
      entry.isComponent = true;
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentId(context, entry.node);
      const name = getComponentNameFromId(id);
      components.set(entry.key, {
        id,
        key: entry.key,
        kind: "function",
        name,
        node: entry.node,
        displayName: _,
        flag: getComponentFlagFromInitPath(initPath),
        hint,
        hookCalls: entry.hookCalls,
        initPath,
      });
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, listeners } as const;
}
