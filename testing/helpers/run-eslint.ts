/// <reference types="node" />
import { ESLint, type Linter } from "eslint";
import path from "node:path";

export function getExampleDir(exampleName: string): string {
  return path.resolve(import.meta.dirname, "..", "..", "examples", exampleName);
}

export async function lintExample(exampleName: string, patterns = ["src/**/*.{ts,tsx}"]) {
  const cwd = getExampleDir(exampleName);
  const eslint = new ESLint({ cwd });
  return await eslint.lintFiles(patterns);
}

export async function lintWithConfig(
  config: Linter.Config | Linter.Config[],
  patterns: string[],
  cwd = process.cwd(),
) {
  const eslint = new ESLint({
    cwd,
    overrideConfig: config,
    overrideConfigFile: true,
  });
  return await eslint.lintFiles(patterns);
}
