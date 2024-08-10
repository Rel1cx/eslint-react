import { parseForESLint } from "@typescript-eslint/parser";
import path from "node:path";

export function getFixturesRootDir(): string {
  return path.join(__dirname, "fixtures");
}

export function parseForTest(code: string, filename = "file.ts") {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), filename),
  });
}
