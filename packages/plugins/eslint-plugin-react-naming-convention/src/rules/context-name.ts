import * as AST from "@eslint-react/ast";
import { isCreateContextCall } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "context-name";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce context name to end with `Context`.",
    },
    messages: {
      contextName: "Context name must end with `Context`.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("createContext")) return {};
    return {
      CallExpression(node) {
        if (!isCreateContextCall(context, node)) return;
        const id = VAR.getVariableId(node);
        if (id == null) return;
        const name = context.sourceCode.getText(AST.getEcmaExpression(id));
        if (name.endsWith("Context")) return;
        context.report({
          messageId: "contextName",
          node: id,
        });
      },
    };
  },
  defaultOptions: [],
});
