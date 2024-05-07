import type { TSESTree } from "@typescript-eslint/types";
import { delimiterCase, replace, toLowerCase } from "string-ts";
import { match, P } from "ts-pattern";

import { isJSX, NodeType } from "./node-type";

export function getLiteralValueType(input: bigint | boolean | null | number | string | symbol) {
  return match(input)
    .with(null, () => "Null" as const)
    .with(P.boolean, () => "Boolean" as const)
    .with(P.number, () => "Number" as const)
    .with(P.string, () => "String" as const)
    .with(P.bigint, () => "BigInt" as const)
    .with(P.symbol, () => "Symbol" as const)
    .exhaustive();
}

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
