import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { RuleFeature } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-duplicate-key";

export const RULE_FEATURES = [
  "CHK",
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
      description: "disallow duplicate keys when rendering list",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noDuplicateKey: "A key must be unique. '{{value}}' is duplicated.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    if (!context.sourceCode.getText().includes("key=")) return {};
    const keyedEntries: Map<TSESTree.Node, KeyedEntry> = new Map();
    function isKeyValueEqual(
      a: TSESTree.JSXAttribute,
      b: TSESTree.JSXAttribute,
    ): boolean {
      const aValue = a.value;
      const bValue = b.value;
      if (aValue === null || bValue === null) return false;
      return AST.isNodeEqual(aValue, bValue);
    }
    return {
      "JSXAttribute[name.name='key']"(node: TSESTree.JSXAttribute) {
        const jsxElement = node.parent.parent;
        switch (jsxElement.parent.type) {
          case AST_NODE_TYPES.ArrayExpression:
          case AST_NODE_TYPES.JSXElement:
          case AST_NODE_TYPES.JSXFragment: {
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
            const entry = F.pipe(
              O.Do,
              O.bind("call", () => AST.traverseUpGuard(jsxElement, AST.isMapCallLoose)),
              O.bind("iter", ({ call }) => AST.traverseUpStop(jsxElement, call, AST.isFunction)),
              O.bind("arg0", ({ call }) => O.fromNullable(call.arguments[0])),
            );
            for (const { arg0, call, iter } of O.toArray(entry)) {
              if (AST.unwrapTypeExpression(arg0) !== iter) continue;
              keyedEntries.set(call, {
                hasDuplicate: node.value?.type === AST_NODE_TYPES.Literal,
                keys: [node],
                root: call,
              });
            }
          }
        }
      },
      "Program:exit"() {
        for (const { hasDuplicate, keys } of keyedEntries.values()) {
          if (!hasDuplicate) continue;
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
  },
  defaultOptions: [],
});
