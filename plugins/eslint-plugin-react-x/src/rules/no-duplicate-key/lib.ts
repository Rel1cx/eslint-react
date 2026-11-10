import { Check, Compare, Extract } from "@eslint-react/ast";
import { isChildrenMapCall, isChildrenToArrayCall } from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check whether an element can flow into the return value of a function, by
 * ascending from the element through value-transparent nodes only (conditional
 * branches, logical expressions, TS wrappers, ...) until the function is reached
 * via its implicit body or a `return` statement.
 */
export function isReturnedBy(element: TSESTree.JSXElement, fn: TSESTree.Node): boolean {
  let node: TSESTree.Node = element;
  let viaReturn = false;
  while (true) {
    const parent: TSESTree.Node | undefined = node.parent;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (parent == null) return false;
    if (parent === fn) {
      if (viaReturn) return true;
      return parent.type === AST.ArrowFunctionExpression && parent.body === node;
    }
    if (Check.isTypeOrChainExpression(parent) || parent.type === AST.LogicalExpression) {
      node = parent;
      continue;
    }
    switch (parent.type) {
      case AST.ConditionalExpression:
        if (parent.test === node) return false;
        node = parent;
        continue;
      case AST.SequenceExpression:
        if (parent.expressions[parent.expressions.length - 1] !== node) return false;
        node = parent;
        continue;
      case AST.ReturnStatement:
        viaReturn = true;
        node = parent;
        continue;
      case AST.BlockStatement:
      case AST.IfStatement:
        if (!viaReturn) return false;
        node = parent;
        continue;
      default:
        return false;
    }
  }
}

/**
 * Check whether a sibling container's keys are reassigned by an enclosing
 * `Children.toArray`/`Children.map` call, making duplicates impossible.
 * Keys scoped inside a JSX element are not reassigned, so elements are never
 * re-keyed containers for their own children.
 */
export function isRekeyedByChildrenCall(context: RuleContext, root: TSESTree.Node): boolean {
  if (root.type === AST.JSXElement) return false;
  let node: TSESTree.Node | undefined = root.parent;
  while (node != null) {
    if (isChildrenToArrayCall(context, node) || isChildrenMapCall(context, node)) return true;
    switch (node.type) {
      // Flattenable containers: `Children.toArray`/`Children.map` recurse into these and re-key every child they find.
      case AST.ArrayExpression:
      case AST.ConditionalExpression:
      case AST.JSXExpressionContainer:
      case AST.JSXFragment:
      case AST.LogicalExpression:
      case AST.SpreadElement:
        node = node.parent;
        continue;
      default:
        if (Check.isTypeOrChainExpression(node)) {
          node = node.parent;
          continue;
        }
        return false;
    }
  }
  return false;
}

/** Check if a `.map()` call is made on an array literal that provably yields at most one element. */
export function mapsProvablyAtMostOneElement(call: TSESTree.CallExpression): boolean {
  const callee = Extract.unwrap(call.callee);
  if (callee.type !== AST.MemberExpression) return false;
  const object = Extract.unwrap(callee.object);
  return object.type === AST.ArrayExpression
    && object.elements.length <= 1
    && !object.elements.some((element) => element?.type === AST.SpreadElement);
}

export function isKeyValueEqual(a: TSESTree.JSXAttribute, b: TSESTree.JSXAttribute): boolean {
  const aValue = a.value;
  const bValue = b.value;
  // Valueless keys (`key`) never match.
  if (aValue == null || bValue == null) return false;
  return Compare.isEqual(aValue, bValue);
}

/**
 * Check whether a `key` attribute value is a compile-time constant that repeats on
 * every iteration of a `.map()` callback.
 *
 * `null` and `undefined` are excluded: React treats both as "no key" and falls back
 * to index keys, so they cannot duplicate. Dynamic expressions (`item.id`, call
 * results, ...) and scope-dependent bindings are not evaluated.
 * @param key The `key` attribute to check.
 * @returns `true` if the key provably has the same value on every iteration.
 */
export function isRepeatingStaticKey(key: TSESTree.JSXAttribute): boolean {
  const { value } = key;
  // A bare `key` attribute is `key={true}`, the same on every iteration.
  if (value == null) return true;
  if (value.type === AST.Literal) return true;
  if (value.type !== AST.JSXExpressionContainer) return false;
  const expr = Extract.unwrap(value.expression);
  if (expr.type === AST.Literal) return expr.value != null;
  if (expr.type === AST.TemplateLiteral) return expr.expressions.length === 0;
  return false;
}
