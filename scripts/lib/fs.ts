import type { BunFile } from "bun";
import { isString } from "effect/Predicate";

export function copyFile(src: BunFile | string, dest: string) {
  return Bun.write(dest, isString(src) ? Bun.file(src) : src);
}
