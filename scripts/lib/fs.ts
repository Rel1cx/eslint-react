import type { BunFile } from "bun";
import { Function as F, Predicate as Pred } from "effect";

export const copyFile: {
  (src: BunFile | string): (dest: string) => Promise<void>;
  (src: BunFile | string, dest: string): Promise<void>;
} = F.dual(2, (src: BunFile | string, dest: string) => Bun.write(dest, Pred.isString(src) ? Bun.file(src) : src));
