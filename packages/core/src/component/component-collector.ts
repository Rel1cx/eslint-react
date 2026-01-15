import * as AST from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import { type RuleContext } from "@eslint-react/shared";
import { IdGenerator } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ComponentDetectionHint } from "./component-detection-hint";
import type { FunctionComponent } from "./component-semantic-node";

import { isReactHookCall } from "../hook";
import { isJsxLike } from "../jsx";
import { isComponentDefinition } from "./component-definition";
import { DEFAULT_COMPONENT_DETECTION_HINT } from "./component-detection-hint";
import { getFunctionComponentId } from "./component-id";
import { getComponentFlagFromInitPath } from "./component-init-path";
import { hasNoneOrLooseComponentName } from "./component-name";

const idGen = new IdGenerator("function_component_");

type FunctionEntry = {
  key: string;
  node: AST.TSESTreeFunction;
  hookCalls: TSESTree.CallExpression[];
  isComponent: boolean;
  rets: TSESTree.ReturnStatement["argument"][];
};

export declare namespace useComponentCollector {
  type Options = {
    collectDisplayName?: boolean;
    collectHookCalls?: boolean;
    hint?: ComponentDetectionHint;
  };
  type ReturnType = {
    ctx: {
      getAllComponents: (node: TSESTree.Program) => FunctionComponent[];
      getCurrentEntries: () => FunctionEntry[];
      getCurrentEntry: () => FunctionEntry | unit;
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

  const functionEntries: FunctionEntry[] = [];
  const components = new Map<string, FunctionComponent>();

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const getCurrentEntry = () => functionEntries.at(-1);
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const key = idGen.next();
    functionEntries.push({ key, node, hookCalls: [], isComponent: false, rets: [] });
  };
  const onFunctionExit = () => {
    return functionEntries.pop();
  };

  const ctx = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAllComponents(node: TSESTree.Program) {
      return [...components.values()];
    },
    getCurrentEntries() {
      return [...functionEntries];
    },
    getCurrentEntry,
  } as const;

  const listeners = {
    ":function[type]": onFunctionEnter,
    ":function[type]:exit": onFunctionExit,
    "ArrowFunctionExpression[body.type!='BlockStatement']"() {
      const entry = getCurrentEntry();
      if (entry == null) return;
      const { body } = entry.node;
      if (body.type === T.BlockStatement) return;
      const isComponent = hasNoneOrLooseComponentName(context, entry.node)
        && isJsxLike(context.sourceCode, body, hint)
        && isComponentDefinition(context, entry.node, hint);
      if (!isComponent) return;
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentId(context, entry.node);
      const key = entry.key;
      const name = id == null ? unit : AST.toStringFormat(id, getText);
      components.set(key, {
        id,
        key,
        kind: "function",
        name,
        node: entry.node,
        displayName: unit,
        flag: getComponentFlagFromInitPath(initPath),
        hint,
        hookCalls: entry.hookCalls,
        initPath,
        rets: [body],
      });
    },
    ...collectDisplayName
      ? {
        [AST.SEL_DISPLAY_NAME_ASSIGNMENT_EXPRESSION](node: TSESTree.AssignmentExpression) {
          const { left, right } = node;
          if (left.type !== T.MemberExpression) return;
          const componentName = left.object.type === T.Identifier
            ? left.object.name
            : unit;
          const component = [...components.values()].findLast(({ name }) => name != null && name === componentName);
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
      entry.rets.push(node.argument);
      const isComponent = hasNoneOrLooseComponentName(context, entry.node)
        && isJsxLike(context.sourceCode, node.argument, hint)
        && isComponentDefinition(context, entry.node, hint);
      if (!isComponent) return;
      entry.isComponent = true;
      const initPath = AST.getFunctionInitPath(entry.node);
      const id = getFunctionComponentId(context, entry.node);
      const key = entry.key;
      const name = id == null ? unit : AST.toStringFormat(id, getText);
      components.set(key, {
        id,
        key,
        kind: "function",
        name,
        node: entry.node,
        displayName: unit,
        flag: getComponentFlagFromInitPath(initPath),
        hint,
        hookCalls: entry.hookCalls,
        initPath,
        rets: entry.rets,
      });
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, listeners } as const;
}
