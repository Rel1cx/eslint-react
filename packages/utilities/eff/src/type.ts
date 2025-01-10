export type Pretty<T> =
  & {
    [P in keyof T]: T[P];
  }
  & {};

type IsAny<T> = 0 extends 1 & NoInfer<T> ? true : false;

/**
 * An extension of Extract for type predicates which falls back to the base
 * in order to narrow the `unknown` case.
 *
 * @example
 *   function isMyType<T>(data: T | MyType): data is NarrowedTo<T, MyType> { ... }
 */
export type NarrowedTo<T, Base> = Extract<T, Base> extends never ? Base
  : IsAny<T> extends true ? Base
  : Extract<T, Base>;
