import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import { P, match } from "ts-pattern";

import { createRule } from "../../utils";

export const RULE_NAME = "no-forward-ref";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default" | "replace";

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Replaces usage of 'forwardRef' with passing 'ref' as a prop.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "In React 19, 'forwardRef' is no longer necessary. Pass 'ref' as a prop instead.",
      replace: "Replace 'forwardRef' with passing 'ref' as a prop.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `forwardRef` is not present in the file
  if (!context.sourceCode.text.includes("forwardRef")) {
    return {};
  }
  const { version } = getSettingsFromContext(context);
  // Skip if React version is less than 19.0.0
  if (compare(version, "19.0.0", "<")) {
    return {};
  }
  return defineRuleListener(
    {
      // Visitor for `forwardRef()` calls
      CallExpression(node) {
        if (!core.isForwardRefCall(context, node)) {
          return;
        }
        const id = ast.getFunctionId(node);
        const suggest = canFix(context, node)
          ? [
            {
              messageId: "replace" as const,
              fix: getFix(context, node),
            },
          ]
          : [];
        context.report({
          messageId: "default",
          node: id ?? node,
          suggest,
        });
      },
    },
  );
}

/**
 * Determine whether the given CallExpression can be safely auto-fixed by replacing
 * the usage of `forwardRef` with passing `ref` as a prop
 *
 * @param context The rule context object
 * @param node The CallExpression node to check
 * @returns True if the call can be auto-fixed, false otherwise
 */
function canFix(context: RuleContext, node: TSESTree.CallExpression) {
  const { importSource } = getSettingsFromContext(context);
  const initialScope = context.sourceCode.getScope(node);
  // Check if the callee is `forwardRef` or `React.forwardRef`
  switch (node.callee.type) {
    case AST.Identifier:
      return core.isInitializedFromReact(node.callee.name, initialScope, importSource);
    case AST.MemberExpression:
      return node.callee.object.type === AST.Identifier
        && core.isInitializedFromReact(node.callee.object.name, initialScope, importSource);
    default:
      return false;
  }
}

/**
 * Generates the fix for the `forwardRef` call
 * @param context The rule context
 * @param node The `forwardRef` call expression
 * @returns A fixer function that applies the changes
 */
function getFix(context: RuleContext, node: TSESTree.CallExpression): (fixer: RuleFixer) => RuleFix[] {
  return (fixer) => {
    const [componentNode] = node.arguments;
    if (componentNode == null || !ast.isFunction(componentNode)) {
      return [];
    }
    return [
      // Unwrap component from forwardRef call
      fixer.removeRange([node.range[0], componentNode.range[0]]),
      fixer.removeRange([componentNode.range[1], node.range[1]]),
      // Update component props and ref arguments to match the new signature
      ...getComponentPropsFixes(
        context,
        fixer,
        componentNode,
        node.typeArguments?.params ?? [],
      ),
    ] as const;
  };
}

/**
 * Generates fixes for the component's props and ref arguments
 * @param context The rule context
 * @param fixer The rule fixer
 * @param node The function component node
 * @param typeArguments The type arguments from the `forwardRef` call
 * @returns An array of fixes for the component's signature
 */
function getComponentPropsFixes(
  context: RuleContext,
  fixer: RuleFixer,
  node: ast.TSESTreeFunction,
  typeArguments: TSESTree.TypeNode[],
) {
  const getText = (node: TSESTree.Node) => context.sourceCode.getText(node);
  const [arg0, arg1] = node.params;
  const [typeArg0, typeArg1] = typeArguments;
  if (arg0 == null) {
    const openParen = context.sourceCode.getFirstToken(node, { filter: (t) => t.value === "(" });
    if (openParen == null) return [];
    if (typeArg0 == null || typeArg1 == null) {
      return [];
    }
    const typeArg0Text = getText(typeArg0);
    const typeArg1Text = getText(typeArg1);
    return [
      fixer.insertTextAfter(openParen, `{ ref }: ${typeArg1Text} & { ref?: React.RefObject<${typeArg0Text} | null> }`),
    ];
  }
  // Determines how to spread or list props from the first argument
  const fixedArg0Text = match(arg0)
    .with({ type: AST.Identifier }, (n) => `...${n.name}`)
    .with({ type: AST.ObjectPattern }, (n) => n.properties.map(getText).join(", "))
    .otherwise(() => null);
  // Determines the new `ref` prop text
  const fixedArg1Text = match(arg1)
    .with(P.nullish, () => "ref")
    .with({ type: AST.Identifier, name: "ref" }, () => "ref")
    .with({ type: AST.Identifier, name: P.string }, (n) => `ref: ${n.name}`)
    .otherwise(() => null);
  if (fixedArg0Text == null || fixedArg1Text == null) {
    return [];
  }
  // If no type arguments, just update the props
  if (typeArg0 == null || typeArg1 == null) {
    return [
      fixer.replaceText(
        arg0,
        [
          "{",
          fixedArg1Text + ",",
          fixedArg0Text,
          "}",
        ].join(" "),
      ),
      ...arg1 == null
        ? []
        : [fixer.remove(arg1), fixer.removeRange([arg0.range[1], arg1.range[0]])],
    ] as const;
  }
  // If type arguments exist, update props and add types
  const typeArg0Text = getText(typeArg0);
  const typeArg1Text = getText(typeArg1);
  return [
    fixer.replaceText(
      arg0,
      [
        "{",
        fixedArg1Text + ",",
        fixedArg0Text,
        "}:",
        typeArg1Text,
        "&",
        "{",
        `ref?:`,
        `React.RefObject<${typeArg0Text} | null>`,
        "}",
      ].join(" "),
    ),
    ...arg1 == null
      ? []
      : [fixer.remove(arg1), fixer.removeRange([arg0.range[1], arg1.range[0]])],
  ] as const;
}
