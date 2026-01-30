import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-use-form-state";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'useFormState' with 'useActionState'.",
    },
    fixable: "code",
    messages: {
      noUseFormState: "[Deprecated] Use 'useActionState' from 'react' package instead.",
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

  // Keep track of 'react-dom' import names (e.g., 'ReactDOM')
  const reactDomNames = new Set<string>();
  // Keep track of local names for 'useFormState' import
  const useFormStateNames = new Set<string>();

  return {
    // This visitor function is called for every function call in the code
    CallExpression(node) {
      switch (true) {
        // Case 1: Direct call like `useFormState(...)`
        case node.callee.type === AST.Identifier
          && useFormStateNames.has(node.callee.name):
          context.report({
            messageId: "noUseFormState",
            node,
            fix: getFix(context, node),
          });
          return;
        // Case 2: Member call like `ReactDOM.useFormState(...)`
        case node.callee.type === AST.MemberExpression
          && node.callee.object.type === AST.Identifier
          && node.callee.property.type === AST.Identifier
          && node.callee.property.name === "useFormState"
          && reactDomNames.has(node.callee.object.name):
          context.report({
            messageId: "noUseFormState",
            node,
            fix: getFix(context, node),
          });
          return;
      }
    },
    // This visitor function is called for every import declaration
    ImportDeclaration(node) {
      const [baseSource] = node.source.value.split("/");
      // We are only interested in imports from 'react-dom'
      if (baseSource !== "react-dom") return;
      for (const specifier of node.specifiers) {
        switch (specifier.type) {
          // Handles: import { useFormState } from 'react-dom';
          case AST.ImportSpecifier:
            if (specifier.imported.type !== AST.Identifier) continue;
            if (specifier.imported.name === "useFormState") {
              useFormStateNames.add(specifier.local.name);
            }
            continue;
          // Handles: import ReactDOM from 'react-dom'; or import * as ReactDOM from 'react-dom';
          case AST.ImportDefaultSpecifier:
          case AST.ImportNamespaceSpecifier:
            reactDomNames.add(specifier.local.name);
            continue;
        }
      }
    },
  };
}

function getFix(context: RuleContext, node: TSESTree.CallExpression) {
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
