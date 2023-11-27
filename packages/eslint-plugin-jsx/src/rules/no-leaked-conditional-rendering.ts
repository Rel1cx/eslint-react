import { findVariableByNameUpToGlobal, getVariableInitExpression, isJSX, NodeType } from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
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

// Allowed left node type variants
const allowedVariants = [
  "nullish",
  "boolean",
  "string",

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
    const services = ESLintUtils.getParserServices(context);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
    if (!services.program) {
      context.report({
        loc: { column: 1, line: 1 },
        messageId: "NEEDS_TYPE_CHECKING_SERVICE",
      });
    }

    function isValidExpression(node: TSESTree.Expression): boolean {
      return match(node)
        .when(isJSX, F.constTrue)
        .with({ type: NodeType.LogicalExpression, operator: "&&" }, isValidLogicalExpression)
        .with({ type: NodeType.LogicalExpression, operator: "||" }, ({ left, right }) => {
          return isValidExpression(left) && isValidExpression(right);
        })
        .with({ type: NodeType.ConditionalExpression }, ({ alternate, consequent }) => {
          return isValidExpression(consequent) && isValidExpression(alternate);
        })
        .with({ type: NodeType.Identifier }, (n) => {
          const maybeInitExpression = F.pipe(
            findVariableByNameUpToGlobal(n.name, context.getScope()),
            O.flatMap(getVariableInitExpression(0)),
          );

          if (O.isNone(maybeInitExpression)) {
            return true;
          }

          const initExpression = maybeInitExpression.value;

          return isValidExpression(initExpression);
        })
        .otherwise(F.constTrue);
    }

    function isValidLogicalExpression(
      node: TSESTree.LogicalExpression,
    ): boolean {
      const { left, right } = node;

      const isLeftUnaryNot = left.type === NodeType.UnaryExpression
        && left.operator === "!";

      if (isLeftUnaryNot) {
        return isValidExpression(right);
      }

      const leftType = getConstrainedTypeAtLocation(services, left);
      const leftTypeVariants = inspectVariantTypes(tsutils.unionTypeParts(leftType));

      return leftTypeVariants.every(type => allowedVariants.includes(type as never))
        && isValidExpression(right);
    }

    return {
      "JSXExpressionContainer > ConditionalExpression"(node: TSESTree.ConditionalExpression) {
        if (!isValidExpression(node)) {
          context.report({
            messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
            node,
          });
        }
      },
      "JSXExpressionContainer > LogicalExpression"(node: TSESTree.LogicalExpression) {
        if (!isValidExpression(node)) {
          context.report({
            messageId: "NO_LEAKED_CONDITIONAL_RENDERING",
            node,
          });
        }
      },
    };
  },
});
