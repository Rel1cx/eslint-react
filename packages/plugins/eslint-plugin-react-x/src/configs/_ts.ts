import type { Linter } from "eslint";

/**
 * Disables rules that are already handled by TypeScript
 */
export const rules = {} as const satisfies Linter.RulesRecord;
