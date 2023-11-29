import { Pred } from "./effect";
import type { Guard, GuardRecord, GuardReturnType, KeyGuard, LazyGuardRecord } from "./guard";

/**
 * @since 0.9.0
 * @param guards The guards to check.
 * @returns A guard that checks if given value is the kind of union.
 */
export const isKindOfUnion =
  // dprint-ignore
  <T extends Guard[]>(...guards: T) =>
  (x: unknown): x is GuardReturnType<T[number]> =>
    guards.some((g) => g(x));

/**
 * @since 0.9.0
 * @param isK The guard for the key.
 * @param isV The guard for the value.
 * @returns A guard that checks if given value is the kind of record.
 */
export const isKindOfRecord =
  // dprint-ignore
  <K extends KeyGuard, V extends Guard>(isK: K, isV: V) =>
  (x: unknown): x is Record<GuardReturnType<K>, GuardReturnType<V>> =>
    Pred.isObject(x) &&
    Object.entries(x).every(([k, v]) => isK(k) ? isV(v) : true);

/**
 * @since 0.9.0
 * @param guards The guards to check.
 * @returns A guard that checks if given value is the kind of object.
 */
export const isKindOfObject =
  // dprint-ignore
  <T extends GuardRecord>(guards: T) =>
  (x: unknown): x is { [key in keyof T]: GuardReturnType<T[key]> } =>
    Pred.isObject(x) &&
    // eslint-disable-next-line security/detect-object-injection
    Object.entries(x).every(([key, value]) => guards[key]?.(value));

/**
 * @since 0.9.0
 */
export const isKindObjectLazy =
  // dprint-ignore
  <T extends LazyGuardRecord>(guards: T) =>
  (x: unknown): x is { [key in keyof T]: GuardReturnType<ReturnType<T[key]>> } =>
    Pred.isObject(x) &&
    // eslint-disable-next-line security/detect-object-injection
    Object.entries(x).every(([key, value]) => guards[key]?.()(value));

/**
 * @since 0.9.0
 * @param guard The guard to check.
 * @returns A guard that checks if given value is the kind of array.
 */
export const isKindOfArray =
  // dprint-ignore
  <T extends Guard>(guard: T) =>
  (x: unknown): x is T[] =>
    Array.isArray(x) && x.every((y) => guard(y));

/**
 * @since 0.9.0
 * @param guards The guards to check.
 * @returns A guard that checks if given value is the kind of tuple.
 */
export const isKindOfTuple =
  // dprint-ignore
  <T extends Guard[]>(guards: T) =>
  (x: unknown): x is { [key in keyof T]: GuardReturnType<T[key]> } =>
    Array.isArray(x) &&
    x.length === guards.length &&
    // eslint-disable-next-line security/detect-object-injection
    x.every((y, i) => guards[i]?.(y));

/**
 * @since 0.9.0
 */
export const isKindOfOptional =
  // dprint-ignore
  <T>(guard: Guard<T>) =>
  (x: unknown): x is T | undefined =>
    x === undefined || guard(x);
