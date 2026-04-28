import { Check, Extract } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, TSESTree } from "@typescript-eslint/types";

import { createRule } from "@/utils/create-rule";

export const RULE_NAME = "no-render-return-value";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

// Parent AST node types that indicate the return value of `ReactDOM.render` is being used
const banParentTypes = [
  AST.VariableDeclarator,
  AST.Property,
  AST.ReturnStatement,
  AST.ArrowFunctionExpression,
  AST.AssignmentExpression,
];

function isReturnValueUsed(node: TSESTree.CallExpression) {
  let parent = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;
  return banParentTypes.includes(parent.type);
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows the return value of 'ReactDOM.render'.",
    },
    messages: {
      default: "Do not depend on the return value from 'ReactDOM.render'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Sets to track imported names for 'ReactDOM' and 'render'
  const reactDomNames = new Set<string>(["ReactDOM", "ReactDOM"]);
  const renderNames = new Set<string>();

  return merge(
    {
      // Checks for calls to 'render' or 'ReactDOM.render' and reports if their return value is used
      CallExpression(node) {
        const callee = Extract.unwrap(node.callee);
        switch (true) {
          // Handles direct calls to 'render' (ex: from `import { render } from 'react-dom'`)
          case callee.type === AST.Identifier
            && renderNames.has(callee.name)
            // Check if the return value is being used
            && isReturnValueUsed(node):
            context.report({
              messageId: "default",
              node,
            });
            return;
          // Handles member expression calls like 'ReactDOM.render'
          case callee.type === AST.MemberExpression
            && callee.object.type === AST.Identifier
            && callee.property.type === AST.Identifier
            && callee.property.name === "render"
            && reactDomNames.has(callee.object.name)
            // Check if the return value is being used
            && isReturnValueUsed(node):
            context.report({
              messageId: "default",
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
            case AST.ImportSpecifier:
              if (specifier.imported.type !== AST.Identifier) continue;
              if (specifier.imported.name === "render") {
                renderNames.add(specifier.local.name);
              }
              continue;
            // Handles default or namespace imports like `import ReactDOM from 'react-dom'`
            case AST.ImportDefaultSpecifier:
            case AST.ImportNamespaceSpecifier:
              reactDomNames.add(specifier.local.name);
              continue;
          }
        }
      },
    },
  );
}
