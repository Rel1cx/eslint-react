/* eslint-disable sonarjs/no-duplicate-string */
import { getNestedUnaryOperators, isJSX, isNodeEqual, NodeType } from "@eslint-react/ast";
import { isJSXValue, JSXValueCheckHint } from "@eslint-react/jsx";
import { F } from "@eslint-react/tools";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import { type TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";
import * as tsutils from "ts-api-utils";
import { match } from "ts-pattern";
import ts from "typescript";

import { createRule } from "../utils";

export const RULE_NAME = "no-leaked-conditional-rendering";

export type MessageID = "NEEDS_TYPE_CHECKING_SERVICE" | ConstantCase<typeof RULE_NAME>;

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
  // eslint-disable-next-line perfectionist/sort-union-types
  | "falsy boolean"
  | "falsy number"
  | "falsy string"
  | "truthy boolean"
  | "truthy number"
  | "truthy string";

const falsyTypes = [
  "nullish",
  "falsy boolean",
  "falsy number",
  "falsy string",
] as const satisfies VariantType[];

// Allowed un-guarded type variants
const allowTypes = [
  "boolean",
  "string",

  "falsy string",
  "truthy boolean",
  "truthy string",
] as const satisfies VariantType[];

// Allowed guarded consequent type variants
const allowGuardedConsequentTypes = [
  "boolean",
  "string",
  "number",
  "nullish",

  "truthy boolean",
  "truthy number",
  "truthy string",
] as const satisfies VariantType[];

// Allowed guarded alternate type variants
const allowGuardedAlternateTypes = [
  "boolean",
  "string",
  "number",
  "nullish",

  "falsy boolean",
  "falsy number",
  "falsy string",
] as const satisfies VariantType[];

// Allowed guarded logical right type variants
const allowGuardedUnaryNotTypes = [
  "boolean",
  "string",
  "number",
  "nullish",

  "truthy boolean",
  "truthy number",
  "truthy string",

  "falsy boolean",
  "falsy number",
  "falsy string",
] as const satisfies VariantType[];

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
  if (booleans.length === 1 && booleans[0]) {
    const evaluated = match<ts.Type, VariantType>(booleans[0])
      .when(tsutils.isTrueLiteralType, F.constant("truthy boolean"))
      .when(tsutils.isFalseLiteralType, F.constant("falsy boolean"))
      .otherwise(F.constant("boolean"));

    variantTypes.add(evaluated);
  }

  const strings = types.filter(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.StringLike));

  if (strings.length > 0) {
    const evaluated = match<ts.Type[], VariantType>(strings)
      .when(
        types => types.every(type => type.isStringLiteral() && type.value !== ""),
        F.constant("truthy string"),
      )
      .when(
        types => types.every(type => type.isStringLiteral() && type.value === ""),
        F.constant("falsy string"),
      )
      .otherwise(F.constant("string"));

    variantTypes.add(evaluated);
  }

  const numbers = types.filter(type =>
    tsutils.isTypeFlagSet(
      type,
      ts.TypeFlags.NumberLike | ts.TypeFlags.BigIntLike,
    )
  );

  if (numbers.length > 0) {
    const evaluated = match<ts.Type[], VariantType>(numbers)
      .when(
        types => types.every(type => type.isNumberLiteral() && type.value !== 0),
        F.constant("truthy number"),
      )
      .when(
        types => types.every(type => type.isNumberLiteral() && type.value === 0),
        F.constant("falsy number"),
      )
      .otherwise(F.constant("number"));

    variantTypes.add(evaluated);
  }

  if (types.some(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.EnumLike))) {
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
      requiresTypeChecking: true,
    },
    schema: [],
    messages: {
      NEEDS_TYPE_CHECKING_SERVICE:
        "Type checking is required for this rule. Please add a `project` to your parser options. See https://typescript-eslint.io/docs/linting/type-linting",
      NO_LEAKED_CONDITIONAL_RENDERING:
        "Potential leaked value that might cause unintentionally rendered values or rendering crashes",
    },
  },
  defaultOptions: [],
  create(context) {
    const hint = JSXValueCheckHint.StrictArray
      | JSXValueCheckHint.StrictLogical
      | JSXValueCheckHint.StrictConditional;

    const services = ESLintUtils.getParserServices(context);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
    if (!services.program) {
      context.report({
        loc: { column: 1, line: 1 },
        messageId: "NEEDS_TYPE_CHECKING_SERVICE",
      });
    }

    function isValidInnerExpression(node: TSESTree.Expression): boolean {
      return match(node)
        .with({ type: NodeType.LogicalExpression, operator: "||" }, F.constTrue)
        .with({ type: NodeType.LogicalExpression, operator: "&&" }, isValidLogicalExpression)
        .with({ type: NodeType.ConditionalExpression }, isValidConditionalExpression)
        .otherwise(() => isJSXValue(node, context, hint));
    }

    function isValidLogicalExpression(
      node: TSESTree.LogicalExpression,
    ): boolean {
      const { left, operator, right } = node;

      if (operator !== "&&") {
        return true;
      }

      const isLeftUnaryNot = left.type === NodeType.UnaryExpression
        && left.operator === "!";

      if (isLeftUnaryNot) {
        if (isJSX(right)) {
          return true;
        }

        const rightType = getConstrainedTypeAtLocation(services, right);
        const rightTypeVariants = inspectVariantTypes(tsutils.unionTypeParts(rightType));

        return rightTypeVariants.every(type => allowGuardedUnaryNotTypes.includes(type as never));
      }

      const leftType = getConstrainedTypeAtLocation(services, left);
      const leftTypeVariants = inspectVariantTypes(tsutils.unionTypeParts(leftType));

      return leftTypeVariants.every(type => allowTypes.includes(type as never));
    }

    function isValidConditionalExpression(
      node: TSESTree.ConditionalExpression,
    ): boolean {
      const { alternate, consequent, test } = node;

      const isConsequentGuarded = isNodeEqual(consequent, test);
      const testType = getConstrainedTypeAtLocation(services, test);
      const testTypeVariants = inspectVariantTypes(tsutils.unionTypeParts(testType));

      if (
        isConsequentGuarded
        && testTypeVariants.every(type => allowGuardedConsequentTypes.includes(type as never))
      ) {
        return true;
      }

      const unaryOperatorsInTest = test.type === NodeType.UnaryExpression
        ? getNestedUnaryOperators(test)
        : [];

      const isAlternateGuarded = testTypeVariants.every(type => falsyTypes.includes(type as never))
        && unaryOperatorsInTest.every(op => op === "!")
        && unaryOperatorsInTest.length % 2 === 1;

      if (isAlternateGuarded && testTypeVariants.every(type => allowGuardedAlternateTypes.includes(type as never))) {
        return true;
      }

      return isValidInnerExpression(alternate) && isValidInnerExpression(consequent);
    }

    return {
      "JSXExpressionContainer > ConditionalExpression"(node: TSESTree.ConditionalExpression) {
        if (!isValidConditionalExpression(node)) {
          context.report({
            messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
            node,
          });
        }
      },
      "JSXExpressionContainer > LogicalExpression"(node: TSESTree.LogicalExpression) {
        if (!isValidLogicalExpression(node)) {
          context.report({
            messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
            node,
          });
        }
      },
    };
  },
});
