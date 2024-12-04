import * as JSX from "@eslint-react/jsx";
import { RE_JAVASCRIPT_PROTOCOL } from "@eslint-react/shared";
import { F, isString, O } from "@eslint-react/tools";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-script-url";

export type MessageID = CamelCase<typeof RULE_NAME>;

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
      noScriptUrl: "Using a `javascript:` URL is a security risk and should be avoided.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.type !== AST_NODE_TYPES.JSXIdentifier || !node.value) return;
        const isJavaScript = F.pipe(
          JSX.getPropValue(node, context.sourceCode.getScope(node)),
          O.filter(isString),
          O.exists(v => RE_JAVASCRIPT_PROTOCOL.test(v)),
        );
        if (isJavaScript) {
          context.report({
            messageId: "noScriptUrl",
            node: node.value,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
