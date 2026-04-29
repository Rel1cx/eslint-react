import { createRule } from "@/utils/create-rule";
import { Check, Compare, Extract, Traverse } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-duplicate-key";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

type KeyedEntry = {
  hasDuplicate: boolean;
  keys: TSESTree.JSXAttribute[];
  root: TSESTree.Expression;
};

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents duplicate 'key' props on sibling elements when rendering lists.",
    },
    messages: {
      default: "The 'key' prop must be unique to its sibling elements.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
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
    return Compare.isEqual(aValue, bValue);
  }
  return merge(
    {
      // Visitor for all JSX attributes named 'key'
      "JSXAttribute[name.name='key']"(node: TSESTree.JSXAttribute) {
        const jsxElement = node.parent.parent;
        // Check the parent of the JSX element to determine the context
        switch (jsxElement.parent.type) {
          // Case 1: Elements in an array expression, JSX element, or JSX fragment
          case AST.ArrayExpression:
          case AST.JSXElement:
          case AST.JSXFragment: {
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
            const call = Traverse.findParent(
              jsxElement,
              (n): n is TSESTree.CallExpression => {
                if (n.type !== AST.CallExpression) return false;
                const callee = Extract.unwrap(n.callee);
                return callee.type === AST.MemberExpression
                  && callee.property.type === AST.Identifier
                  && callee.property.name === "map";
              },
            );
            const iter = Traverse.findParent(jsxElement, (n) => n === call || Check.isFunction(n));
            if (!Check.isFunction(iter)) return;
            const arg0 = call?.arguments[0];
            if (call == null || arg0 == null) return;
            // Ensure we are inside the callback of the .map() call
            if (Extract.unwrap(arg0) !== iter) {
              return;
            }
            // Flag literal keys in .map() calls as they are a common source of duplication
            keyedEntries.set(call, {
              hasDuplicate: node.value?.type === AST.Literal,
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
              data: {
                value: context.sourceCode.getText(key),
              },
              messageId: "default",
              node: key,
            });
          }
        }
      },
    },
  );
}
