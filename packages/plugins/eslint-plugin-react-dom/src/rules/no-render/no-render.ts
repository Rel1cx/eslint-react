import type { RuleContext, RuleFeature, RuleFixer } from "@eslint-react/shared";
import { defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { compare } from "compare-versions";

import { createRule } from "../../utils";

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
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `render` is not present in the file
  if (!context.sourceCode.text.includes("render")) return {};
  const settings = getSettingsFromContext(context);
  // This rule only applies to React 18.0.0 and later
  if (compare(settings.version, "18.0.0", "<")) return {};

  // Tracks imported names for ReactDOM, e.g., `ReactDOM` or `ReactDOM`.
  const reactDomNames = new Set<string>(["ReactDOM", "ReactDOM"]);
  // Tracks imported names for the `render` function
  const renderNames = new Set<string>();

  return defineRuleListener(
    {
      // Visitor for call expressions, e.g., render() or ReactDOM.render()
      CallExpression(node) {
        switch (true) {
          // Case 1: Direct call to 'render', e.g., from `import { render } from 'react-dom'`
          case node.callee.type === AST.Identifier
            && renderNames.has(node.callee.name):
            context.report({
              fix: getFix(context, node),
              messageId: "default",
              node,
            });
            return;
          // Case 2: Member expression call, e.g., `ReactDOM.render()`
          case node.callee.type === AST.MemberExpression
            && node.callee.object.type === AST.Identifier
            && node.callee.property.type === AST.Identifier
            && node.callee.property.name === "render"
            && reactDomNames.has(node.callee.object.name):
            context.report({
              fix: getFix(context, node),
              messageId: "default",
              node,
            });
            return;
        }
      },
      ImportDeclaration(node) {
        const [baseSource] = node.source.value.split("/");
        // Only consider imports from 'react-dom'
        if (baseSource !== "react-dom") return;
        for (const specifier of node.specifiers) {
          switch (specifier.type) {
            // Handles: import { render } from 'react-dom'
            case AST.ImportSpecifier:
              if (specifier.imported.type !== AST.Identifier) continue;
              if (specifier.imported.name === "render") {
                renderNames.add(specifier.local.name);
              }
              continue;
            // Handles: import ReactDOM from 'react-dom' or import * as ReactDOM from 'react-dom'
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

/**
 * Provides a fixer function to replace `render(app, container)` with `createRoot(container).render(app)`
 * @param context The rule context
 * @param node The `CallExpression` node to fix
 * @returns A fixer function or null if the fix cannot be applied
 */
function getFix(context: RuleContext, node: TSESTree.CallExpression) {
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  return (fixer: RuleFixer) => {
    // `render` takes two arguments: component and container
    const [arg0, arg1] = node.arguments;
    if (arg0 == null || arg1 == null) return null;
    return [
      // Add `import { createRoot } from "react-dom/client";` at the top of the file
      fixer.insertTextBefore(context.sourceCode.ast, 'import { createRoot } from "react-dom/client";\n'),
      // Replace `render(arg0, arg1)` with `createRoot(arg1).render(arg0)`
      fixer.replaceText(node, `createRoot(${getText(arg1)}).render(${getText(arg0)})`),
    ];
  };
}
