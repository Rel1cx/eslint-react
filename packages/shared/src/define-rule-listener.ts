import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

/**
 * Defines a RuleListener by merging multiple visitor objects
 * @param visitor The base visitor object
 * @param visitors Additional visitor objects to merge
 * @returns The merged RuleListener
 */
export function defineRuleListener(visitor: RuleListener, ...visitors: RuleListener[]): RuleListener {
  for (const v of visitors) {
    for (const key in v) {
      if (visitor[key] != null) {
        const o = visitor[key];
        visitor[key] = (...args) => {
          o(...args);
          v[key]?.(...args);
        };
      } else {
        visitor[key] = v[key];
      }
    }
  }
  return visitor;
}
