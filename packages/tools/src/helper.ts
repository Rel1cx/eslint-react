/**
 * @since 0.9.0
 */
export type Assume<T, U> = T extends U ? T : never;

/**
 * @since 0.4.0
 */
export type Cast<X, Y> = X extends Y ? X : Y;

/**
 * @since 0.9.0
 */
export type Defined<T> = T extends undefined ? never : T;

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
