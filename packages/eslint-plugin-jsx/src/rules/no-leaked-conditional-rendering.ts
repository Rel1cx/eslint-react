import { NodeType } from "@eslint-react/ast";
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
      const { left, operator } = node;

      if (operator === "&&") {
        const leftType = getConstrainedTypeAtLocation(services, left);
        const types = inspectVariantTypes([leftType]);

        return types.every(type => allowTypes.includes(type as never));
      }

      return true;
    }

    function isValidConditionalExpression(
      node: TSESTree.ConditionalExpression,
    ): boolean {
      const { alternate, consequent, test } = node;
      if (
        consequent.type === NodeType.Identifier
        && test.type === NodeType.Identifier
        && test.name === consequent.name
      ) {
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
