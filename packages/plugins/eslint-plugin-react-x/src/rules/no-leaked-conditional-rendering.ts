import type { TSESTree } from "@typescript-eslint/types";
import type { ReportDescriptor, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import { flow, unit } from "@eslint-react/eff";
import { Reporter as RPT, type RuleContext, type RuleFeature } from "@eslint-react/kit";
import { getSettingsFromContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import { compare } from "compare-versions";
import { isFalseLiteralType, isTrueLiteralType, isTypeFlagSet, unionTypeParts } from "ts-api-utils";
import { isMatching, match, P } from "ts-pattern";
import ts from "typescript";

import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-conditional-rendering";

export const RULE_FEATURES = [
  "TSC",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

// #endregion

// #region Types

/** The types we care about */

type VariantType =
  | "any"
  | "bigint"
  | "boolean"
  | "enum"
  | "never"
  | "nullish"
  | "number"
  | "object"
  | "string"
  | "unknown"
  | "falsy bigint"
  | "falsy boolean"
  | "falsy number"
  | "falsy string"
  | "truthy bigint"
  | "truthy boolean"
  | "truthy number"
  | "truthy string";

// #endregion

// #region Helpers

const tsHelpers = {
  isAnyType: (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.TypeParameter | ts.TypeFlags.Any),
  isBigIntType: (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.BigIntLike),
  isBooleanType: (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.BooleanLike),
  isEnumType: (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.EnumLike),
  isFalsyBigIntType: (type: ts.Type) => type.isLiteral() && isMatching({ value: { base10Value: "0" } }, type),
  isFalsyNumberType: (type: ts.Type) => type.isNumberLiteral() && type.value === 0,
  isFalsyStringType: (type: ts.Type) => type.isStringLiteral() && type.value === "",
  isNeverType: (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.Never),
  isNullishType: (type: ts.Type) =>
    isTypeFlagSet(
      type,
      ts.TypeFlags.Null
        | ts.TypeFlags.Undefined
        | ts.TypeFlags.VoidLike,
    ),
  isNumberType: (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.NumberLike),
  isObjectType: (type: ts.Type) =>
    !isTypeFlagSet(
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
  isStringType: (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.StringLike),
  isTruthyBigIntType: (type: ts.Type) => type.isLiteral() && isMatching({ value: { base10Value: P.not("0") } }, type),
  isTruthyNumberType: (type: ts.Type) => type.isNumberLiteral() && type.value !== 0,
  isTruthyStringType: (type: ts.Type) => type.isStringLiteral() && type.value !== "",
  isUnknownType: (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.Unknown),
} as const;

/**
 * Ported from https://github.com/typescript-eslint/typescript-eslint/blob/eb736bbfc22554694400e6a4f97051d845d32e0b/packages/eslint-plugin/src/rules/strict-boolean-expressions.ts#L826 with some enhancements
 * Check union variants for the types we care about
 * @param types The types to inspect
 * @returns The variant types found
 */
function inspectVariantTypes(types: ts.Type[]) {
  const variantTypes = new Set<VariantType>();
  if (types.some(tsHelpers.isUnknownType)) {
    variantTypes.add("unknown");
    return variantTypes;
  }
  if (types.some(tsHelpers.isNullishType)) {
    variantTypes.add("nullish");
  }
  const booleans = types.filter(tsHelpers.isBooleanType);
  const boolean0 = booleans[0];
  // If incoming type is either "true" or "false", there will be one type
  // object with intrinsicName set accordingly
  // If incoming type is boolean, there will be two type objects with
  // intrinsicName set "true" and "false" each because of ts-api-utils.unionTypeParts()
  if (booleans.length === 1 && boolean0 != null) {
    if (isFalseLiteralType(boolean0)) {
      variantTypes.add("falsy boolean");
    } else if (isTrueLiteralType(boolean0)) {
      variantTypes.add("truthy boolean");
    }
  } else if (booleans.length === 2) {
    variantTypes.add("boolean");
  }
  const strings = types.filter(tsHelpers.isStringType);
  if (strings.length > 0) {
    const evaluated = match<ts.Type[], VariantType>(strings)
      .when((types) => types.every(tsHelpers.isTruthyStringType), () => "truthy string")
      .when((types) => types.every(tsHelpers.isFalsyStringType), () => "falsy string")
      .otherwise(() => "string" as const);
    variantTypes.add(evaluated);
  }
  const bigints = types.filter(tsHelpers.isBigIntType);
  if (bigints.length > 0) {
    const evaluated = match<ts.Type[], VariantType>(bigints)
      .when((types) => types.every(tsHelpers.isTruthyBigIntType), () => "truthy bigint")
      .when((types) => types.every(tsHelpers.isFalsyBigIntType), () => "falsy bigint")
      .otherwise(() => "bigint");
    variantTypes.add(evaluated);
  }
  const numbers = types.filter(tsHelpers.isNumberType);
  if (numbers.length > 0) {
    const evaluated = match<ts.Type[], VariantType>(numbers)
      .when((types) => types.every(tsHelpers.isTruthyNumberType), () => "truthy number")
      .when((types) => types.every(tsHelpers.isFalsyNumberType), () => "falsy number")
      .otherwise(() => "number" as const);
    variantTypes.add(evaluated);
  }
  if (types.some(tsHelpers.isEnumType)) {
    variantTypes.add("enum");
  }
  if (types.some(tsHelpers.isObjectType)) {
    variantTypes.add("object");
  }
  if (types.some(tsHelpers.isAnyType)) {
    variantTypes.add("any");
  }
  if (types.some(tsHelpers.isNeverType)) {
    variantTypes.add("never");
  }
  return variantTypes;
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents problematic leaked values from being rendered.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noLeakedConditionalRendering:
        "Potential leaked value {{value}} that might cause unintentionally rendered values or rendering crashes.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("&&")) return {};
  const { version } = getSettingsFromContext(context);

  // Allowed left node type variants
  const allowedVariants = [
    "any",
    "boolean",
    "nullish",
    "object",
    "falsy boolean",
    "truthy bigint",
    "truthy boolean",
    "truthy number",
    "truthy string",
    ...compare(version, "18.0.0", "<")
      ? []
      : ["string", "falsy string"] as const,
  ] as const satisfies VariantType[];

  const services = ESLintUtils.getParserServices(context, false);
  function getReportDescriptor(
    node:
      | unit
      | TSESTree.Expression
      | TSESTree.JSXExpressionContainer
      | TSESTree.JSXExpressionContainer["expression"],
  ): ReportDescriptor<MessageID> | unit {
    if (node == null) return unit;
    if (AST.is(T.JSXExpressionContainer)(node)) return getReportDescriptor(node.expression);
    if (AST.isJSX(node)) return unit;
    if (AST.isTypeExpression(node)) return getReportDescriptor(node.expression);
    return match<typeof node, ReportDescriptor<MessageID> | unit>(node)
      .with({ type: T.LogicalExpression, operator: "&&" }, ({ left, right }) => {
        const isLeftUnaryNot = left.type === T.UnaryExpression && left.operator === "!";
        if (isLeftUnaryNot) {
          return getReportDescriptor(right);
        }
        const initialScope = context.sourceCode.getScope(left);
        const isLeftNan = (left.type === T.Identifier && left.name === "NaN")
          || VAR
              .toStaticValue({ kind: "lazy", node: left, initialScope })
              .value === "NaN";
        if (isLeftNan) {
          return {
            messageId: "noLeakedConditionalRendering",
            node: left,
            data: { value: context.sourceCode.getText(left) },
          } as const;
        }
        const leftType = getConstrainedTypeAtLocation(services, left);
        const leftTypeVariants = inspectVariantTypes(unionTypeParts(leftType)); // eslint-disable-line @typescript-eslint/no-deprecated
        const isLeftValid = Array
          .from(leftTypeVariants.values())
          .every((type) => allowedVariants.some((allowed) => allowed === type));
        if (isLeftValid) {
          return getReportDescriptor(right);
        }
        return {
          messageId: "noLeakedConditionalRendering",
          node: left,
          data: { value: context.sourceCode.getText(left) },
        } as const;
      })
      .with({ type: T.ConditionalExpression }, ({ alternate, consequent }) => {
        return getReportDescriptor(consequent) ?? getReportDescriptor(alternate);
      })
      .with({ type: T.Identifier }, (n) => {
        const variable = VAR.findVariable(n.name, context.sourceCode.getScope(n));
        const variableDefNode = variable?.defs.at(0)?.node;
        return match(variableDefNode)
          .with({ init: P.select({ type: P.not(T.VariableDeclaration) }) }, getReportDescriptor)
          .otherwise(() => unit);
      })
      .otherwise(() => unit);
  }
  return {
    JSXExpressionContainer: flow(getReportDescriptor, RPT.make(context).send),
  };
}

// #endregion
