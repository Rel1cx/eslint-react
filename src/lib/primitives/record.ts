/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyObject = Record<string, any>;

export type Remap<T> =
    & {
        [P in keyof T]: T[P];
    }
    & {};
