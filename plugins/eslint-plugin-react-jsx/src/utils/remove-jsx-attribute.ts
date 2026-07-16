import type { RuleContext } from "@eslint-react/eslint";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

/**
 * Builds a fix that removes a JSX attribute along with the whitespace before it.
 * @param context The rule context
 * @param fixer The rule fixer
 * @param attribute The `JSXAttribute` node to remove
 * @returns A fix that removes the attribute and its preceding whitespace
 */
export function removeJsxAttribute(context: RuleContext, fixer: RuleFixer, attribute: TSESTree.JSXAttribute): RuleFix {
  // Expand the removal range to also cover whitespace before the attribute
  let start = attribute.range[0];
  while (start > 0 && /\s/.test(context.sourceCode.text[start - 1] ?? "")) start--;
  return fixer.removeRange([start, attribute.range[1]]);
}
