import fs from "node:fs";

export const version = fs
  .readFileSync("VERSION", "utf-8")
  .trim()
  .replace("v", "");
