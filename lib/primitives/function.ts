// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const identity = <T>(a: T) => a;

export const asConst = <const T>(a: T) => a;
