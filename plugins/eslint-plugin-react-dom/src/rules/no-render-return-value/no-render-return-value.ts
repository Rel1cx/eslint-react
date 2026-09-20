import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext, RuleFeature, RuleListener } from "@eslint-react/eslint";
import { createImportLookup } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, TSESTree } from "@typescript-eslint/types";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Track local binding names of imports from 'react-dom', with 'ReactDOM' as a builtin namespace binding.
  const imports = createImportLookup(context.sourceCode.ast, {
    source: "react-dom",
    builtinNamespaces: ["ReactDOM"],
  });

  return {
    // Checks for calls to 'render' or 'ReactDOM.render' and reports if their return value is used
    CallExpression(node) {
      const callee = Extract.unwrap(node.callee);
      switch (true) {
        // Handles direct calls to 'render' (ex: from `import { render } from 'react-dom'`)
        case Check.isIdentifier(callee)
          && imports.has(callee.name, "render")
          // Check if the return value is being used
          && isReturnValueUsed(node):
          context.report({
            messageId: "default",
            node,
          });
          return;
        // Handles member expression calls like 'ReactDOM.render'
        case callee.type === AST.MemberExpression
          && Check.isIdentifier(callee.object)
          && Extract.getCalleeName(node) === "render"
          && imports.hasNamespace(callee.object.name)
          // Check if the return value is being used
          && isReturnValueUsed(node):
          context.report({
            messageId: "default",
            node,
          });
          return;
      }
    },
  };
}
