import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleFixer, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import * as AST from "@eslint-react/ast";
import * as JSX from "@eslint-react/jsx";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export const RULE_FEATURES = [
  "FIX",
  "CFG",
] as const satisfies RuleFeature[];

export type MessageID = "uselessFragment";

type Options = readonly [
  {
    allowExpressions: boolean;
  },
];

const defaultOptions = [{
  allowExpressions: true,
}] as const satisfies Options;

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [...defaultOptions],
    docs: {
      description: "Disallow useless fragment elements.",
    },
    fixable: "code",
    messages: {
      uselessFragment: "A fragment {{reason}} is useless.",
    },
    schema: [{
      type: "object",
      additionalProperties: false,
      properties: {
        allowExpressions: {
          type: "boolean",
          description: "Allow fragments with a single expression child",
        },
      },
    }],
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>, [option]: Options): RuleListener {
  const { allowExpressions = true } = option;
  return {
    JSXElement(node) {
      if (!JSX.isJsxFragmentElement(node)) return;
      checkNode(context, node, allowExpressions);
    },
    JSXFragment(node) {
      checkNode(context, node, allowExpressions);
    },
  };
}

/**
 * Check if a Literal or JSXText node is whitespace
 * @param node The AST node to check
 * @returns boolean `true` if the node is whitespace
 */
function isWhiteSpace(node: TSESTree.JSXText | TSESTree.Literal) {
  return typeof node.value === "string" && node.raw.trim() === "";
}

/**
 * Check if a Literal or JSXText node is padding spaces
 * @param node The AST node to check
 * @returns boolean
 */
function isPaddingSpaces(node: TSESTree.Node) {
  return JSX.isJsxText(node)
    && isWhiteSpace(node)
    && node.raw.includes("\n");
}

function trimLikeReact(text: string) {
  const leadingSpaces = /^\s*/.exec(text)?.[0] ?? "";
  const trailingSpaces = /\s*$/.exec(text)?.[0] ?? "";

  const start = leadingSpaces.includes("\n") ? leadingSpaces.length : 0;
  const end = trailingSpaces.includes("\n") ? text.length - trailingSpaces.length : text.length;

  return text.slice(start, end);
}

function checkNode(
  context: RuleContext,
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  allowExpressions: boolean,
) {
  const initialScope = context.sourceCode.getScope(node);
  // return if the fragment is keyed (e.g. <Fragment key={key}>)
  if (JSX.isJsxKeyedElement(node, initialScope)) {
    return;
  }
  // report if the fragment is placed inside a built-in component (e.g. <div><></></div>)
  if (JSX.isJsxBuiltInElement(node.parent)) {
    context.report({
      messageId: "uselessFragment",
      node,
      data: {
        reason: "placed inside a built-in component",
      },
      fix: getFix(context, node),
    });
  }
  // report and return if the fragment has no children (e.g. <></>)
  if (node.children.length === 0) {
    context.report({
      messageId: "uselessFragment",
      node,
      data: {
        reason: "contains less than two children",
      },
      fix: getFix(context, node),
    });
    return;
  }
  const isChildElement = AST.isOneOf([T.JSXElement, T.JSXFragment])(node.parent);
  switch (true) {
    // <Foo content={<>ee eeee eeee ...</>} />
    case allowExpressions
      && !isChildElement
      && node.children.length === 1
      && JSX.isJsxText(node.children.at(0)): {
      return;
    }
    // <Foo><>hello, world</></Foo>
    case !allowExpressions
      && isChildElement: {
      context.report({
        messageId: "uselessFragment",
        node,
        data: {
          reason: "contains less than two children",
        },
        fix: getFix(context, node),
      });
      return;
    }
    case !allowExpressions
      && !isChildElement
      && node.children.length === 1: {
      // const foo = <>{children}</>;
      // return <>{children}</>;
      context.report({
        messageId: "uselessFragment",
        node,
        data: {
          reason: "contains less than two children",
        },
        fix: getFix(context, node),
      });
      return;
    }
  }
  const nonPaddingChildren = node.children.filter((child) => !isPaddingSpaces(child));
  const firstNonPaddingChild = nonPaddingChildren.at(0);
  switch (true) {
    case nonPaddingChildren.length === 0:
    case nonPaddingChildren.length === 1
      && firstNonPaddingChild?.type !== T.JSXExpressionContainer: {
      context.report({
        messageId: "uselessFragment",
        node,
        data: {
          reason: "contains less than two children",
        },
        fix: getFix(context, node),
      });
      return;
    }
  }
  return;
}

function getFix(context: RuleContext, node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  if (!canFix(node)) return null;
  return (fixer: RuleFixer) => {
    const opener = node.type === T.JSXFragment ? node.openingFragment : node.openingElement;
    const closer = node.type === T.JSXFragment ? node.closingFragment : node.closingElement;

    const childrenText = opener.type === T.JSXOpeningElement && opener.selfClosing
      ? ""
      : context.sourceCode.getText().slice(opener.range[1], closer?.range[0]);

    return fixer.replaceText(node, trimLikeReact(childrenText));
  };
}

function canFix(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  if (node.parent.type === T.JSXElement || node.parent.type === T.JSXFragment) {
    // Not safe to fix `<Eeee><>foo</></Eeee>` because `Eeee` might require its children be a ReactElement.
    return !JSX.isJsxUserDefinedElement(node.parent);
  }
  // Not safe to fix fragments without a jsx parent.
  // const a = <></>
  if (node.children.length === 0) {
    return false;
  }
  // dprint-ignore
  // const a = <>{meow}</>
  if (node.children.some((child) => (JSX.isJsxText(child) && !isWhiteSpace(child)) || AST.is(T.JSXExpressionContainer)(child))) {
    return false;
  }
  return true;
}
