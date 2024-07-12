import { is, NodeType } from "@eslint-react/ast";
import { findPropInAttributes } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-implicit-key";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    deprecated: true,
    docs: {
      description: "disallow spreading 'key' from objects.",
    },
    messages: {
      NO_IMPLICIT_KEY: "Prefer specifying key explicitly instead of spreading it from object.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function check(node: TSESTree.JSXOpeningElement): O.Option<ReportDescriptor<MessageID>> {
      const initialScope = context.sourceCode.getScope(node);

      return F.pipe(
        findPropInAttributes(node.attributes, context, initialScope)("key"),
        O.filter(is(NodeType.JSXSpreadAttribute)),
        O.map((key) => ({
          messageId: "NO_IMPLICIT_KEY",
          node: key,
        })),
      );
    }

    return {
      JSXOpeningElement: F.flow(check, O.map(context.report)),
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
