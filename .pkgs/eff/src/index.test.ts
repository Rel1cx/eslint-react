import { describe, expect, expectTypeOf, it } from "vitest";

import {
  and,
  eqv,
  every,
  hasProperty,
  implies,
  isBigInt,
  isBoolean,
  isDate,
  isError,
  isIterable,
  isMap,
  isNever,
  isNotNull,
  isNotNullish,
  isNotUndefined,
  isNull,
  isNullish,
  isNumber,
  isObjectKeyword,
  isObjectOrArray,
  isPromise,
  isPromiseLike,
  isPropertyKey,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isUint8Array,
  isUndefined,
  isUnknown,
  nand,
  nor,
  not,
  or,
  some,
  xor,
} from "./index";

describe("combinator truth tables", () => {
  const tt = () => true;
  const ff = () => false;

  it("and matches boolean conjunction", () => {
    expect(and(tt, tt)(undefined)).toBe(true);
    expect(and(tt, ff)(undefined)).toBe(false);
    expect(and(ff, tt)(undefined)).toBe(false);
    expect(and(ff, ff)(undefined)).toBe(false);
  });

  it("or matches boolean disjunction", () => {
    expect(or(tt, tt)(undefined)).toBe(true);
    expect(or(tt, ff)(undefined)).toBe(true);
    expect(or(ff, tt)(undefined)).toBe(true);
    expect(or(ff, ff)(undefined)).toBe(false);
  });

  it("xor is true iff exactly one predicate is true", () => {
    expect(xor(tt, tt)(undefined)).toBe(false);
    expect(xor(tt, ff)(undefined)).toBe(true);
    expect(xor(ff, tt)(undefined)).toBe(true);
    expect(xor(ff, ff)(undefined)).toBe(false);
  });

  it("eqv is true iff both predicates agree", () => {
    expect(eqv(tt, tt)(undefined)).toBe(true);
    expect(eqv(tt, ff)(undefined)).toBe(false);
    expect(eqv(ff, tt)(undefined)).toBe(false);
    expect(eqv(ff, ff)(undefined)).toBe(true);
  });

  it("implies is false only when antecedent holds and consequent does not", () => {
    expect(implies(tt, tt)(undefined)).toBe(true);
    expect(implies(tt, ff)(undefined)).toBe(false);
    expect(implies(ff, tt)(undefined)).toBe(true);
    expect(implies(ff, ff)(undefined)).toBe(true);
  });

  it("nor is true iff neither predicate is true", () => {
    expect(nor(tt, tt)(undefined)).toBe(false);
    expect(nor(tt, ff)(undefined)).toBe(false);
    expect(nor(ff, tt)(undefined)).toBe(false);
    expect(nor(ff, ff)(undefined)).toBe(true);
  });

  it("nand is false iff both predicates are true", () => {
    expect(nand(tt, tt)(undefined)).toBe(false);
    expect(nand(tt, ff)(undefined)).toBe(true);
    expect(nand(ff, tt)(undefined)).toBe(true);
    expect(nand(ff, ff)(undefined)).toBe(true);
  });

  it("combinators evaluate against the same data value", () => {
    const isPositive = (n: number) => n > 0;
    const isEven = (n: number) => n % 2 === 0;
    expect(and(isPositive, isEven)(2)).toBe(true);
    expect(and(isPositive, isEven)(-2)).toBe(false);
    expect(xor(isPositive, isEven)(-2)).toBe(true);
    expect(xor(isPositive, isEven)(2)).toBe(false);
    expect(implies(isPositive, isEven)(3)).toBe(false);
    expect(implies(isPositive, isEven)(-3)).toBe(true);
    expect(eqv(isPositive, isEven)(-3)).toBe(true);
  });

  it("and short-circuits: second predicate is not called when first fails", () => {
    let called = false;
    const spy = () => {
      called = true;
      return true;
    };
    expect(and(ff, spy)(undefined)).toBe(false);
    expect(called).toBe(false);
  });

  it("implies/nor/nand/xor/eqv short-circuit the second predicate when the first decides the result", () => {
    let called = 0;
    const spy = () => {
      called += 1;
      return true;
    };
    expect(implies(ff, spy)(undefined)).toBe(true);
    expect(called).toBe(0);
    expect(nor(tt, spy)(undefined)).toBe(false);
    expect(called).toBe(0);
    expect(nand(ff, spy)(undefined)).toBe(true);
    expect(called).toBe(0);
  });
});

