import { NodeType } from "@eslint-react/ast";
import { getPropValue } from "@eslint-react/jsx";
import { RE_JAVASCRIPT_PROTOCOL } from "@eslint-react/shared";
import type { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, Option as O, Predicate as Prd } from "effect";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-script-url";

export type MessageID = ConstantCase<typeof RULE_NAME>;

/**
 * This rule is adapted from eslint-plugin-solid's jsx-no-script-url rule under the MIT license.
 * Thank you for your work!
 */
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'javascript:' URLs as JSX event handler prop's value",
    },
    messages: {
      NO_SCRIPT_URL: "Using a `javascript:` URL is a security risk and should be avoided.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.type !== NodeType.JSXIdentifier || !node.value) return;
        const isJavaScript = F.pipe(
          getPropValue(node, context),
          O.flatMapNullable(v => v?.value),
          O.filter(Prd.isString),
          O.exists(v => RE_JAVASCRIPT_PROTOCOL.test(v)),
        );
        if (isJavaScript) {
          context.report({
            messageId: "NO_SCRIPT_URL",
            node: node.value,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
