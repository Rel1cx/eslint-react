import { Enum } from "../src/lib/primitives/enum";

// eslint-disable-next-line filenames-simple/named-export
export const Cond = Enum("always", "never");

export type Cond = Enum<typeof Cond>;
