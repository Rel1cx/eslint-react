import type { TSESTree } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-react-namespace-import";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce React is imported via a namespace import",
    },
    fixable: "code",
    messages: {
      preferReactNamespaceImport: "Prefer importing React as `import * as React from 'react';`",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      'ImportDeclaration[source.value="react"] ImportDefaultSpecifier'(node: TSESTree.ImportDefaultSpecifier) {
        const hasOtherSpecifiers = node.parent.specifiers.length > 1;
        context.report({
          messageId: "preferReactNamespaceImport",
          node: hasOtherSpecifiers ? node : node.parent,
          fix(fixer) {
            const isTypeImport = node.parent.importKind === "type";
            const importStringPrefix = `import${isTypeImport ? " type" : ""}`;
            if (!hasOtherSpecifiers) {
              return fixer.replaceText(
                node.parent,
                `${importStringPrefix} * as ${node.local.name} from 'react';`,
              );
            }

            // remove the default specifier and prepend the namespace import specifier
            const sourceCode = context.sourceCode.getText(node.parent);
            const specifiers = sourceCode.slice(sourceCode.indexOf("{"), sourceCode.indexOf("}") + 1);
            return fixer.replaceText(
              node.parent,
              `${importStringPrefix} * as ${node.local.name} from 'react';\n${importStringPrefix} ${specifiers} from 'react';`,
            );
          },
        });
      },
    };
  },
  defaultOptions: [],
});
