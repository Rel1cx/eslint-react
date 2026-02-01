import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Represents an arrow function expression with an implicit return
 */
export type ImplicitReturnArrowFunctionExpression = TSESTree.ArrowFunctionExpression & {
  body: TSESTree.Expression;
};

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
  type: "AssignmentExpression";
  left: TSESTree.MemberExpression & {
    property: TSESTree.Identifier & {
      name: "displayName";
    };
  };
  operator: "=";
  right: TSESTree.Literal;
};

/**
 * Selector for arrow function expressions with implicit return
 */
export const SEL_IMPLICIT_RETURN_ARROW_FUNCTION_EXPRESSION = "ArrowFunctionExpression[body.type!='BlockStatement']";

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
