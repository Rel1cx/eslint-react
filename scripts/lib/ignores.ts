import fs from "node:fs";

export const ignores = fs
  .readFileSync(".gitignore", "utf-8")
  .split("\n")
  .map((v) => v.trim())
  .filter((v) => !v.startsWith("#") && !v.startsWith("!"))
  .map((v) => v.replace(/^\//, ""))
  .filter((v) => v !== "");
