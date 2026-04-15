import type { TSESTree } from "@typescript-eslint/types";

export const SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR = [
  "VariableDeclarator",
  "[id.type='ObjectPattern']",
  "[init.type='Identifier']",
].join("");

export type ObjectDestructuringVariableDeclarator = TSESTree.VariableDeclarator & {
  id: TSESTree.ObjectPattern;
  init: TSESTree.Identifier;
};
