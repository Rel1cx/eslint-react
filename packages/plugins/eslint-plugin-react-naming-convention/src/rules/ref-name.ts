import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { findEnclosingAssignmentTarget } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
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
      description: "Enforces identifier names assigned from 'useRef' calls to be either 'ref' or end with 'Ref'.",
    },
    messages: {
      invalidRefName: "A ref identifier must be named 'ref' or ending in 'Ref'.",
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
      if (!core.isUseRefCall(node)) return;
      // https://github.com/Rel1cx/eslint-react/issues/1375
      if (ast.getUnderlyingExpression(node.parent).type === AST.MemberExpression) return;
      const [id, name] = match(findEnclosingAssignmentTarget(node))
        // for cases like: const inputRef = useRef();
        .with({ type: AST.Identifier, name: P.string }, (id) => [id, id.name] as const)
        // for cases like: refs.inputRef = useRef();
        .with({ type: AST.MemberExpression, property: { name: P.string } }, (id) => [id, id.property.name] as const)
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
