export type ERClassComponentFlag = bigint;

export const ERClassComponentFlag = {
  None: 0n,
  PureComponent: 1n << 0n,
  // Reserved for future use
  // CreateElement: 1n << 1n,
};

export type ERFunctionComponentFlag = bigint;

/* eslint-disable perfectionist/sort-objects */
export const ERFunctionComponentFlag = {
  None: 0n,
  Memo: 1n << 0n,
  ForwardRef: 1n << 1n,
  // Reserved for future use
  // CreateElement: 1n << 2n,
  // Reserved for future use
  // hasHooks: 1n << 3n,
  // Reserved for future use
  // Async: 1n << 4n,
};
