import { NodeType } from "@eslint-react/ast";
import { getPropValue } from "@eslint-react/jsx";
import { RE_JAVASCRIPT_PROTOCOL } from "@eslint-react/shared";
import { F, O, P } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-script-url";

export type MessageID = ConstantCase<typeof RULE_NAME>;

/**
 * This rule is adapted from eslint-plugin-solid's jsx-no-script-url rule under the MIT license.
 * Thank you for your work!
 */
export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow `javascript:` URLs as JSX event handler prop's value",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_SCRIPT_URL: "Don't use `javascript:` URLs as JSX event handler prop's value.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.type !== NodeType.JSXIdentifier || !node.value) {
          return;
        }

        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        const isJavaScript = F.pipe(
          getPropValue(node, context, initialScope),
          O.flatMapNullable(v => v?.value),
          O.filter(P.isString),
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
});
