import { isReactHookCall, isReactHookCallWithNameAlias } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-use-context";

export const RULE_FEATURES = [
  "CHK",
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of 'useContext'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      noUseContext: "In React 19, 'use' is preferred over 'useContext' because it is more flexible.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("useContext")) return {};
    const settings = getSettingsFromContext(context);
    const useContextAlias = new Set<string>();
    if (compare(settings.version, "19.0.0", "<")) {
      return {};
    }
    return {
      CallExpression(node) {
        if (!isReactHookCall(node)) {
          return;
        }
        if (!isReactHookCallWithNameAlias(context, "useContext", [...useContextAlias])(node)) {
          return;
        }
        context.report({
          messageId: "noUseContext",
          node,
          fix(fixer) {
            switch (node.callee.type) {
              case T.Identifier:
                return fixer.replaceText(node.callee, "use");
              case T.MemberExpression:
                return fixer.replaceText(node.callee.property, "use");
            }
            return null;
          },
        });
      },
      ImportDeclaration(node) {
        if (node.source.value !== settings.importSource) {
          return;
        }
        const isUseImported = node.specifiers
          .some(isMatching({ local: { type: T.Identifier, name: "use" } }));
        for (const specifier of node.specifiers) {
          if (specifier.type !== T.ImportSpecifier) continue;
          if (specifier.imported.type !== T.Identifier) continue;
          if (specifier.imported.name === "useContext") {
            // import { useContext as useCtx } from 'react'
            if (specifier.local.name !== "useContext") {
              // add alias to useContextAlias to keep track of it in future call expressions
              useContextAlias.add(specifier.local.name);
            }
            context.report({
              messageId: "noUseContext",
              node: specifier,
              fix(fixer) {
                if (isUseImported) {
                  const tokenBefore = context.sourceCode.getTokenBefore(specifier);
                  return [
                    fixer.remove(specifier),
                    ...tokenBefore?.value === ","
                      ? [fixer.replaceTextRange([tokenBefore.range[1], specifier.range[0]], "")]
                      : [],
                    ...getAssociatedTokens(
                      context,
                      specifier,
                    ).map((token) => fixer.remove(token)),
                  ];
                }
                return fixer.replaceText(specifier.imported, "use");
              },
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});

function getAssociatedTokens(context: RuleContext, node: TSESTree.Node) {
  {
    const tokenBefore = context.sourceCode.getTokenBefore(node);
    const tokenAfter = context.sourceCode.getTokenAfter(node);
    const tokens = [];

    // If this is not the only entry, then the line above this one
    // will become the last line, and should not have a trailing comma.
    if (tokenAfter?.value !== "," && tokenBefore?.value === ",") {
      tokens.push(tokenBefore);
    }

    // If this is not the last entry, then we need to remove the comma from this line.
    if (tokenAfter?.value === ",") {
      tokens.push(tokenAfter);
    }

    return tokens;
  }
}
