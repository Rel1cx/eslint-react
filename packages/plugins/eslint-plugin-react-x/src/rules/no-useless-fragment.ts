/* eslint-disable jsdoc/require-param */
import * as AST from "@eslint-react/ast";
import { getJsxAttribute, isJsxFragmentElement, isJsxHostElement, isJsxText } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";

import type { CamelCase } from "string-ts";
import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export const RULE_FEATURES = [
  "FIX",
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

type Options = readonly [
  {
    allowEmptyFragment?: boolean;
    allowExpressions?: boolean;
  },
];

const defaultOptions = [{
  allowEmptyFragment: false,
  allowExpressions: true,
}] as const satisfies Options;

const schema = [{
  type: "object",
  additionalProperties: false,
  properties: {
    allowEmptyFragment: {
      type: "boolean",
      description: "Allow empty fragments",
    },
    allowExpressions: {
      type: "boolean",
      description: "Allow fragments with a single expression child",
    },
  },
}] as const satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [...defaultOptions],
    docs: {
      description: "Disallows useless fragment elements.",
    },
    fixable: "code",
    messages: {
      noUselessFragment: "A fragment {{reason}} is useless.",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>, [option]: Options): RuleListener {
  const { allowEmptyFragment = false, allowExpressions = true } = option;
  /**
   * Check if a fragment node is useless and should be reported
   */
  function checkNode(context: RuleContext, node: TSESTree.JSXElement | TSESTree.JSXFragment) {
    // Skip if the fragment has a key prop (indicates it's needed for lists)
    if (node.type === T.JSXElement && getJsxAttribute(context, node)("key") != null) {
      return;
    }

    // Report fragment placed inside a host component (e.g., <div><></></div>)
    if (isJsxHostElement(context, node.parent)) {
      context.report({
        messageId: "noUselessFragment",
        node,
        data: { reason: "placed inside a host component" },
        fix: getFix(context, node),
      });
    }

    // Report empty fragments (e.g., <></>)
    if (node.children.length === 0) {
      // https://github.com/Rel1cx/eslint-react/issues/1265
      if (allowEmptyFragment) return;
      context.report({
        messageId: "noUselessFragment",
        node,
        data: { reason: "contains less than two children" },
        fix: getFix(context, node),
      });
      return;
    }

    const isChildElement = AST.isOneOf([T.JSXElement, T.JSXFragment])(node.parent);

    // Handle various fragment cases
    switch (true) {
      // Allow single text child in attribute value (e.g., content={<>text</>})
      case allowExpressions
        && !isChildElement
        && node.children.length === 1
        && isJsxText(node.children.at(0)): {
        return;
      }

      // Report fragment with single child inside JSX element
      case !allowExpressions
        && isChildElement: {
        context.report({
          messageId: "noUselessFragment",
          node,
          data: { reason: "contains less than two children" },
          fix: getFix(context, node),
        });
        return;
      }

      // Report fragment with single child in expressions
      case !allowExpressions
        && !isChildElement
        && node.children.length === 1: {
        context.report({
          messageId: "noUselessFragment",
          node,
          data: { reason: "contains less than two children" },
          fix: getFix(context, node),
        });
        return;
      }
    }

    // Filter out padding spaces to check actual content
    const nonPaddingChildren = node.children.filter((child) => !isPaddingSpaces(child));
    const firstNonPaddingChild = nonPaddingChildren.at(0);

    // Report if empty or only has one non-expression child
    if (
      nonPaddingChildren.length === 0
      || (nonPaddingChildren.length === 1 && firstNonPaddingChild?.type !== T.JSXExpressionContainer)
    ) {
      context.report({
        messageId: "noUselessFragment",
        node,
        data: { reason: "contains less than two children" },
        fix: getFix(context, node),
      });
    }
  }

  function getFix(context: RuleContext, node: TSESTree.JSXElement | TSESTree.JSXFragment) {
    if (!canFix(context, node)) return null;

    return (fixer: RuleFixer) => {
      const opener = node.type === T.JSXFragment ? node.openingFragment : node.openingElement;
      const closer = node.type === T.JSXFragment ? node.closingFragment : node.closingElement;

      const childrenText = opener.type === T.JSXOpeningElement && opener.selfClosing
        ? ""
        : context.sourceCode.getText().slice(opener.range[1], closer?.range[0]);

      return fixer.replaceText(node, trimLikeReact(childrenText));
    };
  }

  /**
   * Check if it's safe to automatically fix the fragment
   */
  function canFix(context: RuleContext, node: TSESTree.JSXElement | TSESTree.JSXFragment) {
    // Don't fix fragments inside custom components (might require children to be ReactElement)
    if (node.parent.type === T.JSXElement || node.parent.type === T.JSXFragment) {
      return isJsxHostElement(context, node.parent);
    }

    // Don't fix empty fragments without a JSX parent
    if (node.children.length === 0) {
      return false;
    }

    // Don't fix fragments with text or expressions outside of JSX context
    return !node
      .children
      .some((child) => (isJsxText(child) && !isWhiteSpace(child)) || AST.is(T.JSXExpressionContainer)(child));
  }

  return {
    // Check JSX elements that might be fragments
    JSXElement(node) {
      if (!isJsxFragmentElement(context, node)) return;
      checkNode(context, node);
    },
    // Check JSX fragments
    JSXFragment(node) {
      checkNode(context, node);
    },
  };
}

// ----- Helper Functions -----

/**
 * Check if a Literal or JSXText node is whitespace
 */
function isWhiteSpace(node: TSESTree.JSXText | TSESTree.Literal) {
  return typeof node.value === "string" && node.raw.trim() === "";
}

/**
 * Check if a node is padding spaces (whitespace with line breaks)
 */
function isPaddingSpaces(node: TSESTree.Node) {
  return isJsxText(node)
    && isWhiteSpace(node)
    && node.raw.includes("\n");
}

/**
 * Trim whitespace like React would in JSX
 */
function trimLikeReact(text: string) {
  const leadingSpaces = /^\s*/.exec(text)?.[0] ?? "";
  const trailingSpaces = /\s*$/.exec(text)?.[0] ?? "";

  const start = leadingSpaces.includes("\n") ? leadingSpaces.length : 0;
  const end = trailingSpaces.includes("\n") ? text.length - trailingSpaces.length : text.length;

  return text.slice(start, end);
}
