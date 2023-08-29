import { Enum } from "../src/lib/primitives/enum";

export const Cond = Enum("always", "never");

export type Cond = Enum<typeof Cond>;
