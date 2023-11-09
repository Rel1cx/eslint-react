import { isJSXValue, JSXValueCheckHint } from "@eslint-react/jsx";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import { type TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";
import * as tsutils from "ts-api-utils";
import * as ts from "typescript";

import { createRule } from "../utils";

export const RULE_NAME = "no-leaked-conditional-rendering";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const allowTypes = [
  "boolean",
  "string",

  "truthy boolean",
  "truthy string",
] as const;

/** The types we care about */
type VariantType =
  | "any"
  | "boolean"
  | "enum"
  | "never"
  | "nullish"
  | "number"
  | "object"
  | "string"
  | "truthy boolean"
  | "truthy number"
  | "truthy string";

/**
 * Ported from https://github.com/typescript-eslint/typescript-eslint/blob/eb736bbfc22554694400e6a4f97051d845d32e0b/packages/eslint-plugin/src/rules/strict-boolean-expressions.ts#L826
 * Check union variants for the types we care about
 * @param types
 */
function inspectVariantTypes(types: ts.Type[]) {
  const variantTypes = new Set<VariantType>();

  if (
    types.some(type =>
      tsutils.isTypeFlagSet(
        type,
        ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.VoidLike,
      )
    )
  ) {
    variantTypes.add("nullish");
  }
  const booleans = types.filter(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.BooleanLike));

  // If incoming type is either "true" or "false", there will be one type
  // object with intrinsicName set accordingly
  // If incoming type is boolean, there will be two type objects with
  // intrinsicName set "true" and "false" each because of ts-api-utils.unionTypeParts()
  // eslint-disable-next-line no-restricted-syntax
  if (booleans.length === 1 && booleans[0]) {
    tsutils.isTrueLiteralType(booleans[0])
      ? variantTypes.add("truthy boolean")
      : variantTypes.add("boolean");
  } else if (booleans.length === 2) {
    variantTypes.add("boolean");
  }

  const strings = types.filter(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.StringLike));

  if (strings.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    if (
      strings.every(type => type.isStringLiteral() && type.value !== "")
    ) {
      variantTypes.add("truthy string");
    } else {
      variantTypes.add("string");
    }
  }

  const numbers = types.filter(type =>
    tsutils.isTypeFlagSet(
      type,
      ts.TypeFlags.NumberLike | ts.TypeFlags.BigIntLike,
    )
  );

  if (numbers.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    if (numbers.every(type => type.isNumberLiteral() && type.value !== 0)) {
      variantTypes.add("truthy number");
    } else {
      variantTypes.add("number");
    }
  }

  if (
    types.some(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.EnumLike))
  ) {
    variantTypes.add("enum");
  }

  if (
    types.some(
      type =>
        !tsutils.isTypeFlagSet(
          type,
          ts.TypeFlags.Null
            | ts.TypeFlags.Undefined
            | ts.TypeFlags.VoidLike
            | ts.TypeFlags.BooleanLike
            | ts.TypeFlags.StringLike
            | ts.TypeFlags.NumberLike
            | ts.TypeFlags.BigIntLike
            | ts.TypeFlags.TypeParameter
            | ts.TypeFlags.Any
            | ts.TypeFlags.Unknown
            | ts.TypeFlags.Never,
        ),
    )
  ) {
    variantTypes.add("object");
  }

  if (
    types.some(type =>
      tsutils.isTypeFlagSet(
        type,
        ts.TypeFlags.TypeParameter
          | ts.TypeFlags.Any
          | ts.TypeFlags.Unknown,
      )
    )
  ) {
    variantTypes.add("any");
  }

  if (types.some(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.Never))) {
    variantTypes.add("never");
  }

  return [...variantTypes];
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "disallow problematic leaked values from being rendered",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_LEAKED_CONDITIONAL_RENDERING:
        "Potential leaked value that might cause unintentionally rendered values or rendering crashes",
    },
  },
  defaultOptions: [],
  create(context) {
    const services = ESLintUtils.getParserServices(context);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
    if (!services.program) {
      throw new Error("see https://typescript-eslint.io/docs/linting/type-linting");
    }

    return {
      "JSXExpressionContainer > ConditionalExpression"(node: TSESTree.ConditionalExpression) {
        const hint = JSXValueCheckHint.SkipNumberLiteral
          | JSXValueCheckHint.StrictArray
          | JSXValueCheckHint.StrictLogical
          | JSXValueCheckHint.StrictConditional;

        if (!isJSXValue(node, context, hint)) {
          context.report({
            messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
            node,
          });
        }
      },
      'JSXExpressionContainer > LogicalExpression[operator="&&"]'(node: TSESTree.LogicalExpression) {
        const { left } = node;

        const leftType = getConstrainedTypeAtLocation(services, left);

        const types = inspectVariantTypes([leftType]);

        if (types.every(type => allowTypes.includes(type as never))) {
          return;
        }

        context.report({
          messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
          node: left,
        });
      },
    };
  },
});
