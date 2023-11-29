/**
 * @since 0.8.13
 */
export type Guard<T = unknown> = (x: unknown) => x is T;

/**
 * @since 0.8.13
 */
export type KeyGuard = Guard<number | string | symbol>;

/**
 * @since 0.8.13
 */
export type GuardReturnType<T extends Guard> = T extends Guard<infer U> ? U : never;

/**
 * @since 0.8.13
 */
export type GuardRecord = Record<PropertyKey, Guard>;

/**
 * @since 0.8.13
 */
export type LazyGuardRecord = Record<PropertyKey, () => Guard>;
