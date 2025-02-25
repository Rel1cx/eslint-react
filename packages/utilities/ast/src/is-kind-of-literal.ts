/* eslint-disable local/prefer-eqeq-nullish-comparison */
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

type LiteralType =
  | "boolean"
  | "null"
  | "number"
  | "regexp"
  | "string";

export function isKindOfLiteral(node: TSESTree.Node, kind: "boolean"): node is TSESTree.BooleanLiteral;
export function isKindOfLiteral(node: TSESTree.Node, kind: "null"): node is TSESTree.NullLiteral;
export function isKindOfLiteral(node: TSESTree.Node, kind: "number"): node is TSESTree.NumberLiteral;
export function isKindOfLiteral(node: TSESTree.Node, kind: "regexp"): node is TSESTree.RegExpLiteral;
export function isKindOfLiteral(node: TSESTree.Node, kind: "string"): node is TSESTree.StringLiteral;
export function isKindOfLiteral(node: TSESTree.Node, kind: LiteralType) {
  if (node.type !== T.Literal) return false;
  switch (kind) {
    case "boolean":
      return typeof node.value === "boolean";
    case "null":
      return node.value === null;
    case "number":
      return typeof node.value === "number";
    case "regexp":
      return "regex" in node;
    case "string":
      return typeof node.value === "string";
  }
}
