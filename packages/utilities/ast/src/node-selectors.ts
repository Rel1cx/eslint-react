import type { TSESTree } from "@typescript-eslint/utils";

export type ImplicitReturnArrowFunctionExpression = TSESTree.ArrowFunctionExpression & {
  body: TSESTree.Expression;
};

export type ObjectDestructuringVariableDeclarator = TSESTree.VariableDeclarator & {
  id: TSESTree.ObjectPattern;
  init: TSESTree.Identifier;
};

export type DisplayNameAssignmentExpression = TSESTree.AssignmentExpression & {
  type: "AssignmentExpression";
  left: TSESTree.MemberExpression & {
    property: TSESTree.Identifier & {
      name: "displayName";
    };
  };
  operator: "=";
  right: TSESTree.Literal;
};

export const SEL_IMPLICIT_RETURN_ARROW_FUNCTION_EXPRESSION = "ArrowFunctionExpression[body.type!='BlockStatement']";

export const SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR = [
  "VariableDeclarator",
  "[id.type='ObjectPattern']",
  "[init.type='Identifier']",
].join("");

export const SEL_DISPLAY_NAME_ASSIGNMENT_EXPRESSION = [
  "AssignmentExpression",
  "[operator='=']",
  "[left.type='MemberExpression']",
  "[left.property.name='displayName']",
].join("");
