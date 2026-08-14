import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { getIdentifiersFromBinaryExpression, isArrayIndexReference } from "./lib";

export const RULE_NAME = "no-array-index-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

/** Global functions that convert their first argument while preserving its identity as a key. */
const COERCION_FUNCTIONS = new Set(["Number", "String"]);

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows using an item's index in the array as its key.",
    },
    messages: {
      default: "Do not use item index in the array as its key.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  type Descriptor = ReportDescriptor<MessageID> & { node: TSESTree.Node };

  // Checks if a given node is an identifier that resolves to an array index parameter
  function isArrayIndex(node: TSESTree.Node): node is TSESTree.Identifier {
    return Check.isIdentifier(node) && isArrayIndexReference(context, node);
  }

  // Gets the props object of a `createElement` or `cloneElement` call
  function getPropsObject(node: TSESTree.CallExpression): TSESTree.ObjectExpression | null {
    const props = node.arguments[1];
    if (core.isCreateElementCall(context, node)) {
      return core.getCreateElementPropsObject(context, node);
    }
    if (!core.isCloneElementCall(context, node)) return null;
    return props?.type === AST.ObjectExpression ? props : null;
  }

  /**
   * Checks an expression used as a 'key' value, recursing into the branches
   * it may evaluate to and reporting every array index it is derived from.
   * @param node The key value expression to check.
   * @returns The report descriptors for the violations found.
   */
  function visitKeyExpression(node: TSESTree.Node): Descriptor[] {
    switch (node.type) {
      // Case: key={index}
      case AST.Identifier:
        return isArrayIndex(node)
          ? [{ messageId: "default", node }]
          : [];
      // Case: key={`foo-${index}`}
      // Note: only direct interpolations are checked; composite expressions
      // like `${item.type + index}` derive the key from item data as well
      case AST.TemplateLiteral:
        return node.expressions
          .filter(isArrayIndex)
          .map((expression) => ({ messageId: "default", node: expression }));
      // Case: key={'foo' + index}
      case AST.BinaryExpression:
        return getIdentifiersFromBinaryExpression(node)
          .filter(isArrayIndex)
          .map((identifier) => ({ messageId: "default", node: identifier }));
      // Case: key={cond ? index : id}
      case AST.ConditionalExpression:
        return [
          ...visitKeyExpression(node.consequent),
          ...visitKeyExpression(node.alternate),
        ];
      // Case: key={id || index}
      case AST.LogicalExpression:
        return [
          ...visitKeyExpression(node.left),
          ...visitKeyExpression(node.right),
        ];
      // Case: key={index.toString()} or key={String(index)}
      case AST.CallExpression: {
        const callee = Extract.unwrap(node.callee);
        // Case: key={index.toString()}
        if (callee.type === AST.MemberExpression && Extract.getCalleeName(node) === "toString" && isArrayIndex(callee.object)) {
          return [{ messageId: "default", node: callee.object }];
        }
        // Case: key={String(index)} or key={Number(index)}
        const argument = node.arguments.at(0);
        if (callee.type === AST.Identifier && COERCION_FUNCTIONS.has(callee.name) && argument != null && isArrayIndex(argument)) {
          return [{ messageId: "default", node: argument }];
        }
        return [];
      }
      default:
        return [];
    }
  }

  return {
    // Handles 'key' props in `createElement` and `cloneElement` calls
    CallExpression(node) {
      const propsObject = getPropsObject(node);
      if (propsObject == null) return;
      for (const property of propsObject.properties) {
        if (property.type !== AST.Property) continue;
        if (property.computed) continue;
        if (Extract.getPropertyName(property, "max") !== "key") continue;
        const value = property.value;
        for (const desc of visitKeyExpression(value)) {
          context.report(desc);
        }
      }
    },
    // Handles 'key' attributes in JSX elements
    "JSXAttribute[name.name='key']"(node: TSESTree.JSXAttribute) {
      if (node.value?.type !== AST.JSXExpressionContainer) return;
      for (const desc of visitKeyExpression(node.value.expression)) {
        context.report(desc);
      }
    },
  };
}
