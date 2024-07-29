import type { BunFile } from "bun";
import { Function as F } from "effect";
import * as R from "remeda";

export const copyFile: {
  (src: BunFile | string): (dest: string) => Promise<void>;
  (src: BunFile | string, dest: string): Promise<void>;
} = F.dual(2, (src: BunFile | string, dest: string) => Bun.write(dest, R.isString(src) ? Bun.file(src) : src));
