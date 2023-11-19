/* eslint-disable perfectionist/sort-objects */
export type ESLRComponentFlag = bigint;

export const ESLRComponentFlag = {
  None: 0n,
  InsideMemo: 1n << 0n,
  InsideForwardRef: 1n << 1n,
};
