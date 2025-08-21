import { globSync } from "tinyglobby";

export function glob(patterns: string[], ignore = ["**/node_modules/**"]) {
  return globSync(patterns, { ignore });
}
