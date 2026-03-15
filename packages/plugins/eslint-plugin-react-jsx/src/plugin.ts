import type { ESLint } from "eslint";

import { name, version } from "../package.json";

import noChildrenPropWithChildren from "./rules/no-children-prop-with-children/no-children-prop-with-children";
import noChildrenProp from "./rules/no-children-prop/no-children-prop";
import noCommentTextnodes from "./rules/no-comment-textnodes/no-comment-textnodes";
import noUselessFragment from "./rules/no-useless-fragment/no-useless-fragment";
import runtime from "./rules/runtime/runtime";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "no-children-prop": noChildrenProp,
    "no-children-prop-with-children": noChildrenPropWithChildren,
    "no-comment-textnodes": noCommentTextnodes,
    "no-useless-fragment": noUselessFragment,
    runtime: runtime,
  },
} as unknown as ESLint.Plugin;
