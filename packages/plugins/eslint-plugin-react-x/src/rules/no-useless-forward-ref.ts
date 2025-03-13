// Ported from https://github.com/jsx-eslint/eslint-plugin-react/pull/3667
import * as AST from "@eslint-react/ast";
import { isForwardRefCall } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-forward-ref";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "require a 'ref' parameter to be set when using 'forwardRef'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUselessForwardRef: "A 'forwardRef' is used with this component but no 'ref' parameter is set.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (!isForwardRefCall(context, node)) {
          return;
        }
        const [component] = node.arguments;
        if (component == null || !AST.isFunction(component)) {
          return;
        }
        const ref = component.params[1];
        if (ref != null) {
          return;
        }
        context.report({
          messageId: "noUselessForwardRef",
          node: component,
        });
      },
    };
  },
  defaultOptions: [],
});
