import type { UnionFromTuple } from "../typings";

export type Enum<T extends object> = T[keyof T];

export function Enum<T extends string[]>(...args: T) {
    // eslint-disable-next-line functional-core/purity
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
