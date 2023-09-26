import type { ReadonlyDeep } from "type-fest";

export type ReactSettings = ReadonlyDeep<{
    [key: string]: unknown;
    createClass: string;
    fragment: string;
    pragma: string;
    version: string;
}>;
