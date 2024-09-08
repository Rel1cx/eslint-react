import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import * as VAR from "@eslint-react/var";
import type { Variable } from "@typescript-eslint/scope-manager";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { isFalseLiteralType, isTrueLiteralType, isTypeFlagSet, unionTypeParts } from "ts-api-utils";
import { isMatching, match, P } from "ts-pattern";
import ts from "typescript";

import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-leaked-conditional-rendering";

export type MessageID = CamelCase<typeof RULE_NAME>;

// #endregion

// #region Types

/** The types we care about */
/* eslint-disable perfectionist/sort-union-types */
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
/* eslint-enable perfectionist/sort-union-types */

// Allowed left node type variants
const allowedVariants = [
  "any",
  "boolean",
  "nullish",
  "object",
  "string",
  "falsy string",
  "falsy boolean",
  "truthy bigint",
  "truthy boolean",
  "truthy number",
  "truthy string",
] as const satisfies VariantType[];

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
  // If incoming type is either "true" or "false", there will be one type
  // object with intrinsicName set accordingly
  // If incoming type is boolean, there will be two type objects with
  // intrinsicName set "true" and "false" each because of ts-api-utils.unionTypeParts()
  switch (true) {
    case booleans.length === 1 && !!booleans[0]: {
      const [first] = booleans;
      const evaluated = F.pipe(
        match<typeof first, O.Option<VariantType>>(first)
          .when(isTrueLiteralType, () => O.some("truthy boolean"))
          .when(isFalseLiteralType, () => O.some("falsy boolean"))
          .otherwise(O.none),
      );
      O.map(evaluated, v => variantTypes.add(v));
      break;
    }
    case booleans.length === 2: {
      variantTypes.add("boolean");
      break;
    }
  }
  const strings = types.filter(tsHelpers.isStringType);
  if (strings.length > 0) {
    const evaluated = match<ts.Type[], VariantType>(strings)
      .when(types => types.every(tsHelpers.isTruthyStringType), F.constant("truthy string"))
      .when(types => types.every(tsHelpers.isFalsyStringType), F.constant("falsy string"))
      .otherwise(F.constant("string"));
    variantTypes.add(evaluated);
  }
  const bigints = types.filter(tsHelpers.isBigIntType);
  if (bigints.length > 0) {
    const evaluated = match<ts.Type[], VariantType>(bigints)
      .when(types => types.every(tsHelpers.isTruthyBigIntType), F.constant("truthy bigint"))
      .when(types => types.every(tsHelpers.isFalsyBigIntType), F.constant("falsy bigint"))
      .otherwise(F.constant("bigint"));
    variantTypes.add(evaluated);
  }
  const numbers = types.filter(tsHelpers.isNumberType);
  if (numbers.length > 0) {
    const evaluated = match<ts.Type[], VariantType>(numbers)
      .when(types => types.every(tsHelpers.isTruthyNumberType), F.constant("truthy number"))
      .when(types => types.every(tsHelpers.isFalsyNumberType), F.constant("falsy number"))
      .otherwise(F.constant("number"));
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

function isInitExpression(
  node:
    | TSESTree.Expression
    | TSESTree.LetOrConstOrVarDeclaration,
) {
  return node.type !== AST_NODE_TYPES.VariableDeclaration;
}

function getVariableInitExpression(at: number) {
  return (variable: Variable): O.Option<TSESTree.Expression> => {
    return F.pipe(
      O.some(variable),
      O.flatMapNullable(v => v.defs.at(at)),
      O.flatMap(d =>
        "init" in d.node
          ? O.fromNullable(d.node.init)
          : O.none()
      ),
      O.filter(isInitExpression),
    );
  };
}

// #endregion

// #region Rule Definition

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow problematic leaked values from being rendered",
    },
    messages: {
      noLeakedConditionalRendering:
        "Potential leaked value {{value}} that might cause unintentionally rendered values or rendering crashes.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.text.includes("&&") && !context.sourceCode.text.includes("?")) return {};
    const services = ESLintUtils.getParserServices(context, false);
    function getReportDescriptor(node: TSESTree.Expression): O.Option<ReportDescriptor<MessageID>> {
      return match<typeof node, O.Option<ReportDescriptor<MessageID>>>(node)
        .when(AST.isJSX, O.none)
        .with({ type: AST_NODE_TYPES.LogicalExpression, operator: "&&" }, ({ left, right }) => {
          const isLeftUnaryNot = isMatching({ type: AST_NODE_TYPES.UnaryExpression, operator: "!" }, left);
          if (isLeftUnaryNot) return getReportDescriptor(right);
          const initialScope = context.sourceCode.getScope(left);
          const isLeftNan = isMatching({ type: AST_NODE_TYPES.Identifier, name: "NaN" }, left)
            || getStaticValue(left, initialScope)?.value === "NaN";
          if (isLeftNan) {
            return O.some({
              messageId: "noLeakedConditionalRendering",
              node: left,
              data: { value: context.sourceCode.getText(left) },
            });
          }
          const leftType = getConstrainedTypeAtLocation(services, left);
          const leftTypeVariants = inspectVariantTypes(unionTypeParts(leftType));
          const isLeftValid = Array
            .from(leftTypeVariants.values())
            .every(type => allowedVariants.some(allowed => allowed === type));
          if (isLeftValid) return getReportDescriptor(right);
          return O.some({
            messageId: "noLeakedConditionalRendering",
            node: left,
            data: { value: context.sourceCode.getText(left) },
          });
        })
        .with({ type: AST_NODE_TYPES.ConditionalExpression }, ({ alternate, consequent }) => {
          return O.orElse(getReportDescriptor(consequent), () => getReportDescriptor(alternate));
        })
        .with({ type: AST_NODE_TYPES.Identifier }, (n) => {
          const initialScope = context.sourceCode.getScope(n);
          return F.pipe(
            VAR.findVariable(n.name, initialScope),
            O.flatMap(getVariableInitExpression(0)),
            O.flatMap(getReportDescriptor),
          );
        })
        .otherwise(O.none);
    }
    const ruleFunction = F.flow(getReportDescriptor, O.map(context.report), F.constVoid);
    return {
      "JSXExpressionContainer > ConditionalExpression": ruleFunction,
      "JSXExpressionContainer > LogicalExpression": ruleFunction,
    };
  },
  defaultOptions: [],
});

// #endregion
