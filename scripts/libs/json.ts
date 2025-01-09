/* eslint-disable @susisu/safe-typescript/no-type-assertion */
import fs from "fs/promises";
import type { JsonValue } from "type-fest";

export function readJsonFile(path: string) {
  return fs.readFile(path, "utf-8")
    .then(v => JSON.parse(v) as JsonValue);
}

export function writeJsonFile(
  path: string,
  data: JsonValue,
  indent = 2,
  insertFinalNewline = true,
) {
  return fs.writeFile(
    path,
    JSON.stringify(data, null, indent) + (insertFinalNewline ? "\n" : ""),
  );
}
