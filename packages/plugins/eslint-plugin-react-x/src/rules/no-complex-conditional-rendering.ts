import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-complex-conditional-rendering";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow complex conditional rendering",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
      if (!AST.is(T.JSXExpressionContainer)(jsxExpContainer)) return O.none();
      if (!AST.isOneOf([T.JSXElement, T.JSXFragment])(jsxExpContainer.parent)) {
        return O.none();
      }
      if (!jsxExpContainer.parent.children.includes(jsxExpContainer)) return O.none();
      return O.some({ messageId: "noComplexConditionalRendering", node: jsxExpContainer });
    }
    const visitorFunction = F.flow(getReportDescriptor, O.map(context.report), F.constVoid);
    return {
      "JSXExpressionContainer > ConditionalExpression > ConditionalExpression": visitorFunction,
      "JSXExpressionContainer > ConditionalExpression > LogicalExpression": visitorFunction,
      "JSXExpressionContainer > LogicalExpression > ConditionalExpression": visitorFunction,
      "JSXExpressionContainer > LogicalExpression[operator='&&'] > LogicalExpression[operator='||']": visitorFunction,
      "JSXExpressionContainer > LogicalExpression[operator='||'] > LogicalExpression[operator='&&']": visitorFunction,
    };
  },
  defaultOptions: [],
});
