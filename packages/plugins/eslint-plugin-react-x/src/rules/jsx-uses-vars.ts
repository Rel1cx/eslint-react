import { O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-uses-vars";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "a helper rule to mark variables as used",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      jsxUsesVars: "",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function getName(node: TSESTree.Node): O.Option<string> {
      switch (node.type) {
        case AST_NODE_TYPES.JSXIdentifier:
          return O.some(node.name);
        case AST_NODE_TYPES.JSXMemberExpression:
          return getName(node.object);
        default:
          return O.none();
      }
    }
    return {
      JSXOpeningElement(node) {
        if (node.name.type === AST_NODE_TYPES.JSXIdentifier && /^[a-z]/u.test(node.name.name)) return;
        O.map(getName(node.name), (name) => {
          context.sourceCode.markVariableAsUsed(name, node);
        });
      },
    };
  },
  defaultOptions: [],
});
