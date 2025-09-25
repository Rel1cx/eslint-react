import { match } from "ts-pattern";
import type ts from "typescript";
import {
  isAnyType,
  isBigIntType,
  isBooleanType,
  isEnumType,
  isFalseLiteralType,
  isFalsyBigIntType,
  isFalsyNumberType,
  isFalsyStringType,
  isNeverType,
  isNullishType,
  isNumberType,
  isObjectType,
  isStringType,
  isTrueLiteralType,
  isTruthyBigIntType,
  isTruthyNumberType,
  isTruthyStringType,
  isUnknownType,
} from "./type-is";

export type TypeVariant =
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

/**
 * Ported from https://github.com/typescript-eslint/typescript-eslint/blob/eb736bbfc22554694400e6a4f97051d845d32e0b/packages/eslint-plugin/src/rules/strict-boolean-expressions.ts#L826 with some enhancements
 * Get the variants of an array of types.
 * @param types The types to get the variants of
 * @returns The variants of the types
 * @internal
 */
export function getTypeVariants(types: ts.Type[]) {
  const variants = new Set<TypeVariant>();
  if (types.some(isUnknownType)) {
    variants.add("unknown");
    return variants;
  }
  if (types.some(isNullishType)) {
    variants.add("nullish");
  }
  const booleans = types.filter(isBooleanType);
  const boolean0 = booleans[0];
  // If incoming type is either "true" or "false", there will be one type
  // object with intrinsicName set accordingly
  // If incoming type is boolean, there will be two type objects with
  // intrinsicName set "true" and "false" each because of ts-api-utils.unionTypeParts()
  if (booleans.length === 1 && boolean0 != null) {
    if (isFalseLiteralType(boolean0)) {
      variants.add("falsy boolean");
    } else if (isTrueLiteralType(boolean0)) {
      variants.add("truthy boolean");
    }
  } else if (booleans.length === 2) {
    variants.add("boolean");
  }
  const strings = types.filter(isStringType);
  if (strings.length > 0) {
    const evaluated = match<ts.Type[], TypeVariant>(strings)
      .when((types) => types.every(isTruthyStringType), () => "truthy string")
      .when((types) => types.every(isFalsyStringType), () => "falsy string")
      .otherwise(() => "string" as const);
    variants.add(evaluated);
  }
  const bigints = types.filter(isBigIntType);
  if (bigints.length > 0) {
    const evaluated = match<ts.Type[], TypeVariant>(bigints)
      .when((types) => types.every(isTruthyBigIntType), () => "truthy bigint")
      .when((types) => types.every(isFalsyBigIntType), () => "falsy bigint")
      .otherwise(() => "bigint");
    variants.add(evaluated);
  }
  const numbers = types.filter(isNumberType);
  if (numbers.length > 0) {
    const evaluated = match<ts.Type[], TypeVariant>(numbers)
      .when((types) => types.every(isTruthyNumberType), () => "truthy number")
      .when((types) => types.every(isFalsyNumberType), () => "falsy number")
      .otherwise(() => "number" as const);
    variants.add(evaluated);
  }
  if (types.some(isEnumType)) {
    variants.add("enum");
  }
  if (types.some(isObjectType)) {
    variants.add("object");
  }
  if (types.some(isAnyType)) {
    variants.add("any");
  }
  if (types.some(isNeverType)) {
    variants.add("never");
  }
  return variants;
}
