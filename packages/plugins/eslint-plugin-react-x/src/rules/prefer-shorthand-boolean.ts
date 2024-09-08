import * as JSX from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-shorthand-boolean";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce using shorthand boolean attributes",
    },
    messages: {
      preferShorthandBoolean: "Use shorthand boolean attribute '{{propName}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function getReportDescriptor(node: TSESTree.JSXAttribute): O.Option<ReportDescriptor<MessageID>> {
      const { value } = node;
      const propName = JSX.getPropName(node);
      const hasValueTrue = value?.type === AST_NODE_TYPES.JSXExpressionContainer
        && value.expression.type === AST_NODE_TYPES.Literal
        && value.expression.value === true;
      if (!hasValueTrue) return O.none();
      return O.some({
        messageId: "preferShorthandBoolean",
        node,
        data: {
          propName,
        },
      });
    }
    return {
      JSXAttribute: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
