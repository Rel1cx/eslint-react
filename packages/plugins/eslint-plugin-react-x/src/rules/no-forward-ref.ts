import * as AST from "@eslint-react/ast";
import { isForwardRefCall } from "@eslint-react/core";
import { decodeSettings, normalizeSettings } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-forward-ref";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of 'forwardRef'",
    },
    fixable: "code",
    messages: {
      noForwardRef: "In React 19, 'forwardRef' is no longer necessary. Pass 'ref' as a prop instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("forwardRef")) return {};
    const { version } = normalizeSettings(decodeSettings(context.settings));
    if (compare(version, "19.0.0", "<")) return {};
    return {
      CallExpression(node) {
        if (!isForwardRefCall(node, context)) return;
        context.report({
          messageId: "noForwardRef",
          node,
          fix: getFix(node, context),
        });
      },
    };
  },
  defaultOptions: [],
});

function getFix(node: TSESTree.CallExpression, context: RuleContext): (fixer: RuleFixer) => RuleFix[] {
  return (fixer) => {
    const [componentNode] = node.arguments;
    if (!componentNode || !AST.isFunction(componentNode)) return [];
    return [
      fixer.removeRange([node.range[0], componentNode.range[0]]),
      fixer.removeRange([componentNode.range[1], node.range[1]]),
      ...getComponentPropsFixes(
        componentNode,
        node.typeArguments?.params ?? [],
        fixer,
        context,
      ),
    ];
  };
}

function getComponentPropsFixes(
  node: AST.TSESTreeFunction,
  typeArguments: TSESTree.TypeNode[],
  fixer: RuleFixer,
  context: RuleContext,
): RuleFix[] {
  const [arg0, arg1] = node.params;
  const [typeArg0, typeArg1] = typeArguments;
  if (arg0?.type !== AST_NODE_TYPES.Identifier) return [];
  if (!arg1) {
    return [fixer.replaceText(
      arg0,
      [
        "{",
        "ref,",
        `...${arg0.name}`,
        "}",
      ].join(" "),
    )] as const;
  }
  if (arg1.type !== AST_NODE_TYPES.Identifier) return [];
  if (!typeArg0 || !typeArg1) {
    return [
      fixer.replaceText(
        arg0,
        [
          "{",
          arg1.name === "ref"
            ? `ref,`
            : `ref: ${arg1.name},`,
          `...${arg0.name}`,
          "}",
        ].join(" "),
      ),
      fixer.remove(arg1),
      fixer.removeRange([arg0.range[1], arg1.range[0]]),
    ] as const;
  }
  const getText = (node: TSESTree.Node) => context.sourceCode.getText(node);
  return [
    fixer.replaceText(
      arg0,
      [
        "{",
        arg1.name === "ref"
          ? `ref,`
          : `ref: ${arg1.name},`,
        `...${arg0.name}`,
        "}:",
        getText(typeArg1),
        "&",
        "{",
        `ref:`,
        `React.RefObject<${getText(typeArg0)}>`,
        "}",
      ].join(" "),
    ),
    fixer.remove(arg1),
    fixer.removeRange([arg0.range[1], arg1.range[0]]),
  ] as const;
}
