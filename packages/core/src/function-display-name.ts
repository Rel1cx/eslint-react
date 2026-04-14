import type { TSESTree } from "@typescript-eslint/types";

export type FunctionDisplayNameAssignment = TSESTree.AssignmentExpression & {
  left: TSESTree.MemberExpression & {
    property: TSESTree.Identifier & { name: "displayName" };
  };
  operator: "=";
  right: TSESTree.Literal;
};

export const SEL_FUNCTION_DISPLAY_NAME_ASSIGNMENT = [
  "AssignmentExpression",
  "[operator='=']",
  "[left.type='MemberExpression']",
  "[left.property.name='displayName']",
].join("");
