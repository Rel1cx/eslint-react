/**
 * The ESQuery selector for a component display name assignment expression
 */
export const DISPLAY_NAME_ASSIGNMENT_SELECTOR = [
  "AssignmentExpression",
  "[type]",
  "[operator='=']",
  "[left.type='MemberExpression']",
  "[left.property.name='displayName']",
].join("");
