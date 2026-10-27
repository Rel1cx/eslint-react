import { createRule } from "@/utils/create-rule";
import { isReactDOMCall } from "@/utils/is-react-dom-call";
import { type RuleContext, type RuleFeature, type RuleFixer, type RuleListener, getText } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
import { createImportLookup } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
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
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `hydrate` is not present in the file
  if (!context.sourceCode.text.includes("hydrate")) return {};

  // This rule only applies to React 18.0.0 and later
  const { version } = getSettingsFromContext(context);
  if (compare(version, "18.0.0", "<")) return {};

  // Lookup of local bindings imported from 'react-dom', used to match callees below.
  const imports = createImportLookup(context.sourceCode.ast, { source: "react-dom" });

  return {
    CallExpression(node) {
      if (!isReactDOMCall(node, imports, "hydrate")) {
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
 * Build the fix that replaces `hydrate(element, container)` with `hydrateRoot(container, element)`.
 * @param context The rule context.
 * @param node The `hydrate` call expression.
 * @returns A fixer function, or `null` when the call lacks the required arguments.
 */
function buildFix(context: RuleContext, node: TSESTree.CallExpression) {
  return (fixer: RuleFixer) => {
    const [arg0, arg1] = node.arguments;
    if (arg0 == null || arg1 == null) return null;
    // The fix consists of two parts:
    return [
      // 1. Add the new import for `hydrateRoot`
      fixer.insertTextBefore(context.sourceCode.ast, 'import { hydrateRoot } from "react-dom/client";\n'),
      // 2. Replace `hydrate(element, container)` with `hydrateRoot(container, element)`; note that the arguments are swapped
      fixer.replaceText(node, `hydrateRoot(${getText(context, arg1)}, ${getText(context, arg0)})`),
    ];
  };
}
