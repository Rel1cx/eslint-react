import type { TSESTree } from "@typescript-eslint/types";

export type DisplayNameAssignment = TSESTree.AssignmentExpression & {
  left: TSESTree.MemberExpression & {
    property: TSESTree.Identifier & { name: "displayName" };
  };
  operator: "=";
  right: TSESTree.Literal;
};

export const displayNameAssignment = [
  "AssignmentExpression",
  "[operator='=']",
  "[left.type='MemberExpression']",
  "[left.property.name='displayName']",
].join("");
