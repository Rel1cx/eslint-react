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
