import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";

export function getAssociatedTokens(
  context: RuleContext,
  node: TSESTree.Node,
) {
  {
    const tokenBefore = context.sourceCode.getTokenBefore(node);
    const tokenAfter = context.sourceCode.getTokenAfter(node);
    const tokens = [];

    // If this is not the only entry, then the line above this one
    // will become the last line, and should not have a trailing comma.
    if (tokenAfter?.value !== "," && tokenBefore?.value === ",") {
      tokens.push(tokenBefore);
    }

    // If this is not the last entry, then we need to remove the comma from this line.
    if (tokenAfter?.value === ",") {
      tokens.push(tokenAfter);
    }

    return tokens;
  }
}
