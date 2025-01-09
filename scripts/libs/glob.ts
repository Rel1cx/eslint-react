import { globSync } from "tinyglobby";

export function glob(patterns: string[], exclude = ["**/node_modules/**"]) {
  return globSync(patterns, {
    ignore: [...exclude],
  });
}
