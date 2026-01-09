import * as AST from "@eslint-react/ast";
import { getInstanceId, isUseRefCall } from "@eslint-react/core";
import { type RuleContext, type RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { P, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "ref-name";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "invalidRefName";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforces variable names assigned from 'useRef' calls to be either 'ref' or end with 'Ref'.",
    },
    messages: {
      invalidRefName: "Ref variables should have names ending with 'Ref', e.g., 'inputRef'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("useRef")) return {};
  return {
    CallExpression(node: TSESTree.CallExpression) {
      if (!isUseRefCall(node)) return;
      // https://github.com/Rel1cx/eslint-react/issues/1375
      if (AST.getUnderlyingExpression(node.parent).type === T.MemberExpression) return;
      const [id, name] = match(getInstanceId(node))
        // for cases like: const inputRef = useRef();
        .with({ type: T.Identifier, name: P.string }, (id) => [id, id.name] as const)
        // for cases like: refs.inputRef = useRef();
        .with({ type: T.MemberExpression, property: { name: P.string } }, (id) => [id, id.property.name] as const)
        .otherwise(() => [null, null] as const);
      if (id == null) return;
      if (name.endsWith("Ref") || name === "ref") return;
      context.report({
        messageId: "invalidRefName",
        node: id,
      });
    },
  };
}
