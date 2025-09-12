/* eslint-disable jsdoc/require-param */
import { isTypeFlagSet } from "ts-api-utils";
import { isMatching, P } from "ts-pattern";
import ts from "typescript";

/** @internal */
export { isFalseLiteralType, isTrueLiteralType } from "ts-api-utils";

/** @internal */
export const isAnyType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.TypeParameter | ts.TypeFlags.Any);

/** @internal */
export const isBigIntType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.BigIntLike);

/** @internal */
export const isBooleanType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.BooleanLike);

/** @internal */
export const isEnumType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.EnumLike);

/** @internal */
export const isFalsyBigIntType = (type: ts.Type) =>
  type.isLiteral() && isMatching({ value: { base10Value: "0" } }, type);

/** @internal */
export const isFalsyNumberType = (type: ts.Type) => type.isNumberLiteral() && type.value === 0;

/** @internal */
export const isFalsyStringType = (type: ts.Type) => type.isStringLiteral() && type.value === "";

/** @internal */
export const isNeverType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.Never);

/** @internal */
export const isNullishType = (type: ts.Type) =>
  isTypeFlagSet(type, ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.VoidLike);

/** @internal */
export const isNumberType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.NumberLike);

/** @internal */
export const isObjectType = (type: ts.Type) =>
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
  );

/** @internal */
export const isStringType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.StringLike);

/** @internal */
export const isTruthyBigIntType = (type: ts.Type) =>
  type.isLiteral() && isMatching({ value: { base10Value: P.not("0") } }, type);

/** @internal */
export const isTruthyNumberType = (type: ts.Type) => type.isNumberLiteral() && type.value !== 0;

/** @internal */
export const isTruthyStringType = (type: ts.Type) => type.isStringLiteral() && type.value !== "";

/** @internal */
export const isUnknownType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.Unknown);
