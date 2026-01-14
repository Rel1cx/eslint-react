import * as AST from "@eslint-react/ast";
import { type RuleContext, type RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const RULE_NAME = "no-duplicate-key";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

type KeyedEntry = {
  hasDuplicate: boolean;
  keys: TSESTree.JSXAttribute[];
  root: TSESTree.Expression;
};

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows duplicate 'key' on elements in the same array or a list of 'children'.",
    },
    messages: {
      noDuplicateKey: "A key must be unique. '{{value}}' is duplicated.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `key=` is not present in the file
  if (!context.sourceCode.text.includes("key=")) return {};
  // Map to store key attributes grouped by their parent node
  const keyedEntries = new Map<TSESTree.Node, KeyedEntry>();
  // Helper function to check if two key attribute values are equal
  function isKeyValueEqual(
    a: TSESTree.JSXAttribute,
    b: TSESTree.JSXAttribute,
  ): boolean {
    const aValue = a.value;
    const bValue = b.value;
    // If either value is null, they are not considered equal
    if (aValue == null || bValue == null) {
      return false;
    }
    // Compare the AST nodes of the values for equality
    return AST.isNodeEqual(aValue, bValue);
  }
  return {
    // Visitor for all JSX attributes named 'key'
    "JSXAttribute[name.name='key']"(node: TSESTree.JSXAttribute) {
      const jsxElement = node.parent.parent;
      // Check the parent of the JSX element to determine the context
      switch (jsxElement.parent.type) {
        // Case 1: Elements in an array expression, JSX element, or JSX fragment
        case T.ArrayExpression:
        case T.JSXElement:
        case T.JSXFragment: {
          const root = jsxElement.parent;
          const prevKeys = keyedEntries.get(root)?.keys ?? [];
          // Check for duplicates and update the map
          keyedEntries.set(root, {
            hasDuplicate: prevKeys.some((prevKey) => isKeyValueEqual(prevKey, node)),
            keys: [...prevKeys, node],
            root: jsxElement.parent,
          });
          break;
        }
        // Case 2: Elements created by an array's .map() call
        default: {
          const call = AST.findParentNode(jsxElement, AST.isArrayMapCallLoose);
          const iter = AST.findParentNode(jsxElement, (n) => n === call || AST.isFunction(n));
          if (!AST.isFunction(iter)) return;
          const arg0 = call?.arguments[0];
          if (call == null || arg0 == null) return;
          // Ensure we are inside the callback of the .map() call
          if (AST.getUnderlyingExpression(arg0) !== iter) {
            return;
          }
          // Flag literal keys in .map() calls as they are a common source of duplication
          keyedEntries.set(call, {
            hasDuplicate: node.value?.type === T.Literal,
            keys: [node],
            root: call,
          });
        }
      }
    },
    "Program:exit"() {
      for (const { hasDuplicate, keys } of keyedEntries.values()) {
        if (!hasDuplicate) {
          continue;
        }
        // Report an error for each duplicate key found
        for (const key of keys) {
          context.report({
            messageId: "noDuplicateKey",
            node: key,
            data: {
              value: context.sourceCode.getText(key),
            },
          });
        }
      }
    },
  };
}
