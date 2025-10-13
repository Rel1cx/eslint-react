import * as AST from "@eslint-react/ast";
import { isForwardRefCall, isInitializedFromReact } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleFix, RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { compare } from "compare-versions";
import type { CamelCase } from "string-ts";
import { P, match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-forward-ref";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usages of `forwardRef` with passing `ref` as a prop.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      noForwardRef: "In React 19, 'forwardRef' is no longer necessary. Pass 'ref' as a prop instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `forwardRef` is not present in the file
  if (!context.sourceCode.text.includes("forwardRef")) {
    return {};
  }
  // Skip if React version is less than 19.0.0
  const { version } = getSettingsFromContext(context);
  if (compare(version, "19.0.0", "<")) {
    return {};
  }
  return {
    // Visitor for `forwardRef()` calls
    CallExpression(node) {
      if (!isForwardRefCall(context, node)) {
        return;
      }
      const id = AST.getFunctionId(node);
      const fix = canFix(context, node) ? getFix(context, node) : null;
      context.report({
        messageId: "noForwardRef",
        node: id ?? node,
        fix,
      });
    },
  };
}

/**
 * Determines whether the given CallExpression can be safely auto-fixed by replacing
 * the usage of `forwardRef` with passing `ref` as a prop
 *
 * @param context - The rule context object
 * @param node - The CallExpression node to check
 * @returns True if the call can be auto-fixed, false otherwise
 */
function canFix(context: RuleContext, node: TSESTree.CallExpression) {
  const { importSource } = getSettingsFromContext(context);
  const initialScope = context.sourceCode.getScope(node);
  // Check if the callee is `forwardRef` or `React.forwardRef`
  switch (node.callee.type) {
    case T.Identifier:
      return isInitializedFromReact(node.callee.name, importSource, initialScope);
    case T.MemberExpression:
      return node.callee.object.type === T.Identifier
        && isInitializedFromReact(node.callee.object.name, importSource, initialScope);
    default:
      return false;
  }
}

/**
 * Generates the fix for the `forwardRef` call
 * @param context - The rule context
 * @param node - The `forwardRef` call expression
 * @returns A fixer function that applies the changes
 */
function getFix(context: RuleContext, node: TSESTree.CallExpression): (fixer: RuleFixer) => RuleFix[] {
  return (fixer) => {
    const [componentNode] = node.arguments;
    if (componentNode == null || !AST.isFunction(componentNode)) {
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
 * @param context - The rule context
 * @param fixer - The rule fixer
 * @param node - The function component node
 * @param typeArguments - The type arguments from the `forwardRef` call
 * @returns An array of fixes for the component's signature
 */
function getComponentPropsFixes(
  context: RuleContext,
  fixer: RuleFixer,
  node: AST.TSESTreeFunction,
  typeArguments: TSESTree.TypeNode[],
) {
  const getText = (node: TSESTree.Node) => context.sourceCode.getText(node);
  const [arg0, arg1] = node.params;
  const [typeArg0, typeArg1] = typeArguments;
  // No props, do nothing
  if (arg0 == null) {
    return [];
  }
  // Determines how to spread or list props from the first argument
  const fixedArg0Text = match(arg0)
    .with({ type: T.Identifier }, (n) => `...${n.name}`)
    .with({ type: T.ObjectPattern }, (n) => n.properties.map(getText).join(", "))
    .otherwise(() => null);
  // Determines the new `ref` prop text
  const fixedArg1Text = match(arg1)
    .with(P.nullish, () => "ref")
    .with({ type: T.Identifier, name: "ref" }, () => "ref")
    .with({ type: T.Identifier, name: P.string }, (n) => `ref: ${n.name}`)
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
