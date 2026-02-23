import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { RuleFixer } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import { isMatching } from "ts-pattern";

import { createRule, isCallFromReact } from "../../utils";

export const RULE_NAME = "no-use-context";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'useContext' with 'use'.",
    },
    fixable: "code",
    messages: {
      default: "In React 19, 'use' is preferred over 'useContext' because it is more flexible.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `useContext` is not present in the file
  if (!context.sourceCode.text.includes("useContext")) return {};
  const settings = getSettingsFromContext(context);
  // Skip if React version is less than 19.0.0
  if (compare(settings.version, "19.0.0", "<")) {
    return {};
  }
  const hookCalls = new Set<TSESTree.CallExpression>();
  return defineRuleListener(
    {
      CallExpression(node) {
        if (!core.isHookCall(node)) {
          return;
        }
        hookCalls.add(node);
      },
      ImportDeclaration(node) {
        if (node.source.value !== settings.importSource) {
          return;
        }
        const isUseImported = node.specifiers
          .some(isMatching({ local: { type: AST.Identifier, name: "use" } }));
        for (const specifier of node.specifiers) {
          if (specifier.type !== AST.ImportSpecifier) continue;
          if (specifier.imported.type !== AST.Identifier) continue;
          if (specifier.imported.name === "useContext") {
            context.report({
              messageId: "default",
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
          if (!core.isUseContextCall(node)) {
            continue;
          }
          const fix = isCallFromReact(context, node) ? getFix(node) : null;
          context.report({
            messageId: "default",
            node: node.callee,
            fix,
          });
        }
      },
    },
  );
}

function getFix(node: TSESTree.CallExpression) {
  return (fixer: RuleFixer) => {
    switch (node.callee.type) {
      case AST.Identifier:
        return fixer.replaceText(node.callee, "use");
      case AST.MemberExpression:
        return fixer.replaceText(node.callee.property, "use");
    }
    return null;
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
