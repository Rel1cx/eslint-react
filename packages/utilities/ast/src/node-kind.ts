import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { delimiterCase, replace, toLowerCase } from "string-ts";

import { isJSX } from "./node-is";

export function getHumanReadableKind(node: TSESTree.Node, delimiter = " ") {
  if (node.type === AST.Literal) {
    if ("regex" in node) {
      return "RegExp literal";
    }
    // eslint-disable-next-line function-rule-1/function-rule
    if (node.value === null) {
      return "null literal" as const;
    }
    return `${typeof node.value} literal` as const;
  }
  if (isJSX(node)) {
    return `JSX ${toLowerCase(delimiterCase(replace(node.type, "JSX", ""), delimiter))}` as const;
  }
  return toLowerCase(delimiterCase(node.type, delimiter));
}
