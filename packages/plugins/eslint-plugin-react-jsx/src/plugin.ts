import type { ESLint } from "eslint";

import { name, version } from "../package.json";

import dollar from "./rules/dollar/dollar";
import keyBeforeSpread from "./rules/key-before-spread/key-before-spread";
import noChildrenPropWithChildren from "./rules/no-children-prop-with-children/no-children-prop-with-children";
import noChildrenProp from "./rules/no-children-prop/no-children-prop";
import noCommentTextnodes from "./rules/no-comment-textnodes/no-comment-textnodes";
import noNamespace from "./rules/no-namespace/no-namespace";
import noUselessFragment from "./rules/no-useless-fragment/no-useless-fragment";
import shorthandBoolean from "./rules/shorthand-boolean/shorthand-boolean";
import shorthandFragment from "./rules/shorthand-fragment/shorthand-fragment";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    dollar: dollar,
    "key-before-spread": keyBeforeSpread,
    "no-children-prop": noChildrenProp,
    "no-children-prop-with-children": noChildrenPropWithChildren,
    "no-comment-textnodes": noCommentTextnodes,
    "no-namespace": noNamespace,
    "no-useless-fragment": noUselessFragment,
    "shorthand-boolean": shorthandBoolean,
    "shorthand-fragment": shorthandFragment,
  },
} as unknown as ESLint.Plugin;
