import { Enum } from "../src/lib/primitives/enum";

export type Severity = "error" | "off" | "warn";

export const Cond = Enum("always", "never");

export type Cond = Enum<typeof Cond>;
