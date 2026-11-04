import { createTypeTestBed } from "@local/testkit";
import dedent from "dedent";
import { describe, expect, it } from "vitest";

import { type TypeVariant, getTypeVariants } from "./type-variant";

const bed = createTypeTestBed({
  "/fixture.ts": dedent`
    enum Color { Red, Green }
    declare const anyType: any;
    declare const bigIntType: bigint;
    declare const falsyBigIntType: 0n;
    declare const truthyBigIntType: 1n;
    declare const booleanType: boolean;
    declare const falseType: false;
    declare const trueType: true;
    declare const enumType: Color;
    declare const neverType: never;
    declare const nullType: null;
    declare const numberType: number;
    declare const falsyNumberType: 0;
    declare const truthyNumberType: 1;
    declare const objectType: { a: 1 };
    declare const stringType: string;
    declare const falsyStringType: "";
    declare const truthyStringType: "a";
    declare const unknownType: unknown;
    declare const nullishStringType: null | string;
    declare const mixedStringType: "" | "a";
    declare const mixedNumberType: 0 | 1;
  `,
});

function variantsOf(name: string): TypeVariant[] {
  return [...getTypeVariants(bed.getUnionPartsOf(name))].sort();
}

describe("getTypeVariants", () => {
  it.each(
    [
      ["stringType", ["string"]],
      ["truthyStringType", ["truthy string"]],
      ["falsyStringType", ["falsy string"]],
      ["mixedStringType", ["string"]],
      ["numberType", ["number"]],
      ["truthyNumberType", ["truthy number"]],
      ["falsyNumberType", ["falsy number"]],
      ["mixedNumberType", ["number"]],
      ["bigIntType", ["bigint"]],
      ["truthyBigIntType", ["truthy bigint"]],
      ["falsyBigIntType", ["falsy bigint"]],
      ["trueType", ["truthy boolean"]],
      ["falseType", ["falsy boolean"]],
      // An unsplit boolean yields both literal constituents.
      ["booleanType", ["boolean"]],
      ["nullType", ["nullish"]],
      // Unknown short-circuits all other variants.
      ["unknownType", ["unknown"]],
      ["anyType", ["any"]],
      ["neverType", ["never"]],
      // A numeric enum splits into its number-like members, so it produces both "enum" and "number".
      ["enumType", ["enum", "number"]],
      ["objectType", ["object"]],
      ["nullishStringType", ["nullish", "string"]],
    ] as const,
  )("%s has variants %j", (name, expected) => {
    expect(variantsOf(name)).toEqual([...expected].sort());
  });
});
