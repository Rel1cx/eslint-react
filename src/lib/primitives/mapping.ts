/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyRecord = Record<string, any>;

export type Remap<T> =
    & {
        [P in keyof T]: T[P];
    }
    & {};