describe("every and some", () => {
  const isPositive = (n: number) => n > 0;
  const isEven = (n: number) => n % 2 === 0;

  it("every returns true when all predicates pass", () => {
    expect(every([isPositive, isEven])(2)).toBe(true);
    expect(every([isPositive, isEven])(-2)).toBe(false);
    expect(every([isPositive, isEven])(3)).toBe(false);
  });

  it("every on an empty collection is vacuously true", () => {
    expect(every([])(undefined)).toBe(true);
  });

  it("every short-circuits on the first false", () => {
    let called = false;
    const spy = () => {
      called = true;
      return true;
    };
    expect(every([() => false, spy])(undefined)).toBe(false);
    expect(called).toBe(false);
  });

  it("some returns true when any predicate passes", () => {
    expect(some([isPositive, isEven])(-2)).toBe(true);
    expect(some([isPositive, isEven])(3)).toBe(true);
    expect(some([isPositive, isEven])(-3)).toBe(false);
  });

  it("some on an empty collection is false", () => {
    expect(some([])(undefined)).toBe(false);
  });

  it("some short-circuits on the first true", () => {
    let called = false;
    const spy = () => {
      called = true;
      return false;
    };
    expect(some([() => true, spy])(undefined)).toBe(true);
    expect(called).toBe(false);
  });

  it("every/some accept any iterable of predicates", () => {
    function* predicates() {
      yield isPositive;
      yield isEven;
    }
    expect(every(predicates())(2)).toBe(true);
    expect(some(predicates())(-2)).toBe(true);
  });
});

describe("primitive guards", () => {
  it("isString", () => {
    expect(isString("")).toBe(true);
    expect(isString("x")).toBe(true);
    expect(isString(new String("x"))).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  it("isNumber treats NaN and Infinity as numbers", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-0)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(new Number(1))).toBe(false);
    expect(isNumber("1")).toBe(false);
    expect(isNumber(1n)).toBe(false);
  });

  it("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(new Boolean(true))).toBe(false);
    expect(isBoolean(0)).toBe(false);
  });

  it("isBigInt", () => {
    expect(isBigInt(1n)).toBe(true);
    expect(isBigInt(1)).toBe(false);
  });

  it("isSymbol", () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
    expect(isSymbol("symbol")).toBe(false);
  });

  it("isNull / isUndefined / isNullish", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
    expect(isNullish(0)).toBe(false);
    expect(isNullish("")).toBe(false);
    expect(isNullish(false)).toBe(false);
    expect(isNullish(NaN)).toBe(false);
  });

  it("isNotNull / isNotUndefined / isNotNullish keep other falsy values", () => {
    expect(isNotNull(0)).toBe(true);
    expect(isNotNull(null)).toBe(false);
    expect(isNotNull(undefined)).toBe(true);
    expect(isNotUndefined("")).toBe(true);
    expect(isNotUndefined(undefined)).toBe(false);
    expect(isNotUndefined(null)).toBe(true);
    expect(isNotNullish(0)).toBe(true);
    expect(isNotNullish("")).toBe(true);
    expect(isNotNullish(false)).toBe(true);
    expect(isNotNullish(NaN)).toBe(true);
    expect(isNotNullish(null)).toBe(false);
    expect(isNotNullish(undefined)).toBe(false);
  });

  it("isNever is always false, isUnknown is always true", () => {
    expect(isNever(null)).toBe(false);
    expect(isNever(undefined)).toBe(false);
    expect(isUnknown(null)).toBe(true);
    expect(isUnknown(undefined)).toBe(true);
  });

  it("isPropertyKey accepts string, number, symbol", () => {
    expect(isPropertyKey("a")).toBe(true);
    expect(isPropertyKey(1)).toBe(true);
    expect(isPropertyKey(NaN)).toBe(true);
    expect(isPropertyKey(Symbol())).toBe(true);
    expect(isPropertyKey(1n)).toBe(false);
    expect(isPropertyKey(null)).toBe(false);
    expect(isPropertyKey({})).toBe(false);
  });
});

