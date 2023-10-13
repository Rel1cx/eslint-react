export type UnionFromTuple<T> = T extends (infer U)[] ? U : never;
