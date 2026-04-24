import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../../utils";
import { getNestedReturnStatements } from "../no-missing-key/lib";

export const RULE_NAME = "use-memo";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "asyncOrGeneratorCallback"
  | "callbackWithParameters"
  | "missingReturnValue"
  | "notAssignedToVariable";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates that 'useMemo' is called with a callback that returns a value.",
    },
    messages: {
      asyncOrGeneratorCallback:
        "The callback passed to 'useMemo' must be a regular function. 'useMemo' callbacks are called synchronously by React and must immediately return a value. Async and generator functions are not supported.",
      callbackWithParameters:
        "The callback passed to 'useMemo' may not accept parameters. 'useMemo' callbacks are called by React without arguments. Instead, directly reference the props, state, or local variables needed for the computation.",
      missingReturnValue:
        "The callback passed to 'useMemo' must return a value. Without a return value, 'useMemo' always returns 'undefined', which defeats its purpose.",
      notAssignedToVariable:
        "The return value of 'useMemo' must be assigned to a variable. Calling 'useMemo' without capturing its return value is likely a mistake — use 'useEffect' for side effects instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `useMemo` is not present in the file
  if (!context.sourceCode.text.includes("useMemo")) return {};

  return merge({
    CallExpression(node) {
      if (!core.isUseMemoCall(context, node)) return;

      // Check if the useMemo call result is assigned to a variable.
      // Valid: const x = useMemo(...)
      // Invalid: useMemo(...) — result discarded (side-effect usage)
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
        || parent.type === AST.ArrowFunctionExpression;

      if (!isAssigned) {
        context.report({
          messageId: "notAssignedToVariable",
          node,
        });
        return;
      }

      // Check that the first argument (the factory callback) actually returns a value.
      const [callbackArg] = node.arguments;
      if (callbackArg == null) return;
      const callback = Extract.unwrap(callbackArg);
      if (!Check.isFunction(callback)) return;

      // useMemo callbacks may not accept parameters
      if (callback.params.length > 0) {
        const firstParam = callback.params[0];
        if (firstParam == null) return;
        context.report({
          messageId: "callbackWithParameters",
          node: firstParam.type === AST.Identifier ? firstParam : callback,
        });
      }

      // useMemo callbacks may not be async or generator functions
      if (callback.async || callback.generator) {
        context.report({
          messageId: "asyncOrGeneratorCallback",
          node: callback,
        });
      }

      // Arrow functions with a concise body always return a value (ex: `() => expr`)
      if (callback.type === AST.ArrowFunctionExpression && callback.body.type !== AST.BlockStatement) {
        return;
      }

      // For block-body functions, check that at least one return statement has a value
      const body = callback.body;
      if (body.type !== AST.BlockStatement) return;

      const returnStatements = getNestedReturnStatements(callbackArg);

      // If there are no return statements at all, the function implicitly returns undefined
      if (returnStatements.length === 0) {
        context.report({
          messageId: "missingReturnValue",
          node: callbackArg,
        });
        return;
      }

      // If every return statement lacks a value (bare `return;`), report the node
      const hasValueReturn = returnStatements.some((stmt) => stmt.argument != null);
      if (!hasValueReturn) {
        context.report({
          messageId: "missingReturnValue",
          node: callbackArg,
        });
      }
    },
  });
}
