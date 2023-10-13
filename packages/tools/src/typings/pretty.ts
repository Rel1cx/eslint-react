export type Pretty<T> =
    & {
        [P in keyof T]: T[P];
    }
    & {};
