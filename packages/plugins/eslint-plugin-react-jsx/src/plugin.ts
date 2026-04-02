import type { ESLint } from "eslint";

import { name, version } from "../package.json";

import noChildrenPropWithChildren from "./rules/no-children-prop-with-children/no-children-prop-with-children";
import noChildrenProp from "./rules/no-children-prop/no-children-prop";
import noCommentTextnodes from "./rules/no-comment-textnodes/no-comment-textnodes";
import noKeyAfterSpread from "./rules/no-key-after-spread/no-key-after-spread";
import noLeakedSemicolon from "./rules/no-leaked-semicolon/no-leaked-semicolon";
import noNamespace from "./rules/no-namespace/no-namespace";
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
    "no-leaked-semicolon": noLeakedSemicolon,
    "no-namespace": noNamespace,
    "no-useless-fragment": noUselessFragment,
  },
} as unknown as ESLint.Plugin;
