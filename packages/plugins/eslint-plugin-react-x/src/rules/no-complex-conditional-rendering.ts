import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-complex-conditional-rendering";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow complex conditional rendering",
    },
    messages: {
      noComplexConditionalRendering:
        "Avoid complex conditional rendering. Extract the logic into separate elements or components.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function getReportDescriptor(node: TSESTree.Node): O.Option<ReportDescriptor<MessageID>> {
      const jsxExpContainer = node.parent?.parent;
      if (!AST.is(AST_NODE_TYPES.JSXExpressionContainer)(jsxExpContainer)) return O.none();
      if (!AST.isOneOf([AST_NODE_TYPES.JSXElement, AST_NODE_TYPES.JSXFragment])(jsxExpContainer.parent)) {
        return O.none();
      }
      if (!jsxExpContainer.parent.children.includes(jsxExpContainer)) return O.none();
      return O.some({ messageId: "noComplexConditionalRendering", node: jsxExpContainer });
    }
    const ruleFunction = F.flow(getReportDescriptor, O.map(context.report), F.constVoid);
    return {
      "JSXExpressionContainer > ConditionalExpression > ConditionalExpression": ruleFunction,
      "JSXExpressionContainer > ConditionalExpression > LogicalExpression": ruleFunction,
      "JSXExpressionContainer > LogicalExpression > ConditionalExpression": ruleFunction,
      "JSXExpressionContainer > LogicalExpression[operator='&&'] > LogicalExpression[operator='||']": ruleFunction,
      "JSXExpressionContainer > LogicalExpression[operator='||'] > LogicalExpression[operator='&&']": ruleFunction,
    };
  },
  defaultOptions: [],
});
