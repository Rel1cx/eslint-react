// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import jsxNoArrayIndexKey from "./rules/no-array-index-key";
import jsxNoMisusedCommentInTextNode from "./rules/no-comment-textnodes";
import jsxNoDuplicateKey from "./rules/no-duplicate-key";
import jsxNoLeakedConditionalRendering from "./rules/no-leaked-conditional-rendering";
import jsxNoMissingKey from "./rules/no-missing-key";
import jsxNoScriptUrl from "./rules/no-script-url";
import jsxNoSpreadingKey from "./rules/no-spreading-key";
import jsxNoUnsafeTargetBlank from "./rules/no-unsafe-target-blank";
import jsxNoUselessFragment from "./rules/no-useless-fragment";
import jsxPreferShorthandJsxBoolean from "./rules/prefer-shorthand-boolean";
import jsxPreferFragmentSyntax from "./rules/prefer-shorthand-fragment";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "no-array-index-key": jsxNoArrayIndexKey,
  "no-comment-textnodes": jsxNoMisusedCommentInTextNode,
  "no-duplicate-key": jsxNoDuplicateKey,
  "no-leaked-conditional-rendering": jsxNoLeakedConditionalRendering,
  "no-missing-key": jsxNoMissingKey,
  "no-script-url": jsxNoScriptUrl,
  "no-spreading-key": jsxNoSpreadingKey,
  "no-unsafe-target-blank": jsxNoUnsafeTargetBlank,
  "no-useless-fragment": jsxNoUselessFragment,
  "prefer-shorthand-boolean": jsxPreferShorthandJsxBoolean,
  "prefer-shorthand-fragment": jsxPreferFragmentSyntax,
} as const;
