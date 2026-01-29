import * as AST from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import { IdGenerator } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ComponentDetectionHint } from "./component-detection-hint";
import type { FunctionComponentSemanticNode } from "./component-semantic-node";

import { isHookCall } from "../hook";
import { isJsxLike } from "../jsx";
import { isComponentDefinition } from "./component-definition";
import { DEFAULT_COMPONENT_DETECTION_HINT } from "./component-detection-hint";
import { getFunctionComponentId } from "./component-id";
import { getComponentFlagFromInitPath } from "./component-init-path";
import { isFunctionWithLooseComponentName } from "./component-name";

const idGen = new IdGenerator("function_component_");

interface FunctionEntry extends FunctionComponentSemanticNode {
  isComponentDefinition: boolean;
}

export declare namespace useComponentCollector {
  type Options = {
    collectDisplayName?: boolean;
    hint?: ComponentDetectionHint;
  };
  type ReturnType = {
    ctx: {
      getAllComponents: (node: TSESTree.Program) => FunctionComponentSemanticNode[];
      getCurrentEntries: () => FunctionEntry[];
      getCurrentEntry: () => FunctionEntry | unit;
    };
    visitor: ESLintUtils.RuleListener;
  };
}

/**
 * Get a ctx and visitor object for the rule to collect function components
 * @param context The ESLint rule context
 * @param options The options to use
 * @returns The ctx and visitor of the collector
 */
export function useComponentCollector(
  context: RuleContext,
  options: useComponentCollector.Options = {},
): useComponentCollector.ReturnType {
  const {
    collectDisplayName = false,
    hint = DEFAULT_COMPONENT_DETECTION_HINT,
  } = options;

  const functionEntries: FunctionEntry[] = [];
  const components = new Map<string, FunctionComponentSemanticNode>();

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const getCurrentEntry = () => functionEntries.at(-1);
  const onFunctionEnter = (node: AST.TSESTreeFunction) => {
    const key = idGen.next();
    const exp = AST.findParentNode(node, (n) => n.type === T.ExportDefaultDeclaration);
    const isExportDefault = exp != null;
    const isExportDefaultDeclaration = exp != null && AST.getUnderlyingExpression(exp.declaration) === node;
    const id = getFunctionComponentId(context, node);
    const name = id == null ? unit : AST.toStringFormat(id, getText);
    const initPath = AST.getFunctionInitPath(node);
    const directives = AST.getFunctionDirectives(node);
    const entry = {
      id: getFunctionComponentId(context, node),
      key,
      kind: "function",
      name,
      node,
      directives,
      displayName: unit,
      flag: getComponentFlagFromInitPath(initPath),
      hint,
      hookCalls: [],
      initPath,
      isComponentDefinition: isComponentDefinition(context, node, hint),
      isExportDefault,
      isExportDefaultDeclaration,
      rets: [],
    } as const satisfies FunctionEntry;
    functionEntries.push(entry);
    if (!entry.isComponentDefinition || !isFunctionWithLooseComponentName(context, node, false)) return;
    if (directives.some((d) => d.value === "use memo" || d.value === "use no memo")) {
      components.set(entry.key, entry);
    }
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

  const visitor = {
    ":function": onFunctionEnter,
    ":function:exit": onFunctionExit,
    "ArrowFunctionExpression[body.type!='BlockStatement']"() {
      const entry = getCurrentEntry();
      if (entry == null) return;
      const { body } = entry.node;
      if (body.type === T.BlockStatement) return;
      entry.rets.push(body);
      if (!entry.isComponentDefinition) return;
      if (!components.has(entry.key) && !isJsxLike(context.sourceCode, body, hint)) return;
      components.set(entry.key, entry);
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
    CallExpression(node: TSESTree.CallExpression) {
      if (!isHookCall(node)) return;
      const entry = getCurrentEntry();
      if (entry == null) return;
      entry.hookCalls.push(node);
      if (!entry.isComponentDefinition) return;
      components.set(entry.key, entry);
    },
    ReturnStatement(node: TSESTree.ReturnStatement) {
      const entry = getCurrentEntry();
      if (entry == null) return;
      entry.rets.push(node.argument);
      if (!entry.isComponentDefinition) return;
      const { argument } = node;
      if (!components.has(entry.key) && !isJsxLike(context.sourceCode, argument, hint)) return;
      components.set(entry.key, entry);
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { ctx, visitor } as const;
}
