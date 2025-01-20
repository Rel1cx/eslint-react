/* eslint-disable perfectionist/sort-objects */
export type ERComponentFlag = bigint;

export const ERComponentFlag = {
  None: 0n,
  PureComponent: 1n << 0n,
  CreateElement: 1n << 1n,
  Memo: 1n << 2n,
  Async: 1n << 3n,
  ForwardRef: 1n << 4n,
};
