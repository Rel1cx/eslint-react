import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../../utils/create-rule";
import { getNestedReturnStatements, isInsideNestedFunction } from "./lib";

export const RULE_NAME = "use-memo";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "noParameters"
  | "noAsyncOrGeneratorFunctions"
  | "noReassigningOuterVariables"
  | "mustReturnAValue"
  | "resultMustBeUsed";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates that 'useMemo' is called with a callback that returns a value.",
    },
    messages: {
      mustReturnAValue:
        "useMemo() callbacks must return a value.\n\nThis useMemo() callback doesn't return a value. useMemo() is for computing and caching values, not for arbitrary side effects.",
      noAsyncOrGeneratorFunctions:
        "useMemo() callbacks may not be async or generator functions.\n\nuseMemo() callbacks are called once and must synchronously return a value.",
      noParameters:
        "useMemo() callbacks may not accept parameters.\n\nuseMemo() callbacks are called by React to cache calculations across re-renders. They should not take parameters. Instead, directly reference the props, state, or local variables needed for the computation.",
      noReassigningOuterVariables:
        "useMemo() callbacks may not reassign variables declared outside of the callback.\n\nuseMemo() callbacks must be pure functions and cannot reassign variables defined outside of the callback function.",
      resultMustBeUsed:
        "useMemo() result is unused.\n\nThis useMemo() value is unused. useMemo() is for computing and caching values, not for arbitrary side effects.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  if (!context.sourceCode.text.includes("useMemo")) return {};

  function validateNoOuterVariableReassignment(callback: TSESTree.FunctionLike): ReportDescriptor<MessageID>[] {
    const violations: ReportDescriptor<MessageID>[] = [];
    const callbackScope = context.sourceCode.getScope(callback);
    const localVars = new Set(callbackScope.variables.map((v) => v.name));
    if (callback.body == null) return violations;
    simpleTraverse(callback.body, {
      enter(node) {
        if (node.type !== AST.AssignmentExpression) return;
        const left = Extract.unwrap(node.left);
        // Only flag direct variable reassignment (x = …), not property mutations (ref.current = …)
        // to match React Compiler's StoreContext semantics.
        if (left.type !== AST.Identifier) return;
        if (localVars.has(left.name)) return;
        if (isInsideNestedFunction(node, callback)) return;
        violations.push({
          messageId: "noReassigningOuterVariables",
          node: left,
        });
      },
    });
    return violations;
  }
  return merge({
    CallExpression(node) {
      if (!core.isUseMemoCall(context, node)) return;

      // Rule 5: Result must be used (not discarded)
      let parent = node.parent;
      while (Check.isTypeExpression(parent)) parent = parent.parent;
      const isAssigned = parent.type === AST.VariableDeclarator
        || parent.type === AST.AssignmentExpression
        || parent.type === AST.AssignmentPattern
        || parent.type === AST.Property
        || parent.type === AST.ReturnStatement
        || parent.type === AST.JSXExpressionContainer
        || parent.type === AST.CallExpression
        || parent.type === AST.NewExpression
        || parent.type === AST.ArrayExpression
        || parent.type === AST.ConditionalExpression
        || parent.type === AST.LogicalExpression
        || parent.type === AST.SequenceExpression
        || parent.type === AST.SpreadElement
        || parent.type === AST.TemplateLiteral
        || parent.type === AST.BinaryExpression
        || parent.type === AST.UnaryExpression
        || parent.type === AST.MemberExpression
        || parent.type === AST.TaggedTemplateExpression
        || parent.type === AST.ChainExpression
        || parent.type === AST.ArrowFunctionExpression
        || parent.type === AST.ForOfStatement
        || parent.type === AST.ForInStatement;

      if (!isAssigned) {
        context.report({
          messageId: "resultMustBeUsed",
          node,
        });
        return;
      }

      const [callbackArg] = node.arguments;
      if (callbackArg == null) return;
      const callback = Extract.unwrap(callbackArg);
      if (!Check.isFunction(callback)) return;

      // Rule 1: No Parameters — useMemo callbacks must not accept parameters
      if (callback.params.length > 0) {
        const firstParam = callback.params[0];
        if (firstParam == null) return;
        context.report({
          messageId: "noParameters",
          node: firstParam.type === AST.Identifier ? firstParam : callback,
        });
      }

      // Rule 2: No Async or Generator Functions — must synchronously return a value
      if (callback.async || callback.generator) {
        context.report({
          messageId: "noAsyncOrGeneratorFunctions",
          node: callback,
        });
      }

      // Rule 3: No Reassigning Outer Variables — must be pure
      for (const violation of validateNoOuterVariableReassignment(callback)) {
        context.report(violation);
      }

      // Rule 4: Must Return a Value — useMemo is for computing values, not side effects
      // Arrow functions with concise body always return a value
      if (callback.type === AST.ArrowFunctionExpression && callback.body.type !== AST.BlockStatement) {
        return;
      }

      const body = callback.body;
      if (body.type !== AST.BlockStatement) return;

      const returnStatements = getNestedReturnStatements(callback);
      if (returnStatements.length === 0) {
        context.report({
          messageId: "mustReturnAValue",
          node: callbackArg,
        });
        return;
      }

      const hasValueReturn = returnStatements.some((stmt) => stmt.argument != null);
      if (!hasValueReturn) {
        context.report({
          messageId: "mustReturnAValue",
          node: callbackArg,
        });
      }
    },
  });
}
