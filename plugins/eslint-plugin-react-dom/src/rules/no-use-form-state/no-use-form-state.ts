import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext, RuleFeature, RuleFixer, RuleListener } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { createImportLookup } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
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
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `useFormState` is not present in the file
  if (!context.sourceCode.text.includes("useFormState")) return {};
  const settings = getSettingsFromContext(context);
  // This rule only applies to React 19.0.0 and above
  if (compare(settings.version, "19.0.0", "<")) return {};

  // Track local binding names of imports from 'react-dom'.
  const imports = createImportLookup(context.sourceCode.ast, { source: "react-dom" });

  return {
    // This visitor function is called for every function call in the code
    CallExpression(node) {
      const callee = Extract.unwrap(node.callee);
      switch (true) {
        // Case 1: Direct call like `useFormState(...)`
        case Check.isIdentifier(callee)
          && imports.has(callee.name, "useFormState"):
          context.report({
            fix: buildFix(context, node),
            messageId: "default",
            node,
          });
          return;
        // Case 2: Member call like `ReactDOM.useFormState(...)`
        case callee.type === AST.MemberExpression
          && Check.isIdentifier(callee.object)
          && Extract.getCalleeName(node) === "useFormState"
          && imports.hasNamespace(callee.object.name):
          context.report({
            fix: buildFix(context, node),
            messageId: "default",
            node,
          });
          return;
      }
    },
  };
}

function buildFix(context: RuleContext, node: TSESTree.CallExpression) {
  const { importSource } = getSettingsFromContext(context);
  return (fixer: RuleFixer) => {
    // The fix consists of two parts:
    return [
      // 1. Add `import { useActionState } from "react";` at the top of the file
      fixer.insertTextBefore(context.sourceCode.ast, `import { useActionState } from "${importSource}";\n`),
      // 2. Replace `useFormState` with `useActionState` in the function call
      fixer.replaceText(node.callee, "useActionState"),
    ];
  };
}
