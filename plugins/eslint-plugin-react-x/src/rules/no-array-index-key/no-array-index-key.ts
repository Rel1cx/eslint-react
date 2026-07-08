import { createRule } from "@/utils/create-rule";
import { Extract } from "@eslint-react/ast";
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

/**
 * Gets the value of an object property named 'key' (e.g. in `createElement('div', { key: ... })`).
 * @param property The object literal member to inspect.
 * @returns The value of the 'key' property, or `null` if the member is not one.
 */
function getKeyPropValue(property: TSESTree.ObjectLiteralElement): TSESTree.Node | null {
  if (property.type !== AST.Property || property.computed) return null;
  const isKeyName = (property.key.type === AST.Identifier && property.key.name === "key")
    || (property.key.type === AST.Literal && property.key.value === "key");
  return isKeyName ? property.value : null;
}

export function create(context: RuleContext<MessageID, []>): RuleListener {
  type Descriptor = ReportDescriptor<MessageID> & { node: TSESTree.Node };

  // Checks if a given node is an identifier that resolves to an array index parameter
  function isArrayIndex(node: TSESTree.Node): node is TSESTree.Identifier {
    return node.type === AST.Identifier && isArrayIndexReference(context, node);
  }

  // Checks if a call expression is `React.createElement` or `React.cloneElement`
  function isCreateOrCloneElementCall(node: TSESTree.Node): node is TSESTree.CallExpression {
    return core.isCreateElementCall(context, node) || core.isCloneElementCall(context, node);
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
        if (callee.type === AST.MemberExpression && Extract.getPropertyName(callee.property) === "toString" && isArrayIndex(callee.object)) {
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
      if (!isCreateOrCloneElementCall(node)) return;
      const [, props] = node.arguments;
      if (props?.type !== AST.ObjectExpression) return;
      for (const property of props.properties) {
        const value = getKeyPropValue(property);
        if (value == null) continue;
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
