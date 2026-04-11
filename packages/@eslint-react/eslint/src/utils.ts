import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

/**
 * Merges multiple visitor objects into a single visitor object.
 *
 * @param base Base visitor object (target of merge)
 * @param rest Additional visitor objects to merge (one or more)
 * @returns Merged visitor object
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
      // tsl-ignore core/strictBooleanExpressions
      base[key] = existing
        ? (...args) => {
          existing(...args);
          r[key]?.(...args);
        }
        : r[key];
    }
  }
  return base;
}
