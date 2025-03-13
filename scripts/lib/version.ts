import fs from "node:fs/promises";

export const version = await fs
  .readFile("VERSION", "utf-8")
  .then((v) => v.trim().replace("v", ""));
