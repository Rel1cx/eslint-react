import * as AST from "@eslint-react/ast";
import {
  getJsxAttribute,
  getJsxConfigFromAnnotation,
  getJsxConfigFromContext,
  isJsxFragmentElement,
  isRenderFunctionLoose,
  useComponentCollector,
} from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { findEnclosingAssignmentTarget } from "@eslint-react/var";
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
  const { ctx, visitor } = useComponentCollector(context);
  const constantKeys = new Set<TSESTree.JSXAttribute>();
  return defineRuleListener(
    visitor,
    {
      JSXAttribute(node: TSESTree.JSXAttribute) {
        // Check if the attribute is a `key` prop
        if (node.name.name !== "key") return;
        const jsxElement = node.parent.parent;
        // Always allow `<React.Fragment key={...}>` to avoid false positives
        if (isJsxFragmentElement(context, jsxElement, jsxConfig)) return;
        // If there is a spread attribute, it's not safe to report an unnecessary key
        if (jsxElement.openingElement.attributes.some((attr) => attr.type === T.JSXSpreadAttribute)) return;
        // If inside a render function, skip checking to avoid false positives
        if (AST.findParentNode(jsxElement, (n) => isRenderFunctionLoose(context, n)) != null) return;
        // Find the parent `.map()` callback function, if it exists
        const mapCallback = AST.findParentNode(jsxElement, isArrayMethodCallback);
        // Check static keys on elements that are not in a map context
        if (mapCallback == null || AST.findParentNode(jsxElement, AST.isFunction) !== mapCallback) {
          constantKeys.add(node);
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
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);
        for (const key of constantKeys) {
          // Check if the keyed element is inside dynamic structures
          const isInDynamicStructure = AST.findParentNode(key, (n) =>
            AST.isConditional(n)
            || AST.isControlFlow(n)
            || findEnclosingAssignmentTarget(n) != null
            || components.some((comp) => comp.node === n && comp.rets.length > 1)) != null;
          // We cant be sure the key is unnecessary
          if (isInDynamicStructure) continue;
          context.report({
            messageId: "noUnnecessaryKey",
            node: key,
            data: { reason: "The `key` prop is not needed outside of dynamic rendering contexts." },
          });
        }
      },
    },
  );
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
