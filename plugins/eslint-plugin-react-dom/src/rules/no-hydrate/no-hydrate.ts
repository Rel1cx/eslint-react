import { createRule } from "@/utils/create-rule";
import { Extract } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleFixer, merge } from "@eslint-react/eslint";
import { getSettingsFromContext } from "@eslint-react/shared";
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

  return merge(
    {
      CallExpression(node) {
        const callee = Extract.unwrap(node.callee);
        switch (true) {
          // Case 1: Direct call to `hydrate()`.
          case callee.type === AST.Identifier
            && hydrateNames.has(callee.name):
            context.report({
              fix: getFix(context, node),
              messageId: "default",
              node,
            });
            return;
          // Case 2: Call on a `react-dom` import, like `ReactDOM.hydrate()`
          case callee.type === AST.MemberExpression
            && callee.object.type === AST.Identifier
            && callee.property.type === AST.Identifier
            && callee.property.name === hydrate
            && reactDomNames.has(callee.object.name):
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
