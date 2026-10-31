import { createRule } from "@/utils/create-rule";
import { isReactDOMCall } from "@/utils/is-react-dom-call";
import { type RuleContext, type RuleFeature, type RuleFixer, type RuleListener, getText } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { createImportLookup } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { compare } from "compare-versions";

export const RULE_NAME = "no-render";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'ReactDOM.render()' with 'createRoot(node).render()'.",
    },
    fixable: "code",
    messages: {
      default: "[Deprecated] Use 'createRoot(node).render()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `render` is not present in the file
  if (!context.sourceCode.text.includes("render")) return {};

  // This rule only applies to React 18.0.0 and later
  const { version } = getSettingsFromContext(context);
  if (compare(version, "18.0.0", "<")) return {};

  // Lookup of local bindings imported from 'react-dom', with the 'ReactDOM' global pre-registered as a namespace binding.
  const imports = createImportLookup(context.sourceCode.ast, {
    builtinNamespaces: ["ReactDOM"],
    source: "react-dom",
  });

  return {
    CallExpression(node) {
      if (!isReactDOMCall(node, imports, "render")) {
        return;
      }
      context.report({
        fix: buildFix(context, node),
        messageId: "default",
        node,
      });
    },
  };
}

/**
 * Build the fix that replaces `render(element, container)` with `createRoot(container).render(element)`.
 * @param context The rule context.
 * @param node The `render` call expression.
 * @returns A fixer function that returns `null` unless the call is a standalone expression with exactly two non-spread arguments.
 */
function buildFix(context: RuleContext, node: TSESTree.CallExpression) {
  return (fixer: RuleFixer) => {
    const [arg0, arg1] = node.arguments;
    if (arg0 == null) return null;
    if (arg1 == null) return null;
    if (node.arguments.length !== 2) return null;
    if (arg0.type === AST.SpreadElement) return null;
    if (arg1.type === AST.SpreadElement) return null;
    if (node.parent.type !== AST.ExpressionStatement) return null;
    // The fix consists of two parts:
    return [
      // 1. Add the new import for `createRoot`
      fixer.insertTextBefore(context.sourceCode.ast, 'import { createRoot } from "react-dom/client";\n'),
      // 2. Replace `render(element, container)` with `createRoot(container).render(element)`; note that the arguments are swapped
      fixer.replaceText(node, `createRoot(${getText(context, arg1)}).render(${getText(context, arg0)})`),
    ];
  };
}
