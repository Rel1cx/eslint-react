import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-render-return-value";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// Parent AST node types that indicate the return value of `ReactDOM.render` is being used
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
  // Sets to track imported names for 'ReactDOM' and 'render'
  const reactDomNames = new Set<string>(["ReactDOM", "ReactDom"]);
  const renderNames = new Set<string>();

  return {
    // Checks for calls to 'render' or 'ReactDOM.render' and reports if their return value is used
    CallExpression(node) {
      switch (true) {
        // Handles direct calls to 'render' (e.g., from `import { render } from 'react-dom'`)
        case node.callee.type === T.Identifier
          && renderNames.has(node.callee.name)
          // Check if the return value is being used
          && banParentTypes.includes(node.parent.type):
          context.report({
            messageId: "noRenderReturnValue",
            node,
          });
          return;
        // Handles member expression calls like 'ReactDOM.render'
        case node.callee.type === T.MemberExpression
          && node.callee.object.type === T.Identifier
          && node.callee.property.type === T.Identifier
          && node.callee.property.name === "render"
          && reactDomNames.has(node.callee.object.name)
          // Check if the return value is being used
          && banParentTypes.includes(node.parent.type):
          context.report({
            messageId: "noRenderReturnValue",
            node,
          });
          return;
      }
    },
    // Tracks imports from 'react-dom' to identify 'ReactDOM' and 'render' related identifiers
    ImportDeclaration(node) {
      // Check if the import source is 'react-dom' or 'react-dom/client'
      const [baseSource] = node.source.value.split("/");
      if (baseSource !== "react-dom") return;
      for (const specifier of node.specifiers) {
        switch (specifier.type) {
          // Handles named imports like `import { render } from 'react-dom'`
          case T.ImportSpecifier:
            if (specifier.imported.type !== T.Identifier) continue;
            if (specifier.imported.name === "render") {
              renderNames.add(specifier.local.name);
            }
            continue;
          // Handles default or namespace imports like `import ReactDOM from 'react-dom'`
          case T.ImportDefaultSpecifier:
          case T.ImportNamespaceSpecifier:
            reactDomNames.add(specifier.local.name);
            continue;
        }
      }
    },
  };
}
