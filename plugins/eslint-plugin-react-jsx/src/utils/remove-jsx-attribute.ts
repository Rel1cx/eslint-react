import type { RichContext } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

/**
 * Builds a fix that removes a JSX attribute along with the whitespace before it.
 * @param context The rich rule context
 * @param fixer The rule fixer
 * @param attribute The `JSXAttribute` node to remove
 * @returns A fix that removes the attribute and its preceding whitespace
 */
export function removeJsxAttribute(context: RichContext, fixer: RuleFixer, attribute: TSESTree.JSXAttribute): RuleFix {
  const src = context.src;
  // Expand the removal range to also cover whitespace before the attribute
  let start = attribute.range[0];
  while (start > 0 && /\s/.test(src.text[start - 1] ?? "")) start--;
  return fixer.removeRange([start, attribute.range[1]]);
}
