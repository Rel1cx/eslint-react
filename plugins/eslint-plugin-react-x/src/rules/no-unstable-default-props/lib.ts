import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { delimiterCase, toLowerCase } from "string-ts";

export const SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR = [
  "VariableDeclarator",
  "[id.type='ObjectPattern']",
  "[init.type='Identifier']",
].join("");

export type ObjectDestructuringVariableDeclarator = TSESTree.VariableDeclarator & {
  id: TSESTree.ObjectPattern;
  init: TSESTree.Identifier;
};

export function getHumanReadableKind(node: TSESTree.Node) {
  if (node.type === AST.Literal) {
    if ("regex" in node) return "regexp literal" as const;
    // tsl-ignore dx/nullish
    if (node.value === null) return "null literal" as const;
    return `${typeof node.value} literal` as const;
  }
  return toLowerCase(delimiterCase(node.type, " "));
}
