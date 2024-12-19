import { isFragmentElement } from "@eslint-react/core";
import { F, O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-shorthand-fragment";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce using fragment syntax instead of 'Fragment' component",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      preferShorthandFragment: "Use fragment shorthand syntax instead of 'Fragment' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function getReportDescriptor(node: TSESTree.JSXElement): O.Option<ReportDescriptor<MessageID>> {
      if (!isFragmentElement(node, context)) return O.none();
      const hasAttributes = node.openingElement.attributes.length > 0;
      if (hasAttributes) return O.none();
      return O.some({
        messageId: "preferShorthandFragment",
        node,
      });
    }
    return {
      JSXElement: F.flow(getReportDescriptor, O.map(context.report)),
    };
  },
  defaultOptions: [],
});
