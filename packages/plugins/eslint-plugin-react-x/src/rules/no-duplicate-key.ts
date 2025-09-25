import * as AST from "@eslint-react/ast";
import { type RuleContext, type RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const RULE_NAME = "no-duplicate-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

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
      description: "Disallow duplicate `key` on elements in the same array or a list of `children`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
  if (!context.sourceCode.getText().includes("key=")) {
    return {};
  }
  const keyedEntries = new Map<TSESTree.Node, KeyedEntry>();
  function isKeyValueEqual(
    a: TSESTree.JSXAttribute,
    b: TSESTree.JSXAttribute,
  ): boolean {
    const aValue = a.value;
    const bValue = b.value;
    if (aValue == null || bValue == null) {
      return false;
    }
    return AST.isNodeEqual(aValue, bValue);
  }
  return {
    "JSXAttribute[name.name='key']"(node: TSESTree.JSXAttribute) {
      const jsxElement = node.parent.parent;
      switch (jsxElement.parent.type) {
        case T.ArrayExpression:
        case T.JSXElement:
        case T.JSXFragment: {
          const root = jsxElement.parent;
          const prevKeys = keyedEntries.get(root)?.keys ?? [];
          keyedEntries.set(root, {
            hasDuplicate: prevKeys.some((prevKey) => isKeyValueEqual(prevKey, node)),
            keys: [...prevKeys, node],
            root: jsxElement.parent,
          });
          break;
        }
        default: {
          const call = AST.findParentNode(jsxElement, AST.isArrayMapCall);
          const iter = AST.findParentNode(jsxElement, (n) => n === call || AST.isFunction(n));
          if (!AST.isFunction(iter)) return;
          const arg0 = call?.arguments[0];
          if (call == null || arg0 == null) return;
          if (AST.getUnderlyingExpression(arg0) !== iter) {
            return;
          }
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
