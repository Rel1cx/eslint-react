import * as JSX from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "avoid-shorthand-boolean";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using shorthand boolean attributes",
    },
    fixable: "code",
    messages: {
      avoidShorthandBoolean:
        "Avoid using shorthand boolean attribute '{{propName}}'. Use '{{propName}}={true}' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function getReportDescriptor(node: TSESTree.JSXAttribute): O.Option<ReportDescriptor<MessageID>> {
      return node.value
        ? O.none()
        : O.some({
          messageId: "avoidShorthandBoolean",
          node,
          data: {
            propName: JSX.getPropName(node),
          },
          fix: (fixer) => fixer.insertTextAfter(node.name, `={true}`),
        });
    }
    return {
      JSXAttribute: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
