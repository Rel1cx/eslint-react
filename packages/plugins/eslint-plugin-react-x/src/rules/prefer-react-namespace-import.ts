import { decodeSettings } from "@eslint-react/shared";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-react-namespace-import";

export const RULE_FEATURES = [
  "CHK",
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce React is imported via a namespace import",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      preferReactNamespaceImport: 'Prefer importing React as `import * as React from "{{importSource}}";`',
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const importSource = decodeSettings(context.settings).importSource ?? "react";
    return {
      [`ImportDeclaration[source.value="${importSource}"] ImportDefaultSpecifier`](
        node: TSESTree.ImportDefaultSpecifier,
      ) {
        const hasOtherSpecifiers = node.parent.specifiers.length > 1;
        context.report({
          messageId: "preferReactNamespaceImport",
          node: hasOtherSpecifiers ? node : node.parent,
          data: { importSource },
          fix(fixer) {
            const quote = node.parent.source.raw.at(0) ?? "'";
            const isTypeImport = node.parent.importKind === "type";
            const importStringPrefix = `import${isTypeImport ? " type" : ""}`;
            const importSourceQuoted = `${quote}${importSource}${quote}`;
            const sourceCode = context.sourceCode.getText(node.parent);
            const semiColon = sourceCode.endsWith(";") ? ";" : "";
            if (!hasOtherSpecifiers) {
              return fixer.replaceText(
                node.parent,
                `${importStringPrefix} * as ${node.local.name} from ${importSourceQuoted}${semiColon}`,
              );
            }

            // remove the default specifier and prepend the namespace import specifier
            const specifiers = sourceCode.slice(sourceCode.indexOf("{"), sourceCode.indexOf("}") + 1);
            return fixer.replaceText(
              node.parent,
              `${importStringPrefix} * as ${node.local.name} from ${importSourceQuoted}${semiColon}\n${importStringPrefix} ${specifiers} from ${importSourceQuoted}${semiColon}`,
            );
          },
        });
      },
    };
  },
  defaultOptions: [],
});
