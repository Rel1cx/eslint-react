import * as AST from "@eslint-react/ast";
import {
  getInstanceId,
  getJsxAttribute,
  getJsxConfigFromAnnotation,
  getJsxConfigFromContext,
  isJsxFragmentElement,
} from "@eslint-react/core";
import { type RuleContext, type RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

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
      description: "Disallows unnecessary 'key' props on elements.",
    },
    messages: {
      noUnnecessaryKey: "Unnecessary `key` prop on this element. {{reason}}",
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
  const jsxConfig = {
    ...getJsxConfigFromContext(context),
    ...getJsxConfigFromAnnotation(context),
  };
  return {
    JSXAttribute(node: TSESTree.JSXAttribute) {
      // Check if the attribute is a `key` prop
      if (node.name.name !== "key") return;
      const jsxElement = node.parent.parent;
      // Always allow `<React.Fragment key={...}>` to avoid false positives
      if (isJsxFragmentElement(context, jsxElement, jsxConfig)) return;
      // If there is a spread attribute, it's not safe to report an unnecessary key
      if (jsxElement.openingElement.attributes.some((attr) => attr.type === T.JSXSpreadAttribute)) return;
      // Find the parent `.map()` callback function, if it exists
      const mapCallback = AST.findParentNode(jsxElement, isMapCallback);
      // Check static keys on elements that are not in a map context
      if (mapCallback == null || AST.findParentNode(jsxElement, AST.isFunction) !== mapCallback) {
        // Check if the keyed element is inside a condition expression, control flow statement, or has an instance ID
        const isInDynamicStructure = AST
          .findParentNode(jsxElement, (n) => AST.isConditional(n) || AST.isControlFlow(n) || getInstanceId(n) != null)
          != null;
        if (!isInDynamicStructure) {
          context.report({
            messageId: "noUnnecessaryKey",
            node,
            data: { reason: "The `key` prop is not needed outside of dynamic rendering contexts." },
          });
        }
        return;
      }
      // If the `.map()` callback is not in the same scope, exit
      if (context.sourceCode.getScope(mapCallback) !== context.sourceCode.getScope(jsxElement)) return;
      // Find the nearest parent that is either the map callback or a JSX element with a `key` prop
      const keyedElementOrElse = AST.findParentNode(
        jsxElement,
        (n) => {
          // Stop searching if we reach the map callback
          if (n === mapCallback) return true;
          // Check if the node is a JSX element with a `key` prop
          return AST.isJSXElement(n) && getJsxAttribute(context, n)("key") != null;
        },
      );
      // If the search stopped at the map callback, it means no parent element had a key
      // In this case, the current key is necessary, so we exit
      if (keyedElementOrElse == null || keyedElementOrElse === mapCallback) return;
      // Otherwise, a parent element with a `key` was found, so the current `key` is unnecessary
      context.report({
        messageId: "noUnnecessaryKey",
        node,
        data: { reason: "A parent element already has a `key` prop in the same list rendering context." },
      });
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
