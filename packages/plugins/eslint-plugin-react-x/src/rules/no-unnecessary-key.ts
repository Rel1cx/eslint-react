import * as AST from "@eslint-react/ast";
import {
  getJsxAttribute,
  getJsxConfigFromAnnotation,
  getJsxConfigFromContext,
  isJsxFragmentElement,
  isRenderFunctionLoose,
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
      description: "Disallows unnecessary 'key' props on nested child elements when rendering lists.",
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
      // If inside a render function, it's not safe to report an unnecessary key
      if (AST.findParentNode(jsxElement, (n) => isRenderFunctionLoose(context, n)) != null) return;
      // Find the parent `.map()` callback function, if it exists
      const mapCallback = AST.findParentNode(jsxElement, isArrayMethodCallback);
      // If the element is not in a map context, it's not safe to report an unnecessary key, @see https://github.com/Rel1cx/eslint-react/issues/1436
      if (mapCallback == null || AST.findParentNode(jsxElement, AST.isFunction) !== mapCallback) return;
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

export function getArrayMethodCallbackPosition(methodName: string) {
  switch (methodName) {
    case "filter":
    case "flatMap":
    case "forEach":
    case "map":
    case "reduce":
    case "reduceRight":
      return 0;
    case "from":
    case "fromAsync":
      return 1;
    default:
      return -1;
  }
}

function isArrayMethodCallback(node: TSESTree.Node) {
  const parent = node.parent;
  if (parent?.type !== T.CallExpression) return false;
  if (parent.callee.type !== T.MemberExpression || parent.callee.property.type !== T.Identifier) return false;
  return parent.arguments[getArrayMethodCallbackPosition(parent.callee.property.name)] === node;
}
