import { ESLintUtils } from "@typescript-eslint/utils";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

function getDocsUrl(ruleName: string) {
  return `https://eslint-react.xyz/docs/rules/${ruleName}`;
}

/** The rule creator that generates documentation URLs for ESLint React rules. */
export const createRule = ESLintUtils.RuleCreator(getDocsUrl);

/**
 * Merge multiple visitor objects into a single visitor object.
 *
 * @param base The base visitor object (target of merge).
 * @param rest The additional visitor objects to merge (one or more).
 * @returns The merged visitor object.
 *
 * @example
 * ```typescript
 * const visitor1 = { Identifier: () => console.log(1) };
 * const visitor2 = { Identifier: () => console.log(2) };
 * const merged = merge(visitor1, visitor2);
 * // When encountering Identifier nodes, outputs 1 then 2
 * ```
 */
export function merge(base: RuleListener, ...rest: RuleListener[]): RuleListener {
  for (const r of rest) {
    for (const key in r) {
      const existing = base[key];
      base[key] = existing != null
        ? (...args) => {
          existing(...args);
          r[key]?.(...args);
        }
        : r[key];
    }
  }
  return base;
}
