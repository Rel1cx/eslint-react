/* eslint-disable jsdoc/require-param */
import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleFixer } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export const RULE_FEATURES = [
  "FIX",
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID = "default";

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
      default: "A fragment {{reason}} is useless.",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>, [option]: Options) {
  const { allowEmptyFragment = false, allowExpressions = true } = option;

  const jsxConfig = {
    ...core.getJsxConfigFromContext(context),
    ...core.getJsxConfigFromAnnotation(context),
  };

  /**
   * Check if a fragment node is useless and should be reported
   */
  function checkNode(context: RuleContext, node: TSESTree.JSXElement | TSESTree.JSXFragment) {
    // Skip if the fragment has a key prop (indicates it's needed for lists)
    if (node.type === AST.JSXElement && core.getJsxAttribute(context, node)("key") != null) {
      return;
    }

    // Report fragment placed inside a host component (e.g., <div><></></div>)
    if (core.isJsxHostElement(context, node.parent)) {
      context.report({
        messageId: "default",
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
        messageId: "default",
        node,
        data: { reason: "contains less than two children" },
        fix: getFix(context, node),
      });
      return;
    }

    const isChildElement = ast.isOneOf([AST.JSXElement, AST.JSXFragment])(node.parent);

    // Handle various fragment cases
    switch (true) {
      // Allow single text child in attribute value (e.g., content={<>text</>})
      case allowExpressions
        && !isChildElement
        && node.children.length === 1
        && core.isJsxText(node.children.at(0)): {
        return;
      }

      // Report fragment with single child inside JSX element
      case !allowExpressions
        && isChildElement: {
        context.report({
          messageId: "default",
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
          messageId: "default",
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
      || (nonPaddingChildren.length === 1 && firstNonPaddingChild?.type !== AST.JSXExpressionContainer)
    ) {
      context.report({
        messageId: "default",
        node,
        data: { reason: "contains less than two children" },
        fix: getFix(context, node),
      });
    }
  }

  function getFix(context: RuleContext, node: TSESTree.JSXElement | TSESTree.JSXFragment) {
    if (!canFix(context, node)) return null;

    return (fixer: RuleFixer) => {
      const opener = node.type === AST.JSXFragment ? node.openingFragment : node.openingElement;
      const closer = node.type === AST.JSXFragment ? node.closingFragment : node.closingElement;

      const childrenText = opener.type === AST.JSXOpeningElement && opener.selfClosing
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
    if (node.parent.type === AST.JSXElement || node.parent.type === AST.JSXFragment) {
      return core.isJsxHostElement(context, node.parent);
    }

    // Don't fix empty fragments without a JSX parent
    if (node.children.length === 0) {
      return false;
    }

    // Don't fix fragments with text or expressions outside of JSX context
    return !node
      .children
      .some((child) => (core.isJsxText(child) && !isWhiteSpace(child)) || ast.is(AST.JSXExpressionContainer)(child));
  }

  return defineRuleListener(
    {
      // Check JSX elements that might be fragments
      JSXElement(node) {
        if (!core.isJsxFragmentElement(context, node, jsxConfig)) return;
        checkNode(context, node);
      },
      // Check JSX fragments
      JSXFragment(node) {
        checkNode(context, node);
      },
    },
  );
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
  return core.isJsxText(node)
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
