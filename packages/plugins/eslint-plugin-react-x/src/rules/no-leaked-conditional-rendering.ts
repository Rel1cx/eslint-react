import { isJSX, NodeType } from "@eslint-react/ast";
import { findVariable, getVariableInitExpression } from "@eslint-react/var";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { Function as F, Option as O } from "effect";
import type { ConstantCase } from "string-ts";
import * as tsutils from "ts-api-utils";
import { isMatching, match } from "ts-pattern";
import ts from "typescript";

import { createRule } from "../utils";

export const RULE_NAME = "no-leaked-conditional-rendering";

export type MessageID = ConstantCase<typeof RULE_NAME>;

/** The types we care about */
/* eslint-disable perfectionist/sort-union-types */
type VariantType =
  | "unknown"
  | "any"
  | "boolean"
  | "enum"
  | "never"
  | "nullish"
  | "number"
  | "object"
  | "string"
  | "falsy boolean"
  | "falsy number"
  | "falsy string"
  | "truthy boolean"
  | "truthy number"
  | "truthy string";
/* eslint-enable perfectionist/sort-union-types */

// Allowed left node type variants
const allowedVariants = [
  "nullish",
  "boolean",
  "string",
  "object",
  "any",
  "falsy string",
  "truthy boolean",
  "truthy string",
] as const satisfies readonly VariantType[];

/**
 * Ported from https://github.com/typescript-eslint/typescript-eslint/blob/eb736bbfc22554694400e6a4f97051d845d32e0b/packages/eslint-plugin/src/rules/strict-boolean-expressions.ts#L826
 * Check union variants for the types we care about
 * @param types
 */
function inspectVariantTypes(types: ts.Type[]) {
  const variantTypes = new Set<VariantType>();

  if (types.some(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.Unknown))) {
    variantTypes.add("unknown");
    return variantTypes;
  }

  if (
    types.some(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.VoidLike))
  ) {
    variantTypes.add("nullish");
  }

  const booleans = types.filter(type => tsutils.isTypeFlagSet(type, ts.TypeFlags.BooleanLike));

  // If incoming type is either "true" or "false", there will be one type
  // object with intrinsicName set accordingly
  // If incoming type is boolean, there will be two type objects with
  // intrinsicName set "true" and "false" each because of ts-api-utils.unionTypeParts()
  switch (true) {
    case booleans.length === 1 && !!booleans[0]: {
      const [first] = booleans;
      F.pipe(
        match<typeof first, O.Option<VariantType>>(first)
          .when(tsutils.isTrueLiteralType, () => O.some("truthy boolean"))
          .when(tsutils.isFalseLiteralType, () => O.some("falsy boolean"))
          .otherwise(O.none),
        O.map(v => variantTypes.add(v)),
      );
      break;
    }
    case booleans.length === 2: {
      variantTypes.add("boolean");
      break;
    }
    default: {
      break;
    }
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
        types => types.every(type => type.isNumberLiteral() && type.value > 0),
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

  return variantTypes;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow problematic leaked values from being rendered",
    },
    messages: {
      NO_LEAKED_CONDITIONAL_RENDERING:
        "Potential leaked value {{value}} that might cause unintentionally rendered values or rendering crashes",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const services = ESLintUtils.getParserServices(context);

    function checkExpression(node: TSESTree.Expression): O.Option<ReportDescriptor<MessageID>> {
      return match<typeof node, O.Option<ReportDescriptor<MessageID>>>(node)
        .when(isJSX, O.none)
        .with({ type: NodeType.LogicalExpression, operator: "&&" }, ({ left, right }) => {
          const initialScope = context.sourceCode.getScope(left);
          const isLeftNan = isMatching({ type: NodeType.Identifier, name: "NaN" }, left)
            || getStaticValue(left, initialScope)?.value === "NaN";
          if (isLeftNan) {
            return O.some({
              data: { value: context.sourceCode.getText(left) },
              messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
              node: left,
            });
          }
          const isLeftUnaryNot = isMatching({ type: NodeType.UnaryExpression, operator: "!" }, left);
          if (isLeftUnaryNot) return checkExpression(right);
          const leftType = getConstrainedTypeAtLocation(services, left);
          const leftTypeVariants = inspectVariantTypes(tsutils.unionTypeParts(leftType));
          const isLeftValid = Array
            .from(leftTypeVariants.values())
            .every(type => allowedVariants.some(allowed => allowed === type));
          if (isLeftValid) return checkExpression(right);
          return O.some({
            data: { value: context.sourceCode.getText(left) },
            messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
            node: left,
          });
        })
        .with({ type: NodeType.ConditionalExpression }, ({ alternate, consequent }) => {
          return O.orElse(checkExpression(consequent), () => checkExpression(alternate));
        })
        .with({ type: NodeType.Identifier }, (n) => {
          const initialScope = context.sourceCode.getScope(n);

          return F.pipe(
            findVariable(n.name, initialScope),
            O.flatMap(getVariableInitExpression(0)),
            O.flatMap(checkExpression),
          );
        })
        .otherwise(O.none);
    }

    return {
      "JSXExpressionContainer > ConditionalExpression"(node: TSESTree.ConditionalExpression) {
        O.map(checkExpression(node), context.report);
      },
      "JSXExpressionContainer > LogicalExpression"(node: TSESTree.LogicalExpression) {
        O.map(checkExpression(node), context.report);
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
