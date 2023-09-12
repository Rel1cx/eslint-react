import { Enum } from "../src/lib/primitives/enum";

export const Severity = Enum("off", "warn", "error");

export type Severity = Enum<typeof Severity>;

export const Cond = Enum("never", "always");

export type Cond = Enum<typeof Cond>;
