import { createRule } from "@/utils/create-rule";
import { Check, type TSESTreeJSXElementLike } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, getText } from "@eslint-react/eslint";
import { collapseMultilineText, getChildren, hasAnyAttribute, isFragmentElement, isHostElement, isWhitespaceText } from "@eslint-react/jsx";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleFix, RuleFixer } from "@typescript-eslint/utils/ts-eslint";

export const RULE_NAME = "no-useless-fragment";

export const RULE_FEATURES = [
  "CFG",
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = "default";

type Options = readonly [
  | undefined
  | {
    allowEmptyFragment?: boolean;
    allowExpressions?: boolean;
  },
];

type ResolvedOptions = Required<NonNullable<Options[0]>>;

const defaultOptions = [{
  allowEmptyFragment: false,
  allowExpressions: true,
}] as const satisfies Options;

const schema: [JSONSchema4] = [{
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
}];

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
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const option = context.options[0] ?? defaultOptions[0];
  const options: ResolvedOptions = {
    allowEmptyFragment: option.allowEmptyFragment ?? defaultOptions[0].allowEmptyFragment,
    allowExpressions: option.allowExpressions ?? defaultOptions[0].allowExpressions,
  };
  const { jsxFragmentFactory } = core.getJSXConfig(context);

  return {
    JSXElement(node) {
      if (!isFragmentElement(node, jsxFragmentFactory)) {
        return;
      }
      if (hasIdentityAttribute(node)) {
        return;
      }
      visitFragment(context, node, options);
    },
    JSXFragment(node) {
      visitFragment(context, node, options);
    },
  };
}

/**
 * Check if the element carries props that would be lost when the fragment is unwrapped.
 *
 * Spread attributes are opaque and may provide `key` or `ref`, so any spread is
 * treated as an identity attribute.
 * @param node The JSX element to check.
 * @returns `true` if the element has a spread, `key`, or `ref` attribute.
 */
function hasIdentityAttribute(node: TSESTree.JSXElement): boolean {
  return node.openingElement.attributes.some((a) => a.type === AST.JSXSpreadAttribute)
    || hasAnyAttribute(node, ["key", "ref"]);
}

/**
 * Inspect a fragment node and report if it is useless.
 *
 * A fragment may be reported for **two independent reasons** on the same
 * node (e.g. `<p><>foo</></p>` is both "placed inside a host component"
 * and "contains less than two children").
 * @param context The rule context.
 * @param node The fragment node to inspect.
 * @param options The resolved rule options.
 */
function visitFragment(context: RuleContext, node: TSESTreeJSXElementLike, options: ResolvedOptions) {
  const reasons: string[] = [];

  // A fragment inside a host component is always redundant — the host
  // element already accepts an arbitrary number of children.
  if (isHostElement(node.parent)) reasons.push("placed inside a host component");

  // A fragment with too few meaningful children serves no purpose.
  if (isContentUseless(node, options)) reasons.push("contains less than two children");

  if (reasons.length === 0) return;

  const fix = buildFix(context, node);
  for (const reason of reasons) {
    context.report({
      data: { reason },
      fix,
      messageId: "default",
      node,
    });
  }
}

/**
 * Whether the fragment has too few meaningful children to justify its
 * existence (the "contains less than two children" reason).
 * @param node The fragment node to check.
 * @param options The resolved rule options.
 */
function isContentUseless(node: TSESTreeJSXElementLike, options: ResolvedOptions) {
  const { allowEmptyFragment, allowExpressions } = options;

  // Empty fragment — useless unless explicitly allowed.
  if (node.children.length === 0) {
    return !allowEmptyFragment;
  }

  // A single text child outside JSX keeps its exception: unwrapping would
  // silently turn the text into an identifier reference (ex:
  // `content={<>text</>}` → `content={text}`), and multi-word text would
  // not even parse.
  const insideJSX = Check.isJSXElementOrFragment(node.parent);
  if (allowExpressions && !insideJSX && node.children.length === 1 && node.children[0]?.type === AST.JSXText) {
    return false;
  }

  const meaningful = getChildren(node);
  if (meaningful.length === 0) return true;
  if (meaningful.length > 1) return false;

  const child = meaningful[0];
  if (child?.type === AST.JSXExpressionContainer) return !allowExpressions;
  return true;
}

/**
 * Whether it is safe to auto-fix the fragment by unwrapping it.
 * @param node The fragment node to check.
 */
function isSafeToFix(node: TSESTreeJSXElementLike) {
  // Inside a JSX parent we can only safely unwrap if the parent is a host
  // (intrinsic / DOM) element.  Custom components might require `children`
  // to be a single ReactElement, so unwrapping could break them.
  if (Check.isJSXElementOrFragment(node.parent)) {
    return isHostElement(node.parent);
  }

  // Outside of JSX context (e.g. `return <></>`) an empty fragment cannot
  // be replaced with nothing — that would be a syntax error. The same goes
  // for fragments whose children are all whitespace: unwrapping them would
  // leave an empty expression behind.
  if (!node.children.some((child) => Check.isJSXElementOrFragment(child))) return false;

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
 * children content.  Returns `null` when the fix is unsafe.
 * @param context The rule context.
 * @param node The fragment node to fix.
 */
function buildFix(context: RuleContext, node: TSESTreeJSXElementLike): ((fixer: RuleFixer) => RuleFix) | null {
  if (!isSafeToFix(node)) return null;

  return (fixer) => {
    const sourceCode = context.sourceCode;
    let text = "";
    for (const child of node.children) {
      if (child.type === AST.JSXText) {
        const cleaned = collapseMultilineText(child.value);
        if (cleaned != null) text += cleaned;
      } else {
        text += getText(context, child);
      }
    }

    let start = node.range[0];

    // When unwrapping leaves nothing behind and only indentation precedes
    // the fragment on its line, also remove that indentation.
    if (text === "" && node.children.length > 0) {
      const lineStart = Math.max(
        sourceCode.text.lastIndexOf("\n", start - 1),
        sourceCode.text.lastIndexOf("\r", start - 1),
      ) + 1;
      if (/^[ \t]*$/u.test(sourceCode.text.slice(lineStart, start))) start = lineStart;
    }
    return fixer.replaceTextRange([start, node.range[1]], text);
  };
}
