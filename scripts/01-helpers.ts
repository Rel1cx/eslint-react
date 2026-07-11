import { basename, parse } from "node:path";
import { globSync } from "tinyglobby";

export function glob(patterns: string[], ignore = ["**/node_modules/**"]) {
  return globSync(patterns, { ignore });
}

export function isRuleEntryFile(file: string): boolean {
  const { dir, name } = parse(file);
  return basename(dir) === name;
}
