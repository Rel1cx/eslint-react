import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleFixer } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";

import type { RuleContext } from "../../../../shared/src/types";
import { createRule } from "../utils";

export const RULE_NAME = "no-render";

export const RULE_FEATURES = [
  "CHK",
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "replace usages of 'ReactDom.render()' with 'createRoot(node).render()'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      noRender: "[Deprecated] Use 'createRoot(node).render()' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("render")) return {};
    const settings = getSettingsFromContext(context);
    if (compare(settings.version, "19.0.0", "<")) {
      return {};
    }
    const reactDomNames = new Set<string>();
    const renderNames = new Set<string>();

    return {
      CallExpression(node) {
        switch (true) {
          case node.callee.type === T.Identifier
            && renderNames.has(node.callee.name):
            context.report({
              messageId: "noRender",
              node,
              fix: getFix(context, node),
            });
            return;
          case node.callee.type === T.MemberExpression
            && node.callee.object.type === T.Identifier
            && reactDomNames.has(node.callee.object.name)
            && node.callee.property.type === T.Identifier
            && node.callee.property.name === "render":
            context.report({
              messageId: "noRender",
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
              if (specifier.imported.name === "render") {
                renderNames.add(specifier.local.name);
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
  },
  defaultOptions: [],
});

function getFix(context: RuleContext, node: TSESTree.CallExpression) {
  const getText = (n: TSESTree.Node) => context.sourceCode.getText(n);
  return (fixer: RuleFixer) => {
    const [arg0, arg1] = node.arguments;
    if (arg0 == null || arg1 == null) return null;
    const fixedCallExpressionText = [
      "createRoot",
      "(" + getText(arg1) + ")" + ".",
      "render",
      "(" + getText(arg0) + ")",
    ].join("");
    return [
      fixer.insertTextBefore(context.sourceCode.ast, 'import { createRoot } from "react-dom/client";\n'),
      fixer.replaceText(node, fixedCallExpressionText),
    ];
  };
}
