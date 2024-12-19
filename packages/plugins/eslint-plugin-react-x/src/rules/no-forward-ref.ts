import * as AST from "@eslint-react/ast";
import { isForwardRefCall } from "@eslint-react/core";
import { O } from "@eslint-react/eff";
import { decodeSettings, normalizeSettings } from "@eslint-react/shared";
import type { RuleContext, RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";
import { match, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-forward-ref";

export const RULE_FEATURES = [
  "CHK",
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow the use of 'forwardRef'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
      // unwrap component from forwardRef call
      fixer.removeRange([node.range[0], componentNode.range[0]]),
      fixer.removeRange([componentNode.range[1], node.range[1]]),
      // update component props and ref arguments to match the new signature
      ...getComponentPropsFixes(
        componentNode,
        node.typeArguments?.params ?? [],
        fixer,
        context,
      ),
    ] as const;
  };
}

function getComponentPropsFixes(
  node: AST.TSESTreeFunction,
  typeArguments: TSESTree.TypeNode[],
  fixer: RuleFixer,
  context: RuleContext,
) {
  const getText = (node: TSESTree.Node) => context.sourceCode.getText(node);
  const [arg0, arg1] = node.params;
  const [typeArg0, typeArg1] = typeArguments;
  if (!arg0) return [];
  const fixedArg0Text = match(arg0)
    .with({ type: AST_NODE_TYPES.Identifier }, (n) => O.some(`...${n.name}`))
    .with({ type: AST_NODE_TYPES.ObjectPattern }, (n) => O.some(n.properties.map(getText).join(", ")))
    .otherwise(O.none);
  const fixedArg1Text = match(arg1)
    .with(P.nullish, () => O.some("ref"))
    .with({ type: AST_NODE_TYPES.Identifier, name: "ref" }, () => O.some("ref"))
    .with({ type: AST_NODE_TYPES.Identifier, name: P.not("ref") }, (n) => O.some(`ref: ${n.name}`))
    .otherwise(O.none);
  if (O.isNone(fixedArg0Text) || O.isNone(fixedArg1Text)) return [];
  const fixedPropsText = fixedArg0Text.value;
  const fixedRefText = fixedArg1Text.value;
  if (!typeArg0 || !typeArg1) {
    return [
      fixer.replaceText(
        arg0,
        [
          "{",
          fixedRefText + ",",
          fixedPropsText,
          "}",
        ].join(" "),
      ),
      ...arg1
        ? [fixer.remove(arg1), fixer.removeRange([arg0.range[1], arg1.range[0]])]
        : [],
    ] as const;
  }
  return [
    fixer.replaceText(
      arg0,
      [
        "{",
        fixedRefText + ",",
        fixedPropsText,
        "}:",
        getText(typeArg1),
        "&",
        "{",
        `ref:`,
        `React.RefObject<${getText(typeArg0)}>`,
        "}",
      ].join(" "),
    ),
    ...arg1
      ? [fixer.remove(arg1), fixer.removeRange([arg0.range[1], arg1.range[0]])]
      : [],
  ] as const;
}
