import * as AST from "@eslint-react/ast";
import { isClassComponent, isCreateRefCall } from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-create-ref";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'createRef' in function components",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noCreateRef: "[Deprecated] Use 'useRef' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        if (!isCreateRefCall(node, context)) return;
        if (O.isSome(AST.traverseUp(node, isClassComponent))) return;
        context.report({ messageId: "noCreateRef", node });
      },
    };
  },
  defaultOptions: [],
});
