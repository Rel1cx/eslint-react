import { describe, expect, expectTypeOf, it, vi } from "vitest";

import {
  Class,
  Mixin,
  Prototype,
  SK,
  absurd,
  and,
  apply,
  cast,
  compose,
  constFalse,
  constNull,
  constTrue,
  constUndefined,
  constVoid,
  constant,
  dropWhile,
  dual,
  eqv,
  every,
  flip,
  flow,
  getOrInsert,
  getOrInsertComputed,
  hasProperty,
  hole,
  identity,
  implies,
  isArray,
  isBigInt,
  isBoolean,
  isDate,
  isError,
  isFunction,
  isIterable,
  isMap,
  isNever,
  isNotNull,
  isNotNullish,
  isNotUndefined,
  isNull,
  isNullish,
  isNumber,
  isObject,
  isObjectKeyword,
  isObjectOrArray,
  isPromise,
  isPromiseLike,
  isPropertyKey,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isTruthy,
  isUint8Array,
  isUndefined,
  isUnknown,
  memoize,
  nand,
  nor,
  not,
  or,
  pipe,
  pipeArguments,
  satisfies,
  some,
  takeWhile,
  tupled,
  untupled,
  xor,
} from "./index";
import type { FunctionN, LazyArg, Pipeable, PipeableConstructor, Pretty } from "./index";

// #region Function

describe("pipe, flow, and dual", () => {
  it("pipe applies functions from left to right", () => {
    expect(pipe(1)).toBe(1);
    expect(pipe(1, (n) => n + 1)).toBe(2);
    expect(pipe(1, (n) => n + 1, (n) => n * 2)).toBe(4);
  });

  it("flow composes functions from left to right", () => {
    const len = (s: string): number => s.length;
    const double = (n: number): number => n * 2;
    expect(flow(len, double)("aaa")).toBe(6);
    expect(flow(double)(2)).toBe(4);
  });

  it("pipeArguments applies IArguments from left to right", () => {
    function run(..._fns: Array<(x: unknown) => unknown>): unknown {
      return pipeArguments(1, arguments);
    }
    expect(run()).toBe(1);
    expect(run((n) => (n as number) + 1, (n) => (n as number) * 2)).toBe(4);
    expect(run(...Array.from({ length: 10 }, () => (n: unknown) => (n as number) + 1))).toBe(11);
  });

  it("dual supports data-first and data-last call styles by arity", () => {
    const sum = dual<
      (that: number) => (self: number) => number,
      (self: number, that: number) => number
    >(2, (self, that) => self + that);
    expect(sum(2, 3)).toBe(5);
    expect(sum(3)(2)).toBe(5);
    expect(pipe(2, sum(3))).toBe(5);
  });

  it("dual supports a predicate to select the call style", () => {
    const sum = dual<
      (that: number) => (self: number) => number,
      (self: number, that: number) => number
    >((args) => args.length === 2, (self, that) => self + that);
    expect(sum(2, 3)).toBe(5);
    expect(sum(3)(2)).toBe(5);
  });

  it("dual rejects arities 0 and 1", () => {
    expect(() => dual<() => number, () => number>(0, () => 0)).toThrow(RangeError);
    expect(() => dual<(a: number) => number, (a: number) => number>(1, (a) => a)).toThrow(RangeError);
  });

  it("dual supports arities greater than 3", () => {
    const sum4 = dual<
      (b: number, c: number, d: number) => (a: number) => number,
      (a: number, b: number, c: number, d: number) => number
    >(4, (a, b, c, d) => a + b + c + d);
    expect(sum4(1, 2, 3, 4)).toBe(10);
    expect(sum4(2, 3, 4)(1)).toBe(10);
  });
});

describe("function combinators", () => {
  it("apply passes a value into a unary function", () => {
    expect(apply(2)((n: number) => n * 3)).toBe(6);
  });

  it("identity returns its input unchanged", () => {
    const value = {};
    expect(identity(5)).toBe(5);
    expect(identity(value)).toBe(value);
  });

  it("satisfies returns its input", () => {
    const value = satisfies<number>()(5 as const);
    expect(value).toBe(5);
    expectTypeOf(value).toEqualTypeOf<5>();
  });

  it("cast returns its input unchanged", () => {
    const value = cast<number, string>(1);
    expect(value).toBe(1);
    expectTypeOf(value).toEqualTypeOf<string>();
  });

  it("flip reverses curried arguments", () => {
    const f = (a: number) => (b: string) => a - b.length;
    expect(flip(f)("aaa")(2)).toBe(-1);
  });

  it("compose composes two unary functions", () => {
    const increment = (n: number) => n + 1;
    const square = (n: number) => n * n;
    expect(compose(increment, square)(2)).toBe(9);
    expect(compose(square)(increment)(2)).toBe(9);
  });

  it("absurd throws when called", () => {
    expect(() => absurd(undefined as never)).toThrow("Called `absurd` function which should be uncallable");
  });

  it("tupled converts an argument list to a tuple", () => {
    const sum = tupled((x: number, y: number) => x + y);
    expect(sum([1, 2])).toBe(3);
  });

  it("untupled converts a tuple to an argument list", () => {
    const first = untupled((tuple: [number, string]) => tuple[0]);
    expect(first(1, "a")).toBe(1);
  });

  it("hole throws when evaluated", () => {
    expect(() => hole<number>()).toThrow("Called `absurd` function which should be uncallable");
  });

  it("SK returns the second argument", () => {
    expect(SK(0, "hello")).toBe("hello");
  });
});

