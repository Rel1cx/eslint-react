/**
 * Infers embedded primitive type of any type
 * @since 0.0.1
 * @param T Type to infer
 * @returns Embedded type of {@link TType}
 * @example
 * type Result = Narrow<['foo', 'bar', 1]>
 * @see https://twitter.com/hd_nvim/status/1578567206190780417
 */
export type Narrow<TType> =
    | { [K in keyof TType]: Narrow<TType[K]> }
    | (TType extends [] ? [] : never)
    | (TType extends Function ? TType : never)
    | (TType extends bigint | boolean | number | string ? TType : never);

/**
 * Infers embedded primitive type of any type
 * Same as `as const` but without setting the object as readonly and without needing the user to use it.
 * @since 0.0.1
 * @param a Value to infer
 * @returns Value with embedded type inferred
 * @example
 * const result = narrow(['foo', 'bar', 1])
 */
export const narrow = <TType>(a: Narrow<TType>) => a;
