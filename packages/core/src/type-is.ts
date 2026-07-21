import { P, isMatching } from "ts-pattern";
import ts from "typescript";

function isFlagSet(allFlags: number, flag: number): boolean {
  return (allFlags & flag) !== 0;
}

function isFlagSetOnObject(obj: { flags: number }, flag: number): boolean {
  return isFlagSet(obj.flags, flag);
}

const isTypeFlagSet: (type: ts.Type, flag: ts.TypeFlags) => boolean = isFlagSetOnObject;

/**
 * Check if the type is a boolean literal type.
 * @param type The type to check.
 * @returns `true` if the type is a boolean literal type.
 */
export function isBooleanLiteralType<TType extends ts.Type>(type: TType): type is TType & {
  intrinsicName: "false" | "true";
} {
  return isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral);
}

/**
 * Check if the type is the `false` literal type.
 * @internal
 */
export const isFalseLiteralType = (type: ts.Type) => isBooleanLiteralType(type) && type.intrinsicName === "false";

/**
 * Check if the type is the `true` literal type.
 * @internal
 */
export const isTrueLiteralType = (type: ts.Type) => isBooleanLiteralType(type) && type.intrinsicName === "true";

/**
 * Check if the type is an any-like type.
 * @internal
 */
export const isAnyType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.TypeParameter | ts.TypeFlags.Any);

/**
 * Check if the type is a bigint-like type.
 * @internal
 */
export const isBigIntType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.BigIntLike);

/**
 * Check if the type is a boolean-like type.
 * @internal
 */
export const isBooleanType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.BooleanLike);

/**
 * Check if the type is an enum-like type.
 * @internal
 */
export const isEnumType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.EnumLike);

/**
 * Check if the type is a falsy bigint literal type.
 * @internal
 */
export const isFalsyBigIntType = (type: ts.Type) => type.isLiteral() && isMatching({ value: { base10Value: "0" } }, type);

/**
 * Check if the type is a falsy number literal type.
 * @internal
 */
export const isFalsyNumberType = (type: ts.Type) => type.isNumberLiteral() && type.value === 0;

/**
 * Check if the type is a falsy string literal type.
 * @internal
 */
export const isFalsyStringType = (type: ts.Type) => type.isStringLiteral() && type.value === "";

/**
 * Check if the type is the never type.
 * @internal
 */
export const isNeverType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.Never);

/**
 * Check if the type is a nullish type (null, undefined, or void).
 * @internal
 */
export const isNullishType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.Null | ts.TypeFlags.Undefined | ts.TypeFlags.VoidLike);

/**
 * Check if the type is a number-like type.
 * @internal
 */
export const isNumberType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.NumberLike);

/**
 * Check if the type is an object type.
 * @internal
 */
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

/**
 * Check if the type is a string-like type.
 * @internal
 */
export const isStringType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.StringLike);

/**
 * Check if the type is a truthy bigint literal type.
 * @internal
 */
export const isTruthyBigIntType = (type: ts.Type) => type.isLiteral() && isMatching({ value: { base10Value: P.not("0") } }, type);

/**
 * Check if the type is a truthy number literal type.
 * @internal
 */
export const isTruthyNumberType = (type: ts.Type) => type.isNumberLiteral() && type.value !== 0;

/**
 * Check if the type is a truthy string literal type.
 * @internal
 */
export const isTruthyStringType = (type: ts.Type) => type.isStringLiteral() && type.value !== "";

/**
 * Check if the type is the unknown type.
 * @internal
 */
export const isUnknownType = (type: ts.Type) => isTypeFlagSet(type, ts.TypeFlags.Unknown);
