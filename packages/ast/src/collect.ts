import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { type VisitorKeys, visitorKeys as defaultVisitorKeys } from "@typescript-eslint/visitor-keys";
import * as Check from "./check";
import * as Traverse from "./traverse";
import type { TSESTreeFunction } from "./tree";

/**
 * Visitor keys for the node types that can contain an expression or pattern.
 *
 * For statement nodes only their expression-bearing keys are listed (ex: an `if` contributes its
 * test but not its branches), so collectors never descend into nested statements. Function and
 * class nodes are intentionally absent, so nested bodies are not traversed.
 */
const EXPRESSION_VISITOR_KEYS = {
  [AST.ArrayExpression]: ["elements"],
  [AST.ArrayPattern]: ["elements"],
  [AST.AssignmentExpression]: ["left", "right"],
  [AST.AssignmentPattern]: ["left", "right"],
  [AST.AwaitExpression]: ["argument"],
  [AST.BinaryExpression]: ["left", "right"],
  [AST.CallExpression]: ["callee", "arguments"],
  [AST.ChainExpression]: ["expression"],
  [AST.ConditionalExpression]: ["test", "consequent", "alternate"],
  [AST.Decorator]: ["expression"],
  [AST.DoWhileStatement]: ["test"],
  [AST.ExpressionStatement]: ["expression"],
  [AST.ForInStatement]: ["left", "right"],
  [AST.ForOfStatement]: ["left", "right"],
  [AST.ForStatement]: ["test"],
  [AST.IfStatement]: ["test"],
  [AST.ImportExpression]: ["source", "options"],
  [AST.JSXAttribute]: ["name", "value"],
  [AST.JSXElement]: ["openingElement", "children", "closingElement"],
  [AST.JSXExpressionContainer]: ["expression"],
  [AST.JSXFragment]: ["openingFragment", "children", "closingFragment"],
  [AST.JSXOpeningElement]: ["name", "typeArguments", "attributes"],
  [AST.JSXSpreadAttribute]: ["argument"],
  [AST.JSXSpreadChild]: ["expression"],
  [AST.LogicalExpression]: ["left", "right"],
  [AST.MemberExpression]: ["object", "property"],
  [AST.NewExpression]: ["callee", "arguments"],
  [AST.ObjectExpression]: ["properties"],
  [AST.ObjectPattern]: ["properties"],
  [AST.Property]: ["key", "value"],
  [AST.RestElement]: ["argument"],
  [AST.SequenceExpression]: ["expressions"],
  [AST.SpreadElement]: ["argument"],
  [AST.SwitchCase]: ["test"],
  [AST.TaggedTemplateExpression]: ["tag", "quasi"],
  [AST.TemplateLiteral]: ["expressions"],
  [AST.TSAsExpression]: ["expression"],
  [AST.TSClassImplements]: ["expression"],
  [AST.TSExportAssignment]: ["expression"],
  [AST.TSExternalModuleReference]: ["expression"],
  [AST.TSInstantiationExpression]: ["expression"],
  [AST.TSInterfaceHeritage]: ["expression"],
  [AST.TSNonNullExpression]: ["expression"],
  [AST.TSSatisfiesExpression]: ["expression"],
  [AST.TSTypeAssertion]: ["expression"],
  [AST.UnaryExpression]: ["argument"],
  [AST.UpdateExpression]: ["argument"],
  [AST.WhileStatement]: ["test"],
  [AST.YieldExpression]: ["argument"],
} as const;

/**
 * Visitor keys for return collection. Class bodies are pruned because a `return` cannot belong to
 * an outer function from inside one (`return` in a static block is invalid).
 */
const RETURN_VISITOR_KEYS: VisitorKeys = {
  ...defaultVisitorKeys,
  [AST.ClassDeclaration]: [],
  [AST.ClassExpression]: [],
};

// Shared traversal

/**
 * Traverse an expression-like node and collect every node matching a predicate, in source order.
 *
 * The traversal does not descend into function or class nodes, and treats statement roots as
 * expression containers: only their expression-bearing keys are visited. Property names that are
 * not references (`obj.prop` and non-computed object keys) are skipped.
 * @param node The node whose subtree is traversed.
 * @param isNode The predicate a collected node must satisfy.
 * @returns The matching nodes in source order.
 */