describe("constants", () => {
  it("constant returns the same value on every call", () => {
    const value = { n: 1 };
    const get = constant(value);
    expect(get()).toBe(value);
    expect(get()).toBe(value);
  });

  it("constTrue / constFalse / constNull / constUndefined / constVoid", () => {
    expect(constTrue()).toBe(true);
    expect(constFalse()).toBe(false);
    expect(constNull()).toBeNull();
    expect(constUndefined()).toBeUndefined();
    expect(constVoid()).toBeUndefined();
  });
});

describe("Pipeable", () => {
  it("Prototype provides a reusable pipe method", () => {
    const value = { ...Prototype, n: 1 };
    expect(value.pipe((self) => self.n + 1)).toBe(2);
  });

  it("Class provides a base constructor with pipe", () => {
    class Box extends Class {
      readonly n: number;

      constructor(n: number) {
        super();
        this.n = n;
      }
    }
    expect(new Box(2).pipe((self) => self.n * 3)).toBe(6);
  });

  it("Mixin adds pipe to an existing class", () => {
    class Base {
      readonly n: number;

      constructor(n: number) {
        this.n = n;
      }
    }
    const Piped = Mixin(Base);
    const instance = new Piped(2) as unknown as Base & Pipeable;
    expect(instance.n).toBe(2);
    expect(instance.pipe((self) => self.n + 1)).toBe(3);
  });
});

describe("memoize", () => {
  it("caches primitive keys by value", () => {
    const f = vi.fn((n: number) => n * 2);
    const memoized = memoize(f);
    expect(memoized(2)).toBe(4);
    expect(memoized(2)).toBe(4);
    expect(f).toHaveBeenCalledTimes(1);
    expect(memoized(3)).toBe(6);
    expect(f).toHaveBeenCalledTimes(2);
  });

  it("caches object keys by identity", () => {
    const f = vi.fn((value: { n: number }) => value.n + 1);
    const memoized = memoize(f);
    const key = { n: 1 };
    expect(memoized(key)).toBe(2);
    expect(memoized(key)).toBe(2);
    expect(f).toHaveBeenCalledTimes(1);
    expect(memoized({ n: 1 })).toBe(2);
    expect(f).toHaveBeenCalledTimes(2);
  });
});

// #endregion

// #region Predicate

