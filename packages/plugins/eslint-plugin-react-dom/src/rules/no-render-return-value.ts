import * as AST from "@eslint-react/ast";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-render-return-value";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const banParentTypes = [
  T.VariableDeclarator,
  T.Property,
  T.ReturnStatement,
  T.ArrowFunctionExpression,
  T.AssignmentExpression,
] as const;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow usage of the return value of 'ReactDOM.render'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noRenderReturnValue: "Do not depend on the return value from '{{objectName}}.render'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      CallExpression(node) {
        const { callee, parent } = node;
        if (callee.type !== T.MemberExpression) return;
        if (callee.object.type !== T.Identifier) return;
        if (!("name" in callee.object)) return;
        const objectName = callee.object.name;
        if (
          objectName.toLowerCase() !== "reactdom"
          || callee.property.type !== T.Identifier
          || callee.property.name !== "render"
          || !AST.isOneOf(banParentTypes)(parent)
        ) {
          return;
        }
        context.report({
          messageId: "noRenderReturnValue",
          node,
          data: {
            objectName,
          },
        });
      },
    };
  },
  defaultOptions: [],
});
