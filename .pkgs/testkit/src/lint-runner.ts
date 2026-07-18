import { ESLint, type Linter } from "eslint";

export async function lintWithConfig(config: Linter.Config | Linter.Config[], patterns: string[], cwd = process.cwd()) {
  const eslint = new ESLint({
    cwd,
    overrideConfig: config,
    overrideConfigFile: true,
  });
  return await eslint.lintFiles(patterns);
}
