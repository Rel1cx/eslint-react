import { isReactHookCall, isUseContextCall } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-use-context";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'useContext' with 'use'.",
    },
    fixable: "code",
    messages: {
      noUseContext: "In React 19, 'use' is preferred over 'useContext' because it is more flexible.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `useContext` is not present in the file
  if (!context.sourceCode.text.includes("useContext")) return {};
  const settings = getSettingsFromContext(context);
  // Skip if React version is less than 19.0.0
  if (compare(settings.version, "19.0.0", "<")) {
    return {};
  }
  const hookCalls = new Set<TSESTree.CallExpression>();
  return {
    CallExpression(node) {
      if (!isReactHookCall(node)) {
        return;
      }
      hookCalls.add(node);
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
                  ...getCorrelativeTokens(
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
    "Program:exit"() {
      for (const node of hookCalls) {
        if (!isUseContextCall(node)) {
          continue;
        }
        context.report({
          messageId: "noUseContext",
          node: node.callee,
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
      }
    },
  };
}

function getCorrelativeTokens(context: RuleContext, node: TSESTree.Node) {
  const tokenBefore = context.sourceCode.getTokenBefore(node);
  const tokenAfter = context.sourceCode.getTokenAfter(node);
  const tokens = [];

  // If this is not the only entry, then the line above this one
  // will become the last line, and should not have a trailing comma
  if (tokenAfter?.value !== "," && tokenBefore?.value === ",") {
    tokens.push(tokenBefore);
  }

  // If this is not the last entry, then we need to remove the comma from this line
  if (tokenAfter?.value === ",") {
    tokens.push(tokenAfter);
  }

  return tokens;
}
