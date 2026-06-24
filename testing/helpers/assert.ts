import type { ESLint } from "eslint";
import { expect } from "vitest";

export function expectNoFatalErrors(results: ESLint.LintResult[]) {
  const fatal = results.flatMap((result) => result.messages.filter((message) => message.fatal));
  expect(fatal, `Unexpected fatal ESLint errors: ${JSON.stringify(fatal, null, 2)}`).toHaveLength(0);
}

export function getMessagesForRule(results: ESLint.LintResult[], ruleName: string) {
  return results.flatMap((result) =>
    result.messages
      .filter((message) => message.ruleId === ruleName)
      .map((message) => ({ ...message, filePath: result.filePath }))
  );
}

export function expectRuleCount(results: ESLint.LintResult[], ruleName: string, count: number) {
  const messages = getMessagesForRule(results, ruleName);
  expect(messages).toHaveLength(count);
}
