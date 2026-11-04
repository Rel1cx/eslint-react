import { createTypeTestBed } from "@local/testkit";
import dedent from "dedent";
import type ts from "typescript";
import { describe, expect, it } from "vitest";

import * as TypeIs from "./type-is";

const bed = createTypeTestBed({
  "/fixture.ts": dedent`
    enum Color { Red, Green }
    declare const anAny: any;
    declare const aBigInt: bigint;
    declare const falsyBigInt: 0n;
    declare const truthyBigInt: 1n;
    declare const aBoolean: boolean;
    declare const aFalse: false;
    declare const aTrue: true;
    declare const anEnum: Color;
    declare const enumMember: Color.Red;
    declare const aFunction: () => void;
    declare const aNever: never;
    declare const aNull: null;
    declare const anUndefined: undefined;
    declare const aVoid: void;
    declare const aNumber: number;
    declare const falsyNumber: 0;
    declare const truthyNumber: 1;
    declare const anObject: { a: 1 };
    declare const aString: string;
    declare const falsyString: "";
    declare const truthyString: "a";
    declare const anUnknown: unknown;
  `,
});

type Case = [name: string, predicate: (type: ts.Type) => boolean, expected: boolean];

const cases: Case[] = [
  ["aTrue", TypeIs.isBooleanLiteralType, true],
  ["aFalse", TypeIs.isBooleanLiteralType, true],
  ["aBoolean", TypeIs.isBooleanLiteralType, false],
  ["aString", TypeIs.isBooleanLiteralType, false],

  ["aFalse", TypeIs.isFalseLiteralType, true],
  ["aTrue", TypeIs.isFalseLiteralType, false],
  ["aBoolean", TypeIs.isFalseLiteralType, false],

  ["aTrue", TypeIs.isTrueLiteralType, true],
  ["aFalse", TypeIs.isTrueLiteralType, false],
  ["aBoolean", TypeIs.isTrueLiteralType, false],

  ["anAny", TypeIs.isAnyType, true],
  ["anUnknown", TypeIs.isAnyType, false],
  ["aString", TypeIs.isAnyType, false],

  ["aBigInt", TypeIs.isBigIntType, true],
  ["truthyBigInt", TypeIs.isBigIntType, true],
  ["aNumber", TypeIs.isBigIntType, false],

  ["aBoolean", TypeIs.isBooleanType, true],
  ["aTrue", TypeIs.isBooleanType, true],
  ["aString", TypeIs.isBooleanType, false],

  ["anEnum", TypeIs.isEnumType, true],
  ["enumMember", TypeIs.isEnumType, true],
  ["aNumber", TypeIs.isEnumType, false],

  ["falsyBigInt", TypeIs.isFalsyBigIntType, true],
  ["truthyBigInt", TypeIs.isFalsyBigIntType, false],
  ["aBigInt", TypeIs.isFalsyBigIntType, false],

  ["falsyNumber", TypeIs.isFalsyNumberType, true],
  ["truthyNumber", TypeIs.isFalsyNumberType, false],
  ["aNumber", TypeIs.isFalsyNumberType, false],

  ["falsyString", TypeIs.isFalsyStringType, true],
  ["truthyString", TypeIs.isFalsyStringType, false],
  ["aString", TypeIs.isFalsyStringType, false],

  ["aNever", TypeIs.isNeverType, true],
  ["anUnknown", TypeIs.isNeverType, false],

  ["aNull", TypeIs.isNullishType, true],
  ["anUndefined", TypeIs.isNullishType, true],
  ["aVoid", TypeIs.isNullishType, true],
  ["aString", TypeIs.isNullishType, false],

  ["aNumber", TypeIs.isNumberType, true],
  ["falsyNumber", TypeIs.isNumberType, true],
  // Enum members carry the EnumLiteral flag, which is part of NumberLike.
  ["enumMember", TypeIs.isNumberType, true],
  // An unsplit numeric enum is a union of its members in TS 6, so the union itself is not number-like.
  ["anEnum", TypeIs.isNumberType, false],
  ["aString", TypeIs.isNumberType, false],

  ["anObject", TypeIs.isObjectType, true],
  ["aFunction", TypeIs.isObjectType, true],
  ["aString", TypeIs.isObjectType, false],
  ["aNull", TypeIs.isObjectType, false],
  ["anAny", TypeIs.isObjectType, false],
  ["anUnknown", TypeIs.isObjectType, false],
  ["aNever", TypeIs.isObjectType, false],
  ["anEnum", TypeIs.isObjectType, true],
  ["enumMember", TypeIs.isObjectType, false],

  ["aString", TypeIs.isStringType, true],
  ["truthyString", TypeIs.isStringType, true],
  ["aNumber", TypeIs.isStringType, false],

  ["truthyBigInt", TypeIs.isTruthyBigIntType, true],
  ["falsyBigInt", TypeIs.isTruthyBigIntType, false],
  ["aBigInt", TypeIs.isTruthyBigIntType, false],

  ["truthyNumber", TypeIs.isTruthyNumberType, true],
  ["falsyNumber", TypeIs.isTruthyNumberType, false],
  ["aNumber", TypeIs.isTruthyNumberType, false],

  ["truthyString", TypeIs.isTruthyStringType, true],
  ["falsyString", TypeIs.isTruthyStringType, false],
  ["aString", TypeIs.isTruthyStringType, false],

  ["anUnknown", TypeIs.isUnknownType, true],
  ["anAny", TypeIs.isUnknownType, false],
];

describe("type-is predicates", () => {
  it.each(cases)("%s matches as %s", (name, predicate, expected) => {
    expect(predicate(bed.getTypeOf(name))).toBe(expected);
  });
});
