import { ESLint, Linter } from "eslint";
import type { Rule } from "eslint";

import { getTestRuleLanguageOptions } from "./linter";

export async function lintWithConfig(config: Linter.Config | Linter.Config[], patterns: string[], cwd = process.cwd()) {
  const eslint = new ESLint({
    cwd,
    overrideConfig: config,
    overrideConfigFile: true,
  });
  return await eslint.lintFiles(patterns);
}

/**
 * Run a rule with fixes enabled until the code stabilizes (or ESLint's fix limit is reached).
 * @param code The source code to lint.
 * @param rule The rule to run.
 * @param options The rule options (the entries after the severity).
 * @returns The result of `Linter#verifyAndFix`.
 */
export function verifyAndFix(code: string, rule: Rule.RuleModule, options: readonly unknown[] = []): Linter.FixReport {
  const linter = new Linter();
  const rules: NonNullable<Linter.Config["rules"]> = {
    "test/rule": ["error", ...options],
  };
  return linter.verifyAndFix(code, {
    languageOptions: getTestRuleLanguageOptions({ jsx: true, sourceType: "module" }),
    plugins: {
      test: {
        rules: { rule },
      },
    },
    rules,
  });
}
