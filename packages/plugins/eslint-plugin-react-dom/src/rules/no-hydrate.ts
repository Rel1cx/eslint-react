import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-hydrate";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usages of `ReactDom.hydrate()` with `hydrateRoot()`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      noHydrate: "[Deprecated] Use 'hydrateRoot()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

const hydrate = "hydrate";

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `hydrate` is not present in the file
  if (!context.sourceCode.text.includes(hydrate)) return {};
  const settings = getSettingsFromContext(context);
  if (compare(settings.version, "18.0.0", "<")) return {};

  const reactDomNames = new Set<string>();
  const hydrateNames = new Set<string>();

  return {
    CallExpression(node) {
      switch (true) {
        case node.callee.type === T.Identifier
          && hydrateNames.has(node.callee.name):
          context.report({
            messageId: "noHydrate",
            node,
            fix: getFix(context, node),
          });
          return;
        case node.callee.type === T.MemberExpression
          && node.callee.object.type === T.Identifier
          && node.callee.property.type === T.Identifier
          && node.callee.property.name === hydrate
          && reactDomNames.has(node.callee.object.name):
          context.report({
            messageId: "noHydrate",
            node,
            fix: getFix(context, node),
          });
          return;
      }
    },
    ImportDeclaration(node) {
      const [baseSource] = node.source.value.split("/");
      if (baseSource !== "react-dom") return;
      for (const specifier of node.specifiers) {
        switch (specifier.type) {
          case T.ImportSpecifier:
            if (specifier.imported.type !== T.Identifier) continue;
            if (specifier.imported.name === hydrate) {
              hydrateNames.add(specifier.local.name);
            }
            continue;
          case T.ImportDefaultSpecifier:
          case T.ImportNamespaceSpecifier:
            reactDomNames.add(specifier.local.name);
            continue;
        }
      }
    },
  };
}

function getFix(context: RuleContext, node: TSESTree.CallExpression) {
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  return (fixer: RuleFixer) => {
    const [arg0, arg1] = node.arguments;
    if (arg0 == null || arg1 == null) return null;
    return [
      fixer.insertTextBefore(context.sourceCode.ast, 'import { hydrateRoot } from "react-dom/client";\n'),
      fixer.replaceText(node, `hydrateRoot(${getText(arg1)}, ${getText(arg0)})`),
    ];
  };
}
