import { isReactHookCall, isReactHookCallWithNameAlias } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule, getAssociatedTokens } from "../utils";

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
    const settings = getSettingsFromContext(context);
    const useContextAlias = new Set<string>();

    if (!context.sourceCode.text.includes("useContext")) {
      return {};
    }
    if (compare(settings.version, "19.0.0", "<")) {
      return {};
    }
    return {
      CallExpression(node) {
        if (!isReactHookCall(node)) {
          return;
        }
        if (!isReactHookCallWithNameAlias("useContext", context, [...useContextAlias])(node)) {
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
            if (specifier.local.name !== "useContext") {
              useContextAlias.add(specifier.local.name);
              context.report({
                messageId: "noUseContext",
                node: specifier,
              });
              return;
            }
            context.report({
              messageId: "noUseContext",
              node: specifier,
              fix(fixer) {
                if (isUseImported) {
                  return [
                    fixer.remove(specifier),
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
