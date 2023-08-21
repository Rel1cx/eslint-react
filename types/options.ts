import { Enum } from "../lib/primitives/enum";

export const Applicability = Enum("always", "never");

export type Applicability = Enum<typeof Applicability>;
