import type { TSESTree } from "@typescript-eslint/types";
import { delimiterCase, replace, toLowerCase } from "string-ts";

import { getLiteralValueType } from "./get-literal-value-type";
import { isJSX } from "./is";
import { NodeType } from "./types";

/**
 * Returns human readable node type for given AST node
 * @param node AST node
 * @returns Human readable node type
 */
export function readableNodeType(node: TSESTree.Node) {
  if (node.type === NodeType.Literal) {
    if ("regex" in node) return "RegExp literal";

    return `${getLiteralValueType(node.value)} literal` as const;
  }
  if (isJSX(node)) return `JSX ${toLowerCase(delimiterCase(replace(node.type, "JSX", ""), " "))}` as const;

  return toLowerCase(delimiterCase(node.type, " "));
}

export type ReadableNodeType = ReturnType<typeof readableNodeType>;