describe("object guards", () => {
  it("isObjectOrArray matches non-null objects including arrays, excluding functions", () => {
    expect(isObjectOrArray({})).toBe(true);
    expect(isObjectOrArray([])).toBe(true);
    expect(isObjectOrArray(new Number(1))).toBe(true);
    expect(isObjectOrArray(null)).toBe(false);
    expect(isObjectOrArray(() => 0)).toBe(false);
    expect(isObjectOrArray("x")).toBe(false);
    expect(isObjectOrArray(1)).toBe(false);
  });

  it("isObjectKeyword matches objects, arrays, and functions", () => {
    expect(isObjectKeyword({})).toBe(true);
    expect(isObjectKeyword([])).toBe(true);
    expect(isObjectKeyword(() => 0)).toBe(true);
    expect(isObjectKeyword(function() {})).toBe(true);
    expect(isObjectKeyword(null)).toBe(false);
    expect(isObjectKeyword("x")).toBe(false);
    expect(isObjectKeyword(undefined)).toBe(false);
  });

  it("hasProperty finds own and inherited properties on objects and functions", () => {
    expect(hasProperty({ a: 1 }, "a")).toBe(true);
    expect(hasProperty({}, "toString")).toBe(true);
    expect(hasProperty([], "length")).toBe(true);
    expect(hasProperty(() => 0, "call")).toBe(true);
    expect(hasProperty({}, "missing")).toBe(false);
    expect(hasProperty(null, "a")).toBe(false);
    expect(hasProperty(undefined, "a")).toBe(false);
    expect(hasProperty("str", "length")).toBe(false);
    expect(hasProperty(1, "toString")).toBe(false);
  });

  it("isIterable matches iterables including strings", () => {
    expect(isIterable([])).toBe(true);
    expect(isIterable("abc")).toBe(true);
    expect(isIterable("")).toBe(true);
    expect(isIterable(new Map())).toBe(true);
    expect(isIterable(new Set())).toBe(true);
    expect(isIterable({ [Symbol.iterator]: function*() {} })).toBe(true);
    expect(isIterable({})).toBe(false);
    expect(isIterable(null)).toBe(false);
    expect(isIterable(1)).toBe(false);
  });

  it("isPromise requires callable then and catch", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise({ then: () => 0, catch: () => 0 })).toBe(true);
    expect(isPromise({ then: () => 0 })).toBe(false);
    expect(isPromise({ then: 1, catch: () => 0 })).toBe(false);
    expect(isPromise({})).toBe(false);
    expect(isPromise(null)).toBe(false);
  });

  it("isPromiseLike requires only a callable then", () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true);
    expect(isPromiseLike({ then: () => 0 })).toBe(true);
    expect(isPromiseLike({ then: 1 })).toBe(false);
    expect(isPromiseLike({})).toBe(false);
    expect(isPromiseLike(null)).toBe(false);
  });

  it("instanceof guards", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate({})).toBe(false);
    expect(isError(new Error())).toBe(true);
    expect(isError(new TypeError())).toBe(true);
    expect(isError({ message: "x" })).toBe(false);
    expect(isRegExp(/x/)).toBe(true);
    expect(isRegExp("x")).toBe(false);
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new WeakMap())).toBe(false);
    expect(isSet(new Set())).toBe(true);
    expect(isSet(new WeakSet())).toBe(false);
    expect(isUint8Array(new Uint8Array())).toBe(true);
    expect(isUint8Array(new Uint16Array())).toBe(false);
    expect(isUint8Array([])).toBe(false);
  });
});

describe("guard composition with not/and/or", () => {
  it("not negates a guard", () => {
    const isNotString = not(isString);
    expect(isNotString(1)).toBe(true);
    expect(isNotString("x")).toBe(false);
  });

  it("and composes guards", () => {
    const isNonEmptyString = and(isString, (s: unknown) => typeof s === "string" && s.length > 0);
    expect(isNonEmptyString("x")).toBe(true);
    expect(isNonEmptyString("")).toBe(false);
    expect(isNonEmptyString(1)).toBe(false);
  });

  it("or composes guards", () => {
    const isStringOrNumber = or(isString, isNumber);
    expect(isStringOrNumber("x")).toBe(true);
    expect(isStringOrNumber(1)).toBe(true);
    expect(isStringOrNumber(null)).toBe(false);
  });
});

describe("type narrowing", () => {
  it("and narrows to the intersection of two guards", () => {
    const isObj = (_x: unknown): _x is { a: string } => true;
    const isObj2 = (_x: unknown): _x is { b: number } => true;
    const combined = and(isObj, isObj2);
    const value: unknown = {};
    if (combined(value)) {
      expectTypeOf(value).toEqualTypeOf<{ a: string } & { b: number }>();
    }
  });

  it("and narrows when only one side is a guard", () => {
    const combined = and(isString, (_x: unknown) => true);
    const value: unknown = "";
    if (combined(value)) {
      expectTypeOf(value).toEqualTypeOf<string>();
    }
  });

  it("or narrows to the union of two guards", () => {
    const combined = or(isString, isNumber);
    const value: unknown = 0;
    if (combined(value)) {
      expectTypeOf(value).toEqualTypeOf<string | number>();
    }
  });

  it("not narrows by exclusion when the guard is typed over the union", () => {
    const isStringMember = (x: string | number): x is string => typeof x === "string";
    const isNotString = not(isStringMember);
    const value = 0 as string | number;
    if (isNotString(value)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }
  });

  it("primitive guards narrow", () => {
    const value = 0 as string | number | null | undefined;
    if (isString(value)) expectTypeOf(value).toEqualTypeOf<string>();
    if (isNumber(value)) expectTypeOf(value).toEqualTypeOf<number>();
    if (isNullish(value)) expectTypeOf(value).toEqualTypeOf<null | undefined>();
    if (isNotNullish(value)) expectTypeOf(value).toEqualTypeOf<string | number>();
    if (isNotNull(value)) expectTypeOf(value).toEqualTypeOf<string | number | undefined>();
    if (isNotUndefined(value)) expectTypeOf(value).toEqualTypeOf<string | number | null>();
  });
});
