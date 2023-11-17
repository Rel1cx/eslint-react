export type HookFlag = bigint;

export const HookFlag = {
  None: 0n,
  // eslint-disable-next-line perfectionist/sort-objects
  HasEffect: 1n << 0n,
  Insertion: 1n << 1n,
  Layout: 1n << 2n,
  Passive: 1n << 3n,
};
