import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

type LiteralType =
  | "boolean"
  | "null"
  | "number"
  | "regexp"
  | "string";

/**
 * Check if a node is a literal value
 * @param node The node to check
 * @returns True if the node is a literal
 */
export function isLiteral(node: TSESTree.Node): node is TSESTree.Literal;
export function isLiteral(node: TSESTree.Node, type: "boolean"): node is TSESTree.BooleanLiteral;
export function isLiteral(node: TSESTree.Node, type: "null"): node is TSESTree.NullLiteral;
export function isLiteral(node: TSESTree.Node, type: "number"): node is TSESTree.NumberLiteral;
export function isLiteral(node: TSESTree.Node, type: "regexp"): node is TSESTree.RegExpLiteral;
export function isLiteral(node: TSESTree.Node, type: "string"): node is TSESTree.StringLiteral;
export function isLiteral(node: TSESTree.Node, type?: LiteralType) {
  if (node.type !== AST.Literal) return false;
  if (type == null) return true;
  switch (type) {
    case "boolean":
      return typeof node.value === "boolean";
    case "null":
      // tsl-ignore dx/nullish
      return node.value === null;
    case "number":
      return typeof node.value === "number";
    case "regexp":
      return "regex" in node;
    case "string":
      return typeof node.value === "string";
  }
}
