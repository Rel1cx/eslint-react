import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Get all nested identifiers in a expression like node
 * @param node The node to get the nested identifiers from
 * @returns All nested identifiers
 */
export function getNestedIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  const identifiers: TSESTree.Identifier[] = [];
  // Base case: the node itself is an Identifier
  if (node.type === AST.Identifier) {
    identifiers.push(node);
  }
  // CallExpression / NewExpression arguments: foo(a, b)
  if ("arguments" in node) {
    const chunk = node.arguments.flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  // ArrayExpression / ArrayPattern elements: [a, b, c]
  if ("elements" in node) {
    const chunk = node.elements
      .filter((x) => x != null)
      .flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  // ObjectExpression / ObjectPattern properties: { a, b, c }
  if ("properties" in node) {
    const chunk = node.properties.flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  // SequenceExpression / TemplateLiteral expressions: (a, b) or `${a}${b}`
  if ("expressions" in node) {
    const chunk = node.expressions.flatMap(getNestedIdentifiers);
    identifiers.push(...chunk);
  }
  // BinaryExpression / LogicalExpression / AssignmentExpression left operand
  if ("left" in node) {
    const chunk = getNestedIdentifiers(node.left);
    identifiers.push(...chunk);
  }
  // BinaryExpression / LogicalExpression / AssignmentExpression right operand
  if ("right" in node) {
    const chunk = getNestedIdentifiers(node.right);
    identifiers.push(...chunk);
  }
  // Property value: { key: value }
  if (node.type === AST.Property) {
    const chunk = getNestedIdentifiers(node.value);
    identifiers.push(...chunk);
  }
  // SpreadElement argument: ...expr
  if (node.type === AST.SpreadElement) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  // MemberExpression: obj.prop or obj[expr]
  if (node.type === AST.MemberExpression) {
    identifiers.push(...getNestedIdentifiers(node.object));
    if (node.computed) {
      identifiers.push(...getNestedIdentifiers(node.property));
    }
  }
  // UnaryExpression: !expr, typeof expr, void expr, etc.
  if (node.type === AST.UnaryExpression) {
    const chunk = getNestedIdentifiers(node.argument);
    identifiers.push(...chunk);
  }
  // ChainExpression: obj?.prop
  if (node.type === AST.ChainExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  // TSNonNullExpression: expr!
  if (node.type === AST.TSNonNullExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  // TSAsExpression: expr as Type
  if (node.type === AST.TSAsExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  // TSSatisfiesExpression: expr satisfies Type
  if (node.type === AST.TSSatisfiesExpression) {
    const chunk = getNestedIdentifiers(node.expression);
    identifiers.push(...chunk);
  }
  // ConditionalExpression: a ? b : c
  if (node.type === AST.ConditionalExpression) {
    identifiers.push(...getNestedIdentifiers(node.test));
    identifiers.push(...getNestedIdentifiers(node.consequent));
    identifiers.push(...getNestedIdentifiers(node.alternate));
  }
  // AwaitExpression: await expr
  if (node.type === AST.AwaitExpression) {
    identifiers.push(...getNestedIdentifiers(node.argument));
  }
  // YieldExpression: yield expr
  if (node.type === AST.YieldExpression && node.argument != null) {
    identifiers.push(...getNestedIdentifiers(node.argument));
  }
  // UpdateExpression: ++x, x--
  if (node.type === AST.UpdateExpression) {
    identifiers.push(...getNestedIdentifiers(node.argument));
  }
  // CallExpression / NewExpression: callee(args) / new callee(args)
  if (node.type === AST.CallExpression || node.type === AST.NewExpression) {
    identifiers.push(...getNestedIdentifiers(node.callee));
  }
  // TaggedTemplateExpression: tag`...${expr}...`
  if (node.type === AST.TaggedTemplateExpression) {
    identifiers.push(...getNestedIdentifiers(node.tag));
    identifiers.push(...getNestedIdentifiers(node.quasi));
  }
  // ImportExpression: import(source)
  if (node.type === AST.ImportExpression) {
    identifiers.push(...getNestedIdentifiers(node.source));
  }
  // TSTypeAssertion: <Type>expr
  if (node.type === AST.TSTypeAssertion) {
    identifiers.push(...getNestedIdentifiers(node.expression));
  }
  // TSInstantiationExpression: expr<T>
  if (node.type === AST.TSInstantiationExpression) {
    identifiers.push(...getNestedIdentifiers(node.expression));
  }
  return identifiers;
}
