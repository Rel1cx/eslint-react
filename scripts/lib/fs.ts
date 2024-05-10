import type { BunFile } from "bun";
import { Function as F, Predicate as Pred } from "effect";

export const copyFile: {
  (src: string | BunFile): (dest: string) => Promise<void>;
  (src: string | BunFile, dest: string): BunFile;
} = F.dual(2, (src: BunFile | string, dest: string) => Bun.write(dest, Pred.isString(src) ? Bun.file(src) : src));
