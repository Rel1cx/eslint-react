/* eslint-disable jsdoc/require-param */
import { P, isMatching } from "ts-pattern";
import ts from "typescript";

function isFlagSet(allFlags: number, flag: number): boolean {
  return (allFlags & flag) !== 0;
}

function isFlagSetOnObject(obj: { flags: number }, flag: number): boolean {
  return isFlagSet(obj.flags, flag);
}

const isTypeFlagSet: (type: ts.Type, flag: ts.TypeFlags) => boolean = isFlagSetOnObject;

export function isBooleanLiteralType<TType extends ts.Type>(type: TType): type is TType & {
  intrinsicName: "false" | "true";
} {
  return isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral);
}

/** @internal */
export const isFalseLiteralType = (type: ts.Type) => isBooleanLiteralType(type) && type.intrinsicName === "false";

/** @internal */
export const isTrueLiteralType = (type: ts.Type) => isBooleanLiteralType(type) && type.intrinsicName === "true";

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
