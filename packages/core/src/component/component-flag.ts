/* eslint-disable perfectionist/sort-objects */
export type ComponentFlag = bigint;

export const ComponentFlag = {
  /** No flags set */
  None: 0n,
  /** Indicates the component is a pure component (e.g., extends PureComponent) */
  PureComponent: 1n << 0n,
  /** Indicates the component creates elements using `createElement` instead of JSX */
  CreateElement: 1n << 1n,
  /** Indicates the component is memoized (e.g., React.memo) */
  Memo: 1n << 2n,
  /** Indicates the component forwards a ref (e.g., React.forwardRef) */
  ForwardRef: 1n << 3n,
};
