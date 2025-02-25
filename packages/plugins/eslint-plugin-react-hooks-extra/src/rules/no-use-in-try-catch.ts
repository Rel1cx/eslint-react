import * as AST from "@eslint-react/ast";
import { isUseCall } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-use-in-try-catch";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow 'use' in try-catch block",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUseInTryCatch:
        "'use' cannot be called in a try-catch block. Instead of a try-catch block wrap your component in an Error Boundary, or provide an alternative value to use with the Promise’s '.catch' method.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("try")) return {};
    return {
      CallExpression(node) {
        if (!isUseCall(context, node)) return;
        const tryCatchOrFunction = AST.findParentNode(node, (n) => {
          return n.type === T.TryStatement || AST.isFunction(n);
        });
        if (tryCatchOrFunction?.type === T.TryStatement) {
          context.report({
            messageId: "noUseInTryCatch",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
