/**
 * @since 0.0.1
 * @template T The type to get the union from
 * @example
 * type Result = UnionFromTuple<['foo', 'bar', 1]>
 * // Result = 'foo' | 'bar' | 1
 */
export type UnionFromTuple<T> = T extends (infer U)[] ? U : never;

/**
 * @since 0.0.1
 * @template T The type to get the intersection from
 * @example
 * type Result = IntersectionFromTuple<['foo', 'bar', 1]>
 * // Result = 'foo' & 'bar' & 1
 */
export type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  // dprint-ignore
  ? I
  : never;
