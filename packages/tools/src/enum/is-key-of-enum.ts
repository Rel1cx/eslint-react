import type { Enum } from "./enum";

export function isKeyOfEnum<T extends object>(e: T, value: unknown): value is Enum<T> {
    return Object.values(e).includes(value);
}
