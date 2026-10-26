import { createRule } from "@/utils/create-rule";
import { isReactDOMCall } from "@/utils/is-react-dom-call";
import { type RuleContext, type RuleFeature, type RuleFixer, type RuleListener } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { createImportLookup } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { compare } from "compare-versions";

export const RULE_NAME = "no-use-form-state";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'useFormState' with 'useActionState'.",
    },
    fixable: "code",
    messages: {
      default: "[Deprecated] Use 'useActionState' from 'react' package instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `useFormState` is not present in the file
  if (!context.sourceCode.text.includes("useFormState")) return {};

  // This rule only applies to React 19.0.0 and later
  const { importSource, version } = getSettingsFromContext(context);
  if (compare(version, "19.0.0", "<")) return {};

  // Lookup of local bindings imported from 'react-dom', used to match callees below.
  const imports = createImportLookup(context.sourceCode.ast, { source: "react-dom" });

  return {
    CallExpression(node) {
      if (!isReactDOMCall(node, imports, "useFormState")) {
        return;
      }
      context.report({
        fix: buildFix(context, node, importSource),
        messageId: "default",
        node,
      });
    },
  };
}

/**
 * Build the fix that replaces `useFormState` with `useActionState` from the configured import source.
 * @param context The rule context.
 * @param node The `useFormState` call expression.
 * @param importSource The configured React import source.
 * @returns A fixer function that adds the import and replaces the callee.
 */
function buildFix(context: RuleContext, node: TSESTree.CallExpression, importSource: string) {
  return (fixer: RuleFixer) => {
    // The fix consists of two parts:
    return [
      // 1. Add the new import for `useActionState`
      fixer.insertTextBefore(context.sourceCode.ast, `import { useActionState } from "${importSource}";\n`),
      // 2. Replace `useFormState` with `useActionState` in the function call
      fixer.replaceText(node.callee, "useActionState"),
    ];
  };
}
