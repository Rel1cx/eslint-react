import { createRule } from "@/utils/create-rule";
import { Check, type TSESTreeJSXElementLike } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";
import { collapseMultilineText, getChildren, hasAnyAttribute, isFragmentElement, isHostElement, isWhitespaceText } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

export const RULE_NAME = "no-useless-fragment";

export const RULE_FEATURES = [
  "CFG",
  "FIX",
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

export function create(context: RuleContext<MessageID, Options>, [option]: Options): RuleListener {
  const { allowEmptyFragment = false, allowExpressions = true } = option;
  const jsxConfig = core.getJsxConfig(context);

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

    const insideJsx = Check.isJSXElementOrFragment(node.parent);

    // A single text child outside JSX cannot be unwrapped into a valid
    // expression, so keep the existing exception for attribute values such as
    // `content={<>text</>}`.
    if (allowExpressions && !insideJsx && node.children.length === 1 && node.children[0]?.type === AST.JSXText) {
      return false;
    }

    const meaningful = getChildren(node);
    if (meaningful.length === 0) return true;
    if (meaningful.length > 1) return false;

    const child = meaningful[0];
    if (child?.type === AST.JSXExpressionContainer) return !allowExpressions;
    return true;
  }

  // ----- fix helpers -------------------------------------------------------

  /**
   * Whether it is safe to auto-fix the fragment by unwrapping it.
   * @param node The fragment node to check.
   */
  function isSafeToFix(node: TSESTreeJSXElementLike) {
    if (node.type === AST.JSXElement && node.openingElement.attributes.some((attr) => attr.type === AST.JSXSpreadAttribute)) {
      return false;
    }

    // Inside a JSX parent we can only safely unwrap if the parent is a host
    // (intrinsic / DOM) element.  Custom components might require `children`
    // to be a single ReactElement, so unwrapping could break them.
    if (Check.isJSXElementOrFragment(node.parent)) {
      return isHostElement(node.parent);
    }

    // Outside of JSX context (e.g. `return <></>`) an empty fragment cannot
    // be replaced with nothing — that would be a syntax error.
    if (node.children.length === 0) return false;

    // Outside of JSX context, only element/fragment children and padding
    // whitespace can be moved into the surrounding expression. Text,
    // expressions, and spread children would produce invalid JavaScript.
    return node.children.every((child) => {
      if (Check.isJSXElementOrFragment(child)) return true;
      return child.type === AST.JSXText && isWhitespaceText(child);
    });
  }

  /**
   * Build an autofix that unwraps the fragment, replacing it with its
   * meaningful children content.  Returns `null` when the fix is unsafe.
   * @param node The fragment node to fix.
   */
  function buildFix(node: TSESTreeJSXElementLike): ((fixer: RuleFixer) => RuleFix) | null {
    if (!isSafeToFix(node)) return null;

    return (fixer) => {
      let text = "";
      for (const child of node.children) {
        if (child.type === AST.JSXText) {
          const cleaned = collapseMultilineText(child.value);
          if (cleaned != null) text += cleaned;
        } else {
          text += context.sourceCode.getText(child);
        }
      }
      let start = node.range[0];
      if (text === "" && node.children.length > 0) {
        const lineStart = Math.max(
          context.sourceCode.text.lastIndexOf("\n", start - 1),
          context.sourceCode.text.lastIndexOf("\r", start - 1),
        ) + 1;
        if (/^[ \t]*$/u.test(context.sourceCode.text.slice(lineStart, start))) start = lineStart;
      }
      return fixer.replaceTextRange([start, node.range[1]], text);
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
  function visit(node: TSESTreeJSXElementLike) {
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

  return {
    JSXElement(node) {
      if (!isFragmentElement(node, jsxConfig.jsxFragmentFactory)) return;
      if (hasAnyAttribute(context, node, ["key", "ref"])) return;
      visit(node);
    },
    JSXFragment(node) {
      visit(node);
    },
  };
}
