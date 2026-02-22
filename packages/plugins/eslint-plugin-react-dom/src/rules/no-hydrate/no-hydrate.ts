import type { RuleContext, RuleFeature, RuleFixer } from "@eslint-react/shared";
import { defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { compare } from "compare-versions";

import { createRule } from "../../utils";

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

const hydrate = "hydrate";

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `hydrate` is not present in the file
  if (!context.sourceCode.text.includes(hydrate)) return {};
  const settings = getSettingsFromContext(context);
  // This rule only applies to React 18.0.0 and later.
  if (compare(settings.version, "18.0.0", "<")) return {};

  // Keep track of imports from 'react-dom'.
  const reactDomNames = new Set<string>(); // For `import ReactDOM from 'react-dom'`
  const hydrateNames = new Set<string>(); // For `import { hydrate } from 'react-dom'`

  return defineRuleListener(
    {
      CallExpression(node) {
        switch (true) {
          // Case 1: Direct call to `hydrate()`.
          case node.callee.type === AST.Identifier
            && hydrateNames.has(node.callee.name):
            context.report({
              messageId: "default",
              node,
              fix: getFix(context, node),
            });
            return;
          // Case 2: Call on a `react-dom` import, like `ReactDOM.hydrate()`
          case node.callee.type === AST.MemberExpression
            && node.callee.object.type === AST.Identifier
            && node.callee.property.type === AST.Identifier
            && node.callee.property.name === hydrate
            && reactDomNames.has(node.callee.object.name):
            context.report({
              messageId: "default",
              node,
              fix: getFix(context, node),
            });
            return;
        }
      },
      ImportDeclaration(node) {
        const [baseSource] = node.source.value.split("/");
        // We only care about imports from 'react-dom'
        if (baseSource !== "react-dom") return;
        for (const specifier of node.specifiers) {
          switch (specifier.type) {
            // `import { hydrate } from 'react-dom'`
            case AST.ImportSpecifier:
              if (specifier.imported.type !== AST.Identifier) continue;
              if (specifier.imported.name === hydrate) {
                hydrateNames.add(specifier.local.name);
              }
              continue;
            // `import ReactDOM from 'react-dom'` or `import * as ReactDOM from 'react-dom'`
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

function getFix(context: RuleContext, node: TSESTree.CallExpression) {
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
