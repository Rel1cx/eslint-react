import * as AST from "@eslint-react/ast";
import { type RuleContext, type RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-unnecessary-key";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents 'key' from being placed on non-top-level elements in list rendering.",
    },
    messages: {
      noUnnecessaryKey:
        "Unnecessary `key` prop on this element. The `key` should be on the top-level element returned from the array.",
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
  return {
    JSXAttribute(node: TSESTree.JSXAttribute) {
      // Check if the attribute is a `key` prop
      if (node.name.name !== "key") return;
      const jsxElement = node.parent.parent;
      const initialScope = context.sourceCode.getScope(jsxElement);
      // Find the parent `.map()` callback function, if it exists
      const pMapCallback = AST.findParentNode(jsxElement, isMapCallback);
      // If not inside a `.map()` callback in the same scope, exit
      if (pMapCallback == null || context.sourceCode.getScope(pMapCallback) !== initialScope) return;
      // Find the nearest parent that is either the map callback or a JSX element with a `key` prop
      const pKeyedElementOrElse = AST.findParentNode(
        jsxElement,
        (n) => {
          // Stop searching if we reach the map callback
          if (n === pMapCallback) return true;
          // Check if the node is a JSX element with a `key` prop
          return AST.isJSXElement(n)
            && n
              .openingElement
              .attributes
              .some((n) =>
                n.type === T.JSXAttribute
                && n.name.type === T.JSXIdentifier
                && n.name.name === "key"
              );
        },
      );
      // If the search stopped at the map callback, it means no parent element had a key
      // In this case, the current key is necessary, so we exit
      if (pKeyedElementOrElse == null || pKeyedElementOrElse === pMapCallback) return;
      // Otherwise, a parent element with a `key` was found, so the current `key` is unnecessary
      context.report({ messageId: "noUnnecessaryKey", node });
    },
  };
}

/**
 * Checks if a node is a callback function passed to an array's `.map()` method
 * @param node The node to check
 * @returns `true` if the node is a map callback, `false` otherwise
 */
function isMapCallback(node: TSESTree.Node) {
  if (node.parent == null) return false;
  if (!AST.isArrayMapCall(node.parent)) return false;
  return AST.isOneOf([T.ArrowFunctionExpression, T.FunctionExpression])(AST.getUnderlyingExpression(node));
}