describe("predicate combinators", () => {
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
  it("isString matches primitive strings", () => {
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

  it("isBoolean matches primitive booleans", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(new Boolean(true))).toBe(false);
    expect(isBoolean(0)).toBe(false);
  });

  it("isBigInt matches primitive bigints", () => {
    expect(isBigInt(1n)).toBe(true);
    expect(isBigInt(1)).toBe(false);
  });

  it("isSymbol matches primitive symbols", () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
    expect(isSymbol("symbol")).toBe(false);
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

  it("isTruthy mirrors JavaScript truthiness", () => {
    expect(isTruthy(1)).toBe(true);
    expect(isTruthy("x")).toBe(true);
    expect(isTruthy([])).toBe(true);
    expect(isTruthy(0)).toBe(false);
    expect(isTruthy("")).toBe(false);
    expect(isTruthy(null)).toBe(false);
    expect(isTruthy(undefined)).toBe(false);
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
});

describe("function guards", () => {
  it("isFunction matches callable values", () => {
    expect(isFunction(() => 0)).toBe(true);
    expect(isFunction(function() {})).toBe(true);
    expect(isFunction(async () => 0)).toBe(true);
    expect(isFunction(function*() {})).toBe(true);
    expect(isFunction(class {})).toBe(true);
    expect(isFunction({})).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction("function")).toBe(false);
  });
});

describe("object guards", () => {
  it("isArray matches arrays only", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2])).toBe(true);
    expect(isArray([1, 2] as const)).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray("abc")).toBe(false);
    expect(isArray(new Uint8Array())).toBe(false);
    expect(isArray(null)).toBe(false);
  });

  it("isObject matches non-null, non-array objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject([])).toBe(false);
    expect(isObject(() => 0)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject("x")).toBe(false);
  });

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
    expect(hasProperty("a")({ a: 1 })).toBe(true);
    expect(hasProperty("missing")({})).toBe(false);
  });

  it("isSet matches Set instances", () => {
    expect(isSet(new Set())).toBe(true);
    expect(isSet(new WeakSet())).toBe(false);
  });

  it("isMap matches Map instances", () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new WeakMap())).toBe(false);
  });

  it("isDate matches Date instances", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate({})).toBe(false);
  });

  it("isError matches Error instances", () => {
    expect(isError(new Error())).toBe(true);
    expect(isError(new TypeError())).toBe(true);
    expect(isError({ message: "x" })).toBe(false);
  });

  it("isRegExp matches RegExp instances", () => {
    expect(isRegExp(/x/)).toBe(true);
    expect(isRegExp("x")).toBe(false);
  });

  it("isUint8Array matches Uint8Array instances", () => {
    expect(isUint8Array(new Uint8Array())).toBe(true);
    expect(isUint8Array(new Uint16Array())).toBe(false);
    expect(isUint8Array([])).toBe(false);
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

// #endregion

// #region Map & Set

describe("map & set helpers", () => {
  it("getOrInsert returns existing values without overwriting", () => {
    const map = new Map<string, number>([["a", 1]]);
    expect(getOrInsert(map, "a", 2)).toBe(1);
    expect(map.get("a")).toBe(1);
  });

  it("getOrInsert inserts and returns the default for missing keys", () => {
    const map = new Map<string, number>();
    expect(getOrInsert(map, "a", 1)).toBe(1);
    expect(map.get("a")).toBe(1);

    const key = {};
    const weakMap = new WeakMap<object, number>();
    expect(getOrInsert(weakMap, key, 2)).toBe(2);
    expect(getOrInsert(weakMap, key, 3)).toBe(2);
  });

  it("getOrInsertComputed only computes for missing keys", () => {
    const map = new Map<string, number>([["a", 1]]);
    const compute = vi.fn((key: string) => key.length);
    expect(getOrInsertComputed(map, "a", compute)).toBe(1);
    expect(compute).not.toHaveBeenCalled();
    expect(getOrInsertComputed(map, "abc", compute)).toBe(3);
    expect(compute).toHaveBeenCalledWith("abc");
    expect(map.get("abc")).toBe(3);
  });

  it("getOrInsertComputed supports WeakMap", () => {
    const key = {};
    const weakMap = new WeakMap<object, number>();
    expect(getOrInsertComputed(weakMap, key, () => 1)).toBe(1);
    expect(getOrInsertComputed(weakMap, key, () => 2)).toBe(1);
  });
});

// #endregion

// #region Array

describe("array helpers", () => {
  it("dropWhile drops the leading matching elements", () => {
    expect(dropWhile([1, 2, 3, 4, 5], (x) => x < 4)).toEqual([4, 5]);
    expect(dropWhile([1, 2, 3], (x) => x < 4)).toEqual([]);
    expect(dropWhile<number>((x) => x < 3)([1, 2, 3, 4])).toEqual([3, 4]);
  });

  it("dropWhile passes the element index to the predicate", () => {
    expect(dropWhile([1, 2, 3, 4], (_, i) => i < 2)).toEqual([3, 4]);
  });

  it("dropWhile accepts any iterable", () => {
    expect(dropWhile(new Set([1, 2, 3, 4]), (x) => x < 3)).toEqual([3, 4]);
  });

  it("takeWhile keeps the leading matching elements", () => {
    expect(takeWhile([1, 3, 2, 4, 1, 2], (x) => x < 4)).toEqual([1, 3, 2]);
    expect(takeWhile([4, 1], (x) => x < 4)).toEqual([]);
    expect(takeWhile<number>((x) => x < 3)([1, 2, 3, 4])).toEqual([1, 2]);
  });

  it("takeWhile supports refinements", () => {
    const input: Array<number | string> = [1, 2, "a", 3];
    const result = takeWhile(input, (x): x is number => typeof x === "number");
    expect(result).toEqual([1, 2]);
    expectTypeOf(result).toEqualTypeOf<Array<number>>();
  });

  it("takeWhile accepts any iterable", () => {
    expect(takeWhile(new Set([1, 2, 3]), (x) => x < 3)).toEqual([1, 2]);
  });
});

// #endregion

// #region Types

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

  it("isFunction narrows to Function", () => {
    const value = {} as unknown;
    if (isFunction(value)) {
      expectTypeOf(value).toEqualTypeOf<Function>();
    }
  });

  it("isArray narrows to an array", () => {
    const value = {} as unknown;
    if (isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<Array<unknown>>();
    }
  });

  it("isObject narrows to an object record", () => {
    const value = {} as unknown;
    if (isObject(value)) {
      expectTypeOf(value).toEqualTypeOf<{ [x: PropertyKey]: unknown }>();
    }
  });
});

describe("type utilities", () => {
  it("Pretty flattens intersections", () => {
    expectTypeOf<Pretty<{ a: 1 } & { b: 2 }>>().toEqualTypeOf<{ a: 1; b: 2 }>();
  });

  it("Pipeable / PipeableConstructor match their implementations", () => {
    expectTypeOf(Class).toExtend<PipeableConstructor>();
    expectTypeOf(Prototype).toExtend<Pipeable>();
  });

  it("LazyArg is a zero-argument function", () => {
    expectTypeOf<LazyArg<number>>().toEqualTypeOf<() => number>();
  });

  it("FunctionN describes a function with a tuple argument list", () => {
    expectTypeOf<FunctionN<[number, string], boolean>>().toEqualTypeOf<(a: number, b: string) => boolean>();
  });
});

// #endregion
