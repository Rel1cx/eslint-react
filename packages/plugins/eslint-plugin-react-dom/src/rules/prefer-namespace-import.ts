import { type RuleContext, type RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-namespace-import";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces React Dom is imported via a namespace import.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      preferNamespaceImport: "Prefer importing React DOM via a namespace import.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

const importSources = [
  "react-dom",
  "react-dom/client",
  "react-dom/server",
];

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    [`ImportDeclaration ImportDefaultSpecifier`](node: TSESTree.ImportDefaultSpecifier) {
      const importSource = node.parent.source.value;
      if (!importSources.includes(importSource)) return;
      const hasOtherSpecifiers = node.parent.specifiers.length > 1;
      context.report({
        messageId: "preferNamespaceImport",
        node: hasOtherSpecifiers ? node : node.parent,
        data: { importSource },
        fix(fixer) {
          const importDeclarationText = context.sourceCode.getText(node.parent);
          const semi = importDeclarationText.endsWith(";") ? ";" : "";
          const quote = node.parent.source.raw.at(0) ?? "'";
          const isTypeImport = node.parent.importKind === "type";
          const importStringPrefix = `import${isTypeImport ? " type" : ""}`;
          const importSourceQuoted = `${quote}${importSource}${quote}`;
          if (!hasOtherSpecifiers) {
            return fixer.replaceText(
              node.parent,
              `${importStringPrefix} * as ${node.local.name} from ${importSourceQuoted}${semi}`,
            );
          }
          // dprint-ignore
          // remove the default specifier and prepend the namespace import specifier
          const specifiers = importDeclarationText.slice(importDeclarationText.indexOf("{"), importDeclarationText.indexOf("}") + 1);
          return fixer.replaceText(
            node.parent,
            [
              `${importStringPrefix} * as ${node.local.name} from ${importSourceQuoted}${semi}`,
              `${importStringPrefix} ${specifiers} from ${importSourceQuoted}${semi}`,
            ].join("\n"),
          );
        },
      });
    },
  };
}
