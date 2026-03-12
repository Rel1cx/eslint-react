import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";

import { is, isFunction } from "./node-is";
import { findParentNode } from "./node-traverse";

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

/**
 * Gets the nested return statements in the node that are within the same function
 * @param node The AST node
 * @returns The nested return statements in the node
 */
export function getNestedReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const statements: TSESTree.ReturnStatement[] = [];
  const boundaryNode = isFunction(node)
    ? node
    : findParentNode(node, isFunction);
  simpleTraverse(node, {
    enter(node) {
      if (node.type !== AST.ReturnStatement) {
        return;
      }
      const parentFunction = findParentNode(node, isFunction);
      if (parentFunction !== boundaryNode) {
        return;
      }
      statements.push(node);
    },
  });
  return statements;
}

/**
 * Get all nested expressions of type T in an expression like node
 * @param type The type of the expression to retrieve within the node
 * @returns A partially applied function bound to a predicate of type AST. The returned function can be called passing a
 * node, and it will return an array of all nested expressions of type AST.
 */
// dprint-ignore
export function getNestedExpressionsOfType<TNodeType extends AST>(type: TNodeType): (node: TSESTree.Node) => Extract<TSESTree.Node, { type: TNodeType }>[] {
  const isNodeOfType = is(type);
  const recurse = (node: TSESTree.Node): Extract<TSESTree.Node, { type: TNodeType }>[] => {
    const expressions: Extract<TSESTree.Node, { type: TNodeType }>[] = [];
    // Base case: the node itself matches the target type
    if (isNodeOfType(node)) {
      expressions.push(node);
    }
    // CallExpression / NewExpression arguments: foo(a, b)
    if ("arguments" in node) {
      const chunk = node.arguments.flatMap(recurse);
      expressions.push(...chunk);
    }
    // Generic "expression" field handling — covers ExpressionStatement,
    // ChainExpression, TSNonNullExpression, TSAsExpression, TSSatisfiesExpression,
    // TSTypeAssertion, TSInstantiationExpression, JSXExpressionContainer, etc.
    if (
      "expression" in node
      && node.expression !== true
      && node.expression !== false
    ) {
      const chunk = recurse(node.expression);
      expressions.push(...chunk);
    }
    // BinaryExpression / LogicalExpression / AssignmentExpression left operand
    if ("left" in node) {
      const chunk = recurse(node.left);
      expressions.push(...chunk);
    }
    // BinaryExpression / LogicalExpression / AssignmentExpression right operand
    if ("right" in node) {
      const chunk = recurse(node.right);
      expressions.push(...chunk);
    }
    // ConditionalExpression / IfStatement / SwitchCase test
    if ("test" in node && node.test != null) {
      const chunk = recurse(node.test);
      expressions.push(...chunk);
    }
    // ConditionalExpression / IfStatement / SwitchCase consequent
    if ("consequent" in node) {
      const chunk = Array.isArray(node.consequent)
        ? node.consequent.flatMap(recurse)
        : recurse(node.consequent);
      expressions.push(...chunk);
    }
    // ConditionalExpression / IfStatement alternate
    if ("alternate" in node && node.alternate != null) {
      const chunk = Array.isArray(node.alternate)
        ? node.alternate.flatMap(recurse)
        : recurse(node.alternate);
      expressions.push(...chunk);
    }
    // ArrayExpression / ArrayPattern elements: [a, b, c]
    if ("elements" in node) {
      const chunk = node.elements
        .filter((x) => x != null)
        .flatMap(recurse);
      expressions.push(...chunk);
    }
    // ObjectExpression / ObjectPattern properties: { a, b, c }
    if ("properties" in node) {
      const chunk = node.properties.flatMap(recurse);
      expressions.push(...chunk);
    }
    // SequenceExpression / TemplateLiteral expressions: (a, b) or `${a}${b}`
    if ("expressions" in node) {
      const chunk = node.expressions.flatMap(recurse);
      expressions.push(...chunk);
    }
    // Property value: { key: value }
    if (node.type === AST.Property) {
      const chunk = recurse(node.value);
      expressions.push(...chunk);
    }
    // SpreadElement argument: ...expr
    if (node.type === AST.SpreadElement) {
      const chunk = recurse(node.argument);
      expressions.push(...chunk);
    }
    // MemberExpression: obj.prop or obj[expr]
    if (node.type === AST.MemberExpression) {
      expressions.push(...recurse(node.object));
      if (node.computed) {
        expressions.push(...recurse(node.property));
      }
    }
    // UnaryExpression: !expr, typeof expr, void expr, etc.
    if (node.type === AST.UnaryExpression) {
      const chunk = recurse(node.argument);
      expressions.push(...chunk);
    }
    // AwaitExpression: await expr
    if (node.type === AST.AwaitExpression) {
      expressions.push(...recurse(node.argument));
    }
    // YieldExpression: yield expr
    if (node.type === AST.YieldExpression && node.argument != null) {
      expressions.push(...recurse(node.argument));
    }
    // UpdateExpression: ++x, x--
    if (node.type === AST.UpdateExpression) {
      expressions.push(...recurse(node.argument));
    }
    // CallExpression / NewExpression: callee(args) / new callee(args)
    if (node.type === AST.CallExpression || node.type === AST.NewExpression) {
      expressions.push(...recurse(node.callee));
    }
    // TaggedTemplateExpression: tag`...${expr}...`
    if (node.type === AST.TaggedTemplateExpression) {
      expressions.push(...recurse(node.tag));
      expressions.push(...recurse(node.quasi));
    }
    // ImportExpression: import(source)
    if (node.type === AST.ImportExpression) {
      expressions.push(...recurse(node.source));
    }
    return expressions;
  };
  return recurse;
}

/**
 * Get all nested new expressions in an expression like node
 * @param node The node to get the nested new expressions from
 * @returns All nested new expressions
 */
export const getNestedNewExpressions = getNestedExpressionsOfType(
  AST.NewExpression,
);

/**
 * Get all nested call expressions in a expression like node
 * @param node The node to get the nested call expressions from
 * @returns All nested call expressions
 */
export const getNestedCallExpressions = getNestedExpressionsOfType(
  AST.CallExpression,
);
