import { type Rule } from "tsl";
export declare const textlint: (options?: "off" | undefined) => Rule<unknown>;
export declare function buildConfig(cwd: string): import("tsl").Config;