function collectNodes<T extends TSESTree.Node>(node: TSESTree.Node, isNode: (node: TSESTree.Node) => node is T): T[] {
  const nodes: T[] = [];
  Traverse.simpleTraverse(node, {
    enter(node, parent) {
      const parentNode = parent ?? node.parent;
      // Skip the property of a non-computed member access: `obj.prop` reads `obj`, not `prop`
      if (parentNode?.type === AST.MemberExpression && !parentNode.computed && parentNode.property === node) return;
      // Skip the key of a non-computed object property, which is not a reference either
      if (parentNode?.type === AST.Property && !parentNode.computed && parentNode.key === node) return;
      if (isNode(node)) nodes.push(node);
    },
    visitorKeys: EXPRESSION_VISITOR_KEYS,
  });
  return nodes;
}

// Identifier collection

/**
 * Get all identifiers referenced within an expression-like node, in source order.
 *
 * The property name of a non-computed member access is not a reference, so `obj.prop` collects
 * only `obj`. Non-computed object property keys are not visited either. Nested function and class
 * bodies are ignored, and statement roots contribute only their expression-bearing parts.
 * @param node The expression-like node to collect identifiers from.
 * @returns All identifiers referenced by the node.
 */
export function getIdentifiers(node: TSESTree.Node): readonly TSESTree.Identifier[] {
  return collectNodes(node, Check.isIdentifier);
}

// Expression collection

/**
 * Create a collector for nested expressions of the given node type.
 * @param type The node type to collect.
 * @returns A function that collects nested expressions of the given type in source order.
 */
// dprint-ignore
function getExpressionsOfType<TNodeType extends AST>(type: TNodeType): (node: TSESTree.Node) => Extract<TSESTree.Node, { type: TNodeType }>[] {
  const isNodeOfType = Check.is(type);
  return (node) => collectNodes(node, isNodeOfType);
}

/**
 * Get all nested `new` expressions within an expression-like node, in source order.
 *
 * Function and class bodies are not traversed; statement roots contribute only their
 * expression-bearing parts.
 * @param node The expression-like node to collect `new` expressions from.
 * @returns All nested `new` expressions.
 */
export const getNewExpressions = getExpressionsOfType(AST.NewExpression);

/**
 * Get all nested call expressions within an expression-like node, in source order.
 *
 * Function and class bodies are not traversed; statement roots contribute only their
 * expression-bearing parts.
 * @param node The expression-like node to collect call expressions from.
 * @returns All nested call expressions.
 */
export const getCallExpressions = getExpressionsOfType(AST.CallExpression);

// Return collection

/**
 * Get all return statements in the subtree of `node` that belong to its function.
 *
 * Return statements nested inside another function are excluded. When `node` is a function, its
 * own returns are collected; otherwise returns in its subtree are collected as long as they are
 * not nested inside a function. The search never expands beyond the subtree of `node`.
 * @param node The node whose subtree is searched.
 * @returns The return statements in the subtree, in source order.
 */
export function getReturnStatements(node: TSESTree.Node): readonly TSESTree.ReturnStatement[] {
  const stmts: TSESTree.ReturnStatement[] = [];
  // Returns directly inside a function root are at depth 1; otherwise they are at depth 0
  const boundaryDepth = Check.isFunction(node) ? 1 : 0;
  let depth = 0;
  Traverse.simpleTraverse(node, {
    enter(child) {
      if (Check.isFunction(child)) depth++;
      if (child.type === AST.ReturnStatement && depth === boundaryDepth) stmts.push(child);
    },
    leave(child) {
      if (Check.isFunction(child)) depth--;
    },
    visitorKeys: RETURN_VISITOR_KEYS,
  });
  return stmts;
}

/**
 * Get all expressions returned by a function, in source order.
 *
 * The implicit return value of an expression-bodied arrow function (ex: `() => value`) is
 * included, while bare `return;` statements without an argument are skipped. Return statements
 * inside nested functions are excluded.
 * @param node The function to collect return expressions from.
 * @returns All expressions returned by the function.
 */
export function getReturnExpressions(node: TSESTreeFunction): readonly TSESTree.Expression[] {
  if (node.body.type !== AST.BlockStatement) return [node.body];
  return getReturnStatements(node).flatMap((stmt) => stmt.argument == null ? [] : [stmt.argument]);
}
