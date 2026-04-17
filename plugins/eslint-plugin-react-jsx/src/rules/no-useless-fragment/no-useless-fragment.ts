import { Check, type TSESTreeJSXElementLike } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, type RuleFix, type RuleFixer, merge } from "@eslint-react/eslint";
import {
  getChildren,
  getJsxConfig,
  hasAnyAttribute,
  isFragmentElement,
  isHostElement,
  isWhitespaceText,
} from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { getChildrenSourceText, trimLikeReact } from "./lib";

import { createRule } from "../../utils";

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
    type: "suggestion",
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
  const jsxConfig = getJsxConfig(context);

  // ----- detection helpers -------------------------------------------------

  /**
   * Whether the fragment has too few meaningful children to justify its
   * existence (the "contains less than two children" reason).
   * @param node The fragment node to check.
   */
  function isContentUseless(node: TSESTreeJSXElementLike) {
    // Empty fragment — useless unless explicitly allowed.
    if (node.children.length === 0) {
      return !allowEmptyFragment;
    }

    const insideJsx = Check.isJSXLike(node.parent);

    // When expressions are disallowed, any fragment inside JSX is useless
    // (the wrapper serves no purpose), and a single-child fragment outside
    // JSX is also useless.
    if (!allowExpressions) {
      if (insideJsx) return true;
      if (node.children.length === 1) return true;
    }

    // When expressions are allowed, a single text child in non-JSX context
    // is tolerated (e.g. attribute values like `content={<>text</>}`).
    if (allowExpressions && !insideJsx && node.children.length === 1) {
      const child = node.children[0];
      if (child != null && child.type === AST.JSXText) {
        return false;
      }
    }

    // Filter out padding spaces (whitespace with line breaks that React
    // would trim away) and inspect the remaining meaningful children.
    const meaningful = getChildren(node);

    // No meaningful content at all.
    if (meaningful.length === 0) return true;

    // A single meaningful child that is NOT an expression container is
    // useless — the fragment wrapper adds nothing.  A single expression
    // container is kept because `allowExpressions` (the default) permits it.
    if (
      meaningful.length === 1
      && meaningful[0]!.type !== AST.JSXExpressionContainer
    ) {
      return true;
    }

    return false;
  }

  // ----- fix helpers -------------------------------------------------------

  /**
   * Whether it is safe to auto-fix the fragment by unwrapping it.
   * @param node The fragment node to check.
   */
  function isSafeToFix(node: TSESTreeJSXElementLike) {
    // Inside a JSX parent we can only safely unwrap if the parent is a host
    // (intrinsic / DOM) element.  Custom components might require `children`
    // to be a single ReactElement, so unwrapping could break them.
    if (Check.isJSXLike(node.parent)) {
      return isHostElement(node.parent);
    }

    // Outside of JSX context (e.g. `return <></>`) an empty fragment cannot
    // be replaced with nothing — that would be a syntax error.
    if (node.children.length === 0) {
      return false;
    }

    // Outside of JSX context, unwrapping children that contain text or
    // expressions would produce invalid syntax (bare text / expressions are
    // not valid JS).  Only pure element children are safe.
    return !node.children.some((child) => {
      if (child.type === AST.JSXExpressionContainer) return true;
      if (child.type === AST.JSXText) return !isWhitespaceText(child);
      return false;
    });
  }

  /**
   * Build an autofix that unwraps the fragment, replacing it with its
   * trimmed children text.  Returns `null` when the fix is unsafe.
   * @param node The fragment node to fix.
   */
  function buildFix(node: TSESTreeJSXElementLike): ((fixer: RuleFixer) => RuleFix) | null {
    if (!isSafeToFix(node)) return null;

    return (fixer) => {
      const childrenText = getChildrenSourceText(context, node);
      return fixer.replaceText(node, trimLikeReact(childrenText));
    };
  }

  // ----- visitor -----------------------------------------------------------

  /**
   * Inspect a fragment node and report if it is useless.
   *
   * A fragment may be reported for **two independent reasons** on the same
   * node (e.g. `<p><>foo</></p>` is both "placed inside a host component"
   * and* "contains less than two children").
   * @param node The fragment node to inspect.
   */
  function checkNode(node: TSESTreeJSXElementLike) {
    // A fragment inside a host component is always redundant — the host
    // element already accepts an arbitrary number of children.
    if (isHostElement(node.parent)) {
      context.report({
        data: { reason: "placed inside a host component" },
        fix: buildFix(node),
        messageId: "default",
        node,
      });
    }

    // A fragment with too few meaningful children serves no purpose.
    if (isContentUseless(node)) {
      context.report({
        data: { reason: "contains less than two children" },
        fix: buildFix(node),
        messageId: "default",
        node,
      });
    }
  }

  return merge({
    JSXElement(node) {
      if (!isFragmentElement(node, jsxConfig.jsxFragmentFactory)) return;
      if (hasAnyAttribute(context, node, ["key", "ref"])) return;
      checkNode(node);
    },
    JSXFragment(node) {
      checkNode(node);
    },
  });
}
