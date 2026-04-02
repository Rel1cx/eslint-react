import type { ESLint } from "eslint";

import { name, version } from "../package.json";

import noChildrenPropWithChildren from "./rules/no-children-prop-with-children/no-children-prop-with-children";
import noChildrenProp from "./rules/no-children-prop/no-children-prop";
import noCommentTextnodes from "./rules/no-comment-textnodes/no-comment-textnodes";
import noKeyAfterSpread from "./rules/no-key-after-spread/no-key-after-spread";
import noNamespace from "./rules/no-namespace/no-namespace";
import noTrailingSemicolon from "./rules/no-trailing-semicolon/no-trailing-semicolon";
import noUselessFragment from "./rules/no-useless-fragment/no-useless-fragment";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "no-children-prop": noChildrenProp,
    "no-children-prop-with-children": noChildrenPropWithChildren,
    "no-comment-textnodes": noCommentTextnodes,
    "no-key-after-spread": noKeyAfterSpread,
    "no-namespace": noNamespace,
    "no-trailing-semicolon": noTrailingSemicolon,
    "no-useless-fragment": noUselessFragment,
  },
} as unknown as ESLint.Plugin;
