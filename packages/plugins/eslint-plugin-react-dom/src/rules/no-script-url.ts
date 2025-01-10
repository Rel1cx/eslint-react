import * as JSX from "@eslint-react/jsx";
import { RE_JAVASCRIPT_PROTOCOL } from "@eslint-react/shared";
import type { RuleFeature } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-script-url";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

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
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
        if (node.name.type !== T.JSXIdentifier || node.value == null) {
          return;
        }
        const propScope = context.sourceCode.getScope(node);
        const propValue = JSX.getPropValue(node, propScope);
        const propValueResolved = VAR.toResolved(propValue).value;
        if (typeof propValueResolved !== "string") return;
        if (RE_JAVASCRIPT_PROTOCOL.test(propValueResolved)) {
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
