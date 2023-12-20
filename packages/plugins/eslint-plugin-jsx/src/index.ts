// Workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import maxDepth from "./rules/max-depth";
import noArrayIndexKey from "./rules/no-array-index-key";
import noMisusedCommentInTextNode from "./rules/no-comment-textnodes";
import noComplicatedConditionalRendering from "./rules/no-complicated-conditional-rendering";
import noDuplicateKey from "./rules/no-duplicate-key";
import noLeakedConditionalRendering from "./rules/no-leaked-conditional-rendering";
import noMissingKey from "./rules/no-missing-key";
import noSpreadingKey from "./rules/no-spreading-key";
import noUselessFragment from "./rules/no-useless-fragment";
import preferShorthandJsxBoolean from "./rules/prefer-shorthand-boolean";
import preferFragmentSyntax from "./rules/prefer-shorthand-fragment";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "max-depth": maxDepth,
  "no-array-index-key": noArrayIndexKey,
  "no-comment-textnodes": noMisusedCommentInTextNode,
  "no-complicated-conditional-rendering": noComplicatedConditionalRendering,
  "no-duplicate-key": noDuplicateKey,
  "no-leaked-conditional-rendering": noLeakedConditionalRendering,
  "no-missing-key": noMissingKey,
  "no-spreading-key": noSpreadingKey,
  "no-useless-fragment": noUselessFragment,
  "prefer-shorthand-boolean": preferShorthandJsxBoolean,
  "prefer-shorthand-fragment": preferFragmentSyntax,
} as const;
