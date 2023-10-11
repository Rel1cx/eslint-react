import type { UnionFromTuple } from "./union";

export type Enum<T extends object> = T[keyof T];

export function Enum<T extends string[]>(...args: T) {
    return Object.freeze(
        args.reduce<{ [P in UnionFromTuple<T>]: P }>((acc, next) => {
            return {
                ...acc,
                [next]: next,
            };
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        }, Object.create(null)),
    );
}

export function isKeyOfEnum<T extends object>(e: T, value: unknown): value is Enum<T> {
    return Object.values(e).includes(value);
}
