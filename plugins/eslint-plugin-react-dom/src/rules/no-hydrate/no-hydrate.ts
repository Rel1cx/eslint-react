import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import type { RuleContext, RuleFeature, RuleFixer, RuleListener } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { createImportLookup } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { compare } from "compare-versions";

export const RULE_NAME = "no-hydrate";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'ReactDOM.hydrate()' with 'hydrateRoot()'.",
    },
    fixable: "code",
    messages: {
      default: "[Deprecated] Use 'hydrateRoot()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `hydrate` is not present in the file
  if (!context.sourceCode.text.includes("hydrate")) return {};
  const settings = getSettingsFromContext(context);
  // This rule only applies to React 18.0.0 and later.
  if (compare(settings.version, "18.0.0", "<")) return {};

  // Track local binding names of imports from 'react-dom'.
  const imports = createImportLookup(context.sourceCode.ast, { source: "react-dom" });

  return {
    CallExpression(node) {
      const callee = Extract.unwrap(node.callee);
      switch (true) {
        // Case 1: Direct call to `hydrate()`.
        case Check.isIdentifier(callee)
          && imports.has(callee.name, "hydrate"):
          context.report({
            fix: buildFix(context, node),
            messageId: "default",
            node,
          });
          return;
        // Case 2: Call on a `react-dom` import, like `ReactDOM.hydrate()`
        case callee.type === AST.MemberExpression
          && Check.isIdentifier(callee.object)
          && Extract.getCalleeName(node) === "hydrate"
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
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  return (fixer: RuleFixer) => {
    const [arg0, arg1] = node.arguments;
    if (arg0 == null || arg1 == null) return null;
    // The fix consists of two parts:
    return [
      // 1. Add the new import for `hydrateRoot`
      fixer.insertTextBefore(context.sourceCode.ast, 'import { hydrateRoot } from "react-dom/client";\n'),
      // 2. Replace `hydrate(element, container)` with `hydrateRoot(container, element)`
      // Note that the arguments are swapped
      fixer.replaceText(node, `hydrateRoot(${getText(arg1)}, ${getText(arg0)})`),
    ];
  };
}
