import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, type TSESTreeJSXElementLike } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { hasAttribute } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { getNestedReturnStatements, report } from "./lib";

export const RULE_NAME = "no-missing-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID =
  | "default"
  | "unexpectedFragmentSyntax";

/**
 * Iterator-like methods whose callback's return value becomes an item in a rendered list,
 * mapped to the position of the callback in the call's argument list.
 * `from` covers `Array.from(iterable, mapFn)`.
 */
const ITERATOR_METHOD_CALLBACK_POSITIONS = new Map<string, number>([
  ["flatMap", 0],
  ["from", 1],
  ["map", 0],
]);

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows missing 'key' on items in list rendering.",
    },
    messages: {
      default: "Missing 'key' for element when rendering list.",
      unexpectedFragmentSyntax: "Use fragment component instead of '<>' because it does not support `key`.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

/**
 * Gets the mapping callback of an iterator-like call expression (e.g. `.map(cb)`, `.flatMap(cb)`, `Array.from(it, cb)`).
 * @param node The call expression to inspect.
 * @returns The callback function node, or `null` if the call is not an iterator-like call with a function callback.
 */
function getIteratorCallback(node: TSESTree.CallExpression): TSESTreeFunction | null {
  const callee = Extract.unwrap(node.callee);
  if (callee.type !== AST.MemberExpression) return null;
  if (callee.property.type !== AST.Identifier) return null;
  const position = ITERATOR_METHOD_CALLBACK_POSITIONS.get(callee.property.name);
  if (position == null) return null;
  const callback = node.arguments[position];
  if (callback == null || !Check.isFunction(callback)) return null;
  return callback;
}

export function create(context: RuleContext<MessageID, []>): RuleListener {
  type Descriptor = ReportDescriptor<MessageID> & { node: TSESTreeJSXElementLike };

  // Tracks how many `Children.toArray()` calls we are currently inside of;
  // `Children.toArray()` assigns keys automatically, so checks are skipped there
  let childrenToArrayDepth = 0;

  /**
   * Checks an expression that is rendered as an item of a list,
   * recursing into the branches it may evaluate to.
   * @param node The expression to check.
   * @returns The report descriptors for the violations found.
   */
  function checkItemExpression(node: TSESTree.Expression): Descriptor[] {
    switch (node.type) {
      case AST.JSXElement:
        return hasAttribute(context, node, "key")
          ? []
          : [{ messageId: "default", node }];
      case AST.JSXFragment:
        return [{ messageId: "unexpectedFragmentSyntax", node }];
      case AST.ConditionalExpression:
        return [
          ...checkItemExpression(node.consequent),
          ...checkItemExpression(node.alternate),
        ];
      case AST.LogicalExpression:
        return [
          ...checkItemExpression(node.left),
          ...checkItemExpression(node.right),
        ];
      default:
        return [];
    }
  }

  /**
   * Checks every value an iterator callback may produce as a list item,
   * whether from an expression body or from return statements in a block body.
   * @param node The callback function to check.
   * @returns The report descriptors for the violations found.
   */
  function checkIteratorCallback(node: TSESTreeFunction): Descriptor[] {
    if (node.body.type !== AST.BlockStatement) {
      return checkItemExpression(node.body);
    }
    return getNestedReturnStatements(node.body)
      .flatMap((stmt) => stmt.argument == null ? [] : checkItemExpression(stmt.argument));
  }

  return {
    ArrayExpression(node) {
      if (childrenToArrayDepth > 0) return;
      for (const element of node.elements) {
        if (element == null || element.type === AST.SpreadElement) continue;
        checkItemExpression(element).forEach(report(context));
      }
    },
    CallExpression(node) {
      if (core.isChildrenToArrayCall(context, node)) {
        childrenToArrayDepth += 1;
        return;
      }
      if (childrenToArrayDepth > 0) return;
      const callback = getIteratorCallback(node);
      if (callback == null) return;
      checkIteratorCallback(callback).forEach(report(context));
    },
    "CallExpression:exit"(node) {
      if (core.isChildrenToArrayCall(context, node)) {
        childrenToArrayDepth -= 1;
      }
    },
  };
}
