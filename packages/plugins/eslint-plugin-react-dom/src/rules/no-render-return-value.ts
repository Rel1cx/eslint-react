import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-render-return-value";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const banParentTypes = [
  T.VariableDeclarator,
  T.Property,
  T.ReturnStatement,
  T.ArrowFunctionExpression,
  T.AssignmentExpression,
];

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow the return value of `ReactDOM.render`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noRenderReturnValue: "Do not depend on the return value from 'ReactDOM.render'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const reactDomNames = new Set<string>(["ReactDOM", "ReactDom"]);
  const renderNames = new Set<string>();

  return {
    CallExpression(node) {
      switch (true) {
        case node.callee.type === T.Identifier
          && renderNames.has(node.callee.name)
          && banParentTypes.includes(node.parent.type):
          context.report({
            messageId: "noRenderReturnValue",
            node,
          });
          return;
        case node.callee.type === T.MemberExpression
          && node.callee.object.type === T.Identifier
          && node.callee.property.type === T.Identifier
          && node.callee.property.name === "render"
          && reactDomNames.has(node.callee.object.name)
          && banParentTypes.includes(node.parent.type):
          context.report({
            messageId: "noRenderReturnValue",
            node,
          });
          return;
      }
    },
    ImportDeclaration(node) {
      const [baseSource] = node.source.value.split("/");
      if (baseSource !== "react-dom") return;
      for (const specifier of node.specifiers) {
        switch (specifier.type) {
          case T.ImportSpecifier:
            if (specifier.imported.type !== T.Identifier) continue;
            if (specifier.imported.name === "render") {
              renderNames.add(specifier.local.name);
            }
            continue;
          case T.ImportDefaultSpecifier:
          case T.ImportNamespaceSpecifier:
            reactDomNames.add(specifier.local.name);
            continue;
        }
      }
    },
  };
}
