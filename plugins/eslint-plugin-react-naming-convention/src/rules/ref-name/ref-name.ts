import { Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { resolveEnclosingAssignmentTarget } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { P, match } from "ts-pattern";

import { createRule } from "../../utils/create-rule";

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

export function create(context: RuleContext<MessageID, []>) {
  if (!context.sourceCode.text.includes("useRef")) return {};
  return merge(
    {
      CallExpression(node: TSESTree.CallExpression) {
        if (!core.isUseRefCall(context, node)) return;
        // https://github.com/Rel1cx/eslint-react/issues/1375
        if (Extract.unwrap(node.parent).type === AST.MemberExpression) return;
        const [id, name] = match(resolveEnclosingAssignmentTarget(node))
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
    },
  );
}
