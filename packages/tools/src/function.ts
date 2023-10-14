/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * @since 0.0.1
 */
export const noop = () => {};

/**
 * @since 0.0.1
 * @param a The value to return.
 */
export const identity = <T>(a: T) => a;

/**
 * @param a The value to infer.
 * @since 0.0.1
 */
export const asConst = <const T>(a: T) => a;
