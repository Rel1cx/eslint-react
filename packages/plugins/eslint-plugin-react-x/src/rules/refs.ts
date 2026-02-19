import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { findVariable, getVariableDefinitionNode } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "refs";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "readDuringRender" | "writeDuringRender";

// #region Access classification helpers

function isWriteAccess(node: TSESTree.MemberExpression): boolean {
  const { parent } = node;
  if (parent == null) return false;
  if (parent.type === AST.AssignmentExpression && parent.left === node) return true;
  if (parent.type === AST.UpdateExpression && parent.argument === node) return true;
  return false;
}

function isInsideNestedFunction(
  node: TSESTree.Node,
  boundary: ast.TSESTreeFunction,
): boolean {
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null && current !== boundary) {
    if (ast.isFunction(current)) return true;
    current = current.parent;
  }
  return false;
}

// #endregion

// #region Lazy initialization detection

/**
 * Check if a ref.current access is part of a lazy initialization pattern.
 *
 * Standard:
 *   if (ref.current === null) { ref.current = value; }
 *
 * Inverted (with early return):
 *   if (ref.current !== null) { return ...; }
 *   ref.current = computeValue();
 */
function isPartOfLazyInitialization(node: TSESTree.MemberExpression, isWrite: boolean): boolean {
  if (node.object.type !== AST.Identifier) return false;
  const refName = node.object.name;
  // The node itself is in a `if (ref.current === null)` test
  if (isInNullCheckTest(node)) return true;
  // The node is inside the consequent/alternate of a ref null-check if-statement
  if (findEnclosingRefNullCheckIf(node, refName) != null) return true;
  // Writes after a sibling if-statement that null-checks the same ref (inverted pattern)
  if (isWrite && isWriteAfterNullCheckIf(node, refName)) return true;
  return false;
}

function isNullCheckOperator(operator: string): boolean {
  return operator === "===" || operator === "==" || operator === "!==" || operator === "!=";
}

/**
 * Check if a test expression is a null check on `ref.current` for a given ref name.
 */
function isRefCurrentNullCheck(test: TSESTree.Expression, refName: string): boolean {
  if (test.type !== AST.BinaryExpression) return false;
  if (!isNullCheckOperator(test.operator)) return false;
  const { left, right } = test;
  const isRefSide = (side: TSESTree.Expression | TSESTree.PrivateIdentifier) =>
    side.type === AST.MemberExpression
    && side.object.type === AST.Identifier
    && side.object.name === refName
    && side.property.type === AST.Identifier
    && side.property.name === "current";
  const isNullSide = (side: TSESTree.Expression | TSESTree.PrivateIdentifier) =>
    side.type === AST.Literal && side.value === null;
  return (isRefSide(left) && isNullSide(right))
    || (isRefSide(right) && isNullSide(left));
}

/**
 * Check if the node is the operand of a `ref.current === null` test inside an IfStatement.
 */
function isInNullCheckTest(node: TSESTree.MemberExpression): boolean {
  const { parent } = node;
  if (parent?.type !== AST.BinaryExpression) return false;
  if (!isNullCheckOperator(parent.operator)) return false;
  const otherSide = parent.left === node ? parent.right : parent.left;
  if (!(otherSide.type === AST.Literal && otherSide.value === null)) return false;
  return parent.parent?.type === AST.IfStatement && parent.parent.test === parent;
}

/**
 * Walk up from the node to find a containing IfStatement whose test is a null-check
 * on `ref.current` with the given ref name.
 */
function findEnclosingRefNullCheckIf(
  node: TSESTree.Node,
  refName: string,
): TSESTree.IfStatement | null {
  let current: TSESTree.Node | undefined = node.parent;
  while (current != null) {
    if (current.type === AST.IfStatement) {
      return isRefCurrentNullCheck(current.test, refName) ? current : null;
    }
    switch (current.type) {
      case AST.ExpressionStatement:
      case AST.BlockStatement:
      case AST.ReturnStatement:
      case AST.JSXExpressionContainer:
      case AST.JSXElement:
      case AST.JSXOpeningElement:
      case AST.JSXClosingElement:
      case AST.AssignmentExpression:
      case AST.VariableDeclaration:
      case AST.VariableDeclarator:
      case AST.MemberExpression:
      case AST.ChainExpression:
      case AST.CallExpression:
        break;
      default:
        return null;
    }
    current = current.parent;
  }
  return null;
}

