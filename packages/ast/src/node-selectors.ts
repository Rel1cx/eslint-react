import type { TSESTree } from "@typescript-eslint/types";

/**
 * Represents a variable declarator with object destructuring and an identifier initializer
 */
export type ObjectDestructuringVariableDeclarator = TSESTree.VariableDeclarator & {
  id: TSESTree.ObjectPattern;
  init: TSESTree.Identifier;
};

/**
 * Represents an assignment expression that assigns to a displayName property
 */
export type DisplayNameAssignmentExpression = TSESTree.AssignmentExpression & {
  left: TSESTree.MemberExpression & {
    property: TSESTree.Identifier & {
      name: "displayName";
    };
  };
  operator: "=";
  right: TSESTree.Literal;
};

/**
 * Selector for variable declarators with object destructuring
 */
export const SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR = [
  "VariableDeclarator",
  "[id.type='ObjectPattern']",
  "[init.type='Identifier']",
].join("");

/**
 * Selector for assignment expressions that set displayName
 */
export const SEL_DISPLAY_NAME_ASSIGNMENT_EXPRESSION = [
  "AssignmentExpression",
  "[operator='=']",
  "[left.type='MemberExpression']",
  "[left.property.name='displayName']",
].join("");
