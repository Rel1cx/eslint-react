import { is, NodeType } from "@eslint-react/ast";
import { findPropInAttributes } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-spreading-key";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow spreading `key` from objects.",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_SPREADING_KEY: "Do not spread `key` from objects.",
    },
  },
  defaultOptions: [],
  create(context) {
    function check(node: TSESTree.JSXOpeningElement): O.Option<ReportDescriptor<MessageID>> {
      const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();

      return F.pipe(
        findPropInAttributes(node.attributes, context, initialScope)("key"),
        O.filter(is(NodeType.JSXSpreadAttribute)),
        O.map((key) => ({
          messageId: "NO_SPREADING_KEY",
          node: key,
        })),
      );
    }

    return {
      JSXOpeningElement: F.flow(check, O.map(context.report)),
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
