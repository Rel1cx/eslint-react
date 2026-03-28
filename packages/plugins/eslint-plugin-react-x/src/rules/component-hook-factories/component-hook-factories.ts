import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import { createRule } from "../../utils";

export const RULE_NAME = "component-hook-factories";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "component"
  | "hook";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows higher order functions that define components or hooks inside them.",
    },
    messages: {
      component:
        "Do not define component '{{name}}' inside a function. Components should be defined at the module level. Move it to the top level.",
      hook:
        "Do not define hook '{{name}}' inside a function. Hooks should be defined at the module level. Move it to the top level.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

/**
 * Check if a function parameter name looks like a React component (PascalCase).
 */
function isComponentLikeParamName(name: string): boolean {
  return /^[A-Z]/.test(name);
}

/**
 * Check if a function parameter has a type annotation that looks like a React component type.
 * Matches types like ComponentType, React.ComponentType, FC, React.FC, etc.
 */
function hasComponentTypeAnnotation(param: TSESTree.Parameter): boolean {
  if (param.type !== AST.Identifier || param.typeAnnotation == null) return false;
  const annotation = param.typeAnnotation.typeAnnotation;
  // Check for direct references like ComponentType, FC, etc.
  if (annotation.type === AST.TSTypeReference) {
    return isComponentTypeName(annotation.typeName);
  }
  return false;
}

/**
 * Check if a type name refers to a known React component type.
 */
function isComponentTypeName(typeName: TSESTree.EntityName): boolean {
  if (typeName.type === AST.Identifier) {
    return /^(ComponentType|FC|ComponentClass|FunctionComponent|Component)$/.test(typeName.name);
  }
  // Handle qualified names like React.ComponentType, React.FC
  if (typeName.type === AST.TSQualifiedName) {
    if (typeName.left.type === AST.Identifier && typeName.left.name === "React") {
      return isComponentTypeName(typeName.right);
    }
  }
  return false;
}

/**
 * Check if a function is a Higher Order Component (HOC) - a function that takes
 * a component as a parameter and returns a new component.
 */
function isHigherOrderComponent(fn: ast.TSESTreeFunction): boolean {
  return fn.params.some((param) => {
    // Check for PascalCase parameter name (e.g., WrappedComponent, Component)
    if (param.type === AST.Identifier && isComponentLikeParamName(param.name)) {
      return true;
    }
    // Check for ComponentType/FC type annotation
    if (hasComponentTypeAnnotation(param)) {
      return true;
    }
    return false;
  });
}

/**
 * Check if a node is inside a test mock callback (vi.mock or jest.mock).
 */
function isInsideTestMockCallback(node: TSESTree.Node): boolean {
  return ast.findParent(node, ast.isTestMockCallback) != null;
}

export function create(context: RuleContext<MessageID, []>) {
  // Configuration hints to optimize component detection accuracy and performance
  const hint = core.ComponentDetectionHint.DoNotIncludeJsxWithNumberValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithBooleanValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithNullValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithStringValue
    | core.ComponentDetectionHint.DoNotIncludeJsxWithUndefinedValue
    | core.ComponentDetectionHint.RequireBothSidesOfLogicalExpressionToBeJsx
    | core.ComponentDetectionHint.RequireBothBranchesOfConditionalExpressionToBeJsx
    | core.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayPatternElement
    | core.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayExpressionElement
    | core.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsArrayMapCallback;

  // Collectors to find all component and hook definitions in the code
  const fCollector = core.getComponentCollector(context, { hint });
  const cCollector = core.getComponentCollectorLegacy(context);
  const hCollector = core.getHookCollector(context);

  // Track already-reported nodes to avoid duplicate reports
  const reported = new Set<ast.TSESTreeFunction>();

  return defineRuleListener(
    fCollector.visitor,
    cCollector.visitor,
    hCollector.visitor,
    {
      "Program:exit"(program) {
        // Gather all function components, class components, and hooks
        const fComponents = [...fCollector.api.getAllComponents(program)];
        const cComponents = [...cCollector.api.getAllComponents(program)];
        const hooks = [...hCollector.api.getAllHooks(program)];

        // Check function components defined inside any function (not at module level)
        for (const { name, node } of fComponents) {
          if (name == null) continue;
          const parentFn = ast.findParent(node, ast.isFunction);
          if (parentFn == null) continue;
          // Skip components inside test mock callbacks (vi.mock / jest.mock)
          if (isInsideTestMockCallback(node)) continue;
          // Skip components inside HOC definitions (functions that take a component as parameter)
          if (isHigherOrderComponent(parentFn as ast.TSESTreeFunction)) continue;
          if (reported.has(node)) continue;
          context.report({
            data: { name },
            messageId: "component",
            node,
          });
          reported.add(node);
        }

        // Check class components defined inside any function (not at module level)
        for (const { name = "unknown", node } of cComponents) {
          const parentFn = ast.findParent(node, ast.isFunction);
          if (parentFn == null) continue;
          // Skip components inside test mock callbacks (vi.mock / jest.mock)
          if (isInsideTestMockCallback(node)) continue;
          // Skip components inside HOC definitions
          if (isHigherOrderComponent(parentFn as ast.TSESTreeFunction)) continue;
          context.report({
            data: { name },
            messageId: "component",
            node,
          });
        }

        // Check hooks defined inside any function (not at module level)
        for (const { name, node } of hooks) {
          const parentFn = ast.findParent(node, ast.isFunction);
          if (parentFn == null) continue;
          // Skip hooks inside test mock callbacks (vi.mock / jest.mock)
          if (isInsideTestMockCallback(node)) continue;
          if (reported.has(node)) continue;
          context.report({
            data: { name },
            messageId: "hook",
            node,
          });
          reported.add(node);
        }
      },
    },
  );
}
