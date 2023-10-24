/**
 * @since 0.4.0
 */
export type Cast<X, Y> = X extends Y ? X : Y;

/**
 * @since 0.0.1
 */
export type Remap<T> = {
    [P in keyof T]: T[P];
};

/**
 * @since 0.0.1
 */
export type Pretty<T> =
    & {
        [P in keyof T]: T[P];
    }
    & {};

/**
 * @since 0.3.4
 */
export type FieldDiff<T1, T2> = Omit<T1, keyof T2> | Omit<T2, keyof T1>;

/**
 * @since 0.3.4
 */
export type Combine<T1, T2> = Pretty<
    {
        [K in keyof (T1 | T2)]: T1[K] | T2[K];
    } & Partial<T1 & T2>
>;