/**
 * Check if a write to `ref.current` comes after a sibling if-statement that null-checks
 * the same ref (inverted lazy init with early return pattern):
 *
 *   if (ref.current !== null) { return ...; }
 *   ref.current = value; // ← this write
 */
function isWriteAfterNullCheckIf(
  node: TSESTree.MemberExpression,
  refName: string,
): boolean {
  // Walk up to find the statement containing this write
  let stmt: TSESTree.Node = node;
  while (stmt.parent != null && stmt.parent.type !== AST.BlockStatement) {
    stmt = stmt.parent;
  }
  if (stmt.parent?.type !== AST.BlockStatement) return false;
  const block = stmt.parent;
  const stmtIdx = block.body.indexOf(stmt as TSESTree.Statement);
  if (stmtIdx < 0) return false;
  // Look at preceding sibling statements for an if with a null check on the same ref
  for (let i = stmtIdx - 1; i >= 0; i--) {
    const sibling = block.body[i];
    if (sibling == null) continue;
    if (sibling.type === AST.IfStatement && isRefCurrentNullCheck(sibling.test, refName)) {
      return true;
    }
  }
  return false;
}

// #endregion

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Validates correct usage of refs by checking that ref.current is not read or written during render.",
    },
    messages: {
      readDuringRender:
        "Do not read 'ref.current' during render. Refs are not available during rendering and their values may be stale or inconsistent. Move this read into an effect or event handler.",
      writeDuringRender:
        "Do not write to 'ref.current' during render. Refs should only be mutated in effects or event handlers. Move this write into an effect or event handler.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const hCollector = core.useHookCollector(context);
  const cCollector = core.useComponentCollector(context);

  // Collected ref.current accesses with their enclosing function
  const refAccesses: { node: TSESTree.MemberExpression; isWrite: boolean }[] = [];

  // Identifiers passed to JSX ref props
  const jsxRefIdentifiers = new Set<string>();

  function isRefIdentifier(node: TSESTree.Expression | TSESTree.PrivateIdentifier) {
    if (node.type !== AST.Identifier) return false;
    if (core.isRefLikeName(node.name)) return true;
    if (jsxRefIdentifiers.has(node.name)) return true;
    return core.isInitializedFromRef(node.name, context.sourceCode.getScope(node));
  }

  return defineRuleListener(
    hCollector.visitor,
    cCollector.visitor,
    {
      // Track JSX ref props: <div ref={someRef} />
      JSXAttribute(node: TSESTree.JSXAttribute) {
        if (
          node.name.type === AST.JSXIdentifier
          && node.name.name === "ref"
          && node.value?.type === AST.JSXExpressionContainer
          && node.value.expression.type === AST.Identifier
        ) {
          jsxRefIdentifiers.add(node.value.expression.name);
        }
      },
      // Track ref.current accesses
      MemberExpression(node: TSESTree.MemberExpression) {
        if (
          node.property.type !== AST.Identifier
          || node.property.name !== "current"
        ) {
          return;
        }
        refAccesses.push({ node, isWrite: isWriteAccess(node) });
      },
      "Program:exit"(program) {
        const components = cCollector.ctx.getAllComponents(program);
        const hooks = hCollector.ctx.getAllHooks(program);
        const componentAndHookFns = new Set([
          ...components.map((c) => c.node),
          ...hooks.map((h) => h.node),
        ]);

        const isComponentOrHookFn = (n: TSESTree.Node): n is ast.TSESTreeFunction =>
          ast.isFunction(n) && componentAndHookFns.has(n);

        for (const { node, isWrite } of refAccesses) {
          // Must be accessing .current on a ref
          if (!isRefIdentifier(node.object)) continue;
          // Find the enclosing component or hook function
          const boundary = ast.findParentNode(node, isComponentOrHookFn);
          if (boundary == null) continue;
          // Allow access inside nested functions (effects, event handlers, callbacks)
          if (isInsideNestedFunction(node, boundary)) continue;
          // Allow lazy initialization pattern (both standard and inverted)
          if (isPartOfLazyInitialization(node, isWrite)) continue;
          context.report({
            messageId: isWrite
              ? "writeDuringRender"
              : "readDuringRender",
            node,
          });
        }
      },
    },
  );
}
