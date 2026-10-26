import { createRule } from "@/utils/create-rule";
import { isReactDOMCall } from "@/utils/is-react-dom-call";
import { Check } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { createImportLookup } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-render-return-value";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

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
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `render` is not present in the file
  if (!context.sourceCode.text.includes("render")) return {};

  // Lookup of local bindings imported from 'react-dom', with the 'ReactDOM' global pre-registered as a namespace binding.
  const imports = createImportLookup(context.sourceCode.ast, {
    builtinNamespaces: ["ReactDOM"],
    source: "react-dom",
  });

  return {
    CallExpression(node) {
      if (!isReactDOMCall(node, imports, "render") || !isReturnValueUsed(node)) {
        return;
      }
      context.report({
        messageId: "default",
        node,
      });
    },
  };
}

// Parent AST node types that indicate the return value of `ReactDOM.render` is being used
const BANNED_PARENT_TYPES = [
  AST.VariableDeclarator,
  AST.Property,
  AST.ReturnStatement,
  AST.ArrowFunctionExpression,
  AST.AssignmentExpression,
];

/**
 * Check whether the return value of a `render` call is used by its parent.
 * @param node The `render` call expression to check.
 * @returns `true` if the call's parent uses its return value.
 */
function isReturnValueUsed(node: TSESTree.CallExpression) {
  let parent = node.parent;
  while (Check.isTypeExpression(parent)) parent = parent.parent;
  return BANNED_PARENT_TYPES.includes(parent.type);
}
