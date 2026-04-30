import { Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { randomBytes } from "node:crypto";
import { SEL_FUNCTION_DISPLAY_NAME_ASSIGNMENT, getFunctionDirectives, getFunctionInitPath } from "./function";
import {
  DEFAULT_COMPONENT_DETECTION_HINT,
  type FunctionComponentDetectionHint,
  type FunctionComponentSemanticNode,
  getFunctionComponentFlagFromInitPath,
  getFunctionComponentId,
  isFunctionComponentDefinition,
  isFunctionWithLooseComponentName,
} from "./function-component";
import { isHookCall } from "./hook";
import { isJsxLike } from "./jsx";

interface FunctionEntry extends FunctionComponentSemanticNode {
  isFunctionComponentDefinition: boolean;
}

export declare namespace getFunctionComponentCollector {
  type Options = {
    collectDisplayName?: boolean;
    hint?: FunctionComponentDetectionHint;
  };
  type ReturnType = {
    api: {
      getAllComponents: (node: TSESTree.Program) => FunctionComponentSemanticNode[];
    };
    visitor: ESLintUtils.RuleListener;
  };
}

/**
 * Get an api and visitor object for the rule to collect function components
 * @param context The ESLint rule context
 * @param options The options to use
 * @returns The api and visitor of the collector
 */
export function getFunctionComponentCollector(
  context: RuleContext,
  options: getFunctionComponentCollector.Options = {},
): getFunctionComponentCollector.ReturnType {
  const {
    collectDisplayName = false,
    hint = DEFAULT_COMPONENT_DETECTION_HINT,
  } = options;

  const functionEntries: FunctionEntry[] = [];
  const components = new Map<string, FunctionComponentSemanticNode>();

  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  const getCurrentEntry = () => functionEntries.at(-1) ?? null;
  const onFunctionEnter = (node: TSESTreeFunction) => {
    const key = randomBytes(8).toString("hex");
    const exp = Traverse.findParent(node, (n) => n.type === AST.ExportDefaultDeclaration);
    const isExportDefault = exp != null;
    const isExportDefaultDeclaration = exp != null && Extract.unwrap(exp.declaration) === node;
    const id = getFunctionComponentId(context, node);
    const name = id == null ? null : Extract.getFullyQualifiedName(id, getText);
    const initPath = getFunctionInitPath(node);
    const directives = getFunctionDirectives(node);
    const entry = {
      id,
      key,
      kind: "component",
      name,
      directives,
      displayName: null,
      flag: getFunctionComponentFlagFromInitPath(initPath),
      hint,
      hookCalls: [],
      initPath,
      isExportDefault,
      isExportDefaultDeclaration,
      isFunctionComponentDefinition: isFunctionComponentDefinition(context, node, hint),
      node,
      rets: [],
    } as const satisfies FunctionEntry;
    functionEntries.push(entry);
    if (!entry.isFunctionComponentDefinition || !isFunctionWithLooseComponentName(context, node, false)) return;
    if (directives.some((d) => d.directive === "use memo" || d.directive === "use no memo")) {
      components.set(entry.key, entry);
    }
  };
  const onFunctionExit = () => {
    return functionEntries.pop();
  };

  const api = {
    getAllComponents(_: TSESTree.Program) {
      return [...components.values()];
    },
  } as const;

  const visitor = {
    ":function": onFunctionEnter,
    ":function:exit": onFunctionExit,
    "ArrowFunctionExpression[body.type!='BlockStatement']"() {
      const entry = getCurrentEntry();
      if (entry == null) return;
      const { body } = entry.node;
      if (body.type === AST.BlockStatement) return;
      entry.rets.push(body);
      if (!entry.isFunctionComponentDefinition) return;
      if (!components.has(entry.key) && !isJsxLike(context, body, hint)) return;
      components.set(entry.key, entry);
    },
    ...collectDisplayName
      ? {
        [SEL_FUNCTION_DISPLAY_NAME_ASSIGNMENT](node: TSESTree.AssignmentExpression) {
          const { left, right } = node;
          if (left.type !== AST.MemberExpression) return;
          const componentName = left.object.type === AST.Identifier
            ? left.object.name
            : null;
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
      if (!entry.isFunctionComponentDefinition) return;
      components.set(entry.key, entry);
    },
    ReturnStatement(node: TSESTree.ReturnStatement) {
      const entry = getCurrentEntry();
      if (entry == null) return;
      entry.rets.push(node.argument);
      if (!entry.isFunctionComponentDefinition) return;
      const { argument } = node;
      if (!components.has(entry.key) && !isJsxLike(context, argument, hint)) return;
      components.set(entry.key, entry);
    },
  } as const satisfies ESLintUtils.RuleListener;
  return { api, visitor } as const;
}
