import { findPropInAttributes } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-dangerously-set-innerhtml";

export type MessageID = ConstantCase<typeof RULE_NAME>;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that use different properties to receive HTML and set them internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow when a DOM component is using 'dangerouslySetInnerHTML'",
    },
    messages: {
      NO_DANGEROUSLY_SET_INNERHTML: "Using 'dangerouslySetInnerHTML' may have security implications.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node) {
        const initialScope = context.sourceCode.getScope(node);
        const maybeDanger = findPropInAttributes(node.openingElement.attributes, context, initialScope)(
          "dangerouslySetInnerHTML",
        );
        if (O.isSome(maybeDanger)) {
          context.report({
            messageId: "NO_DANGEROUSLY_SET_INNERHTML",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
