export type Remap<T> = {
    [P in keyof T]: T[P];
};
