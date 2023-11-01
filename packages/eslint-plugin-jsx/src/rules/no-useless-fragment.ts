import { NodeType } from "@eslint-react/ast";
import {
  getFragmentFromContext,
  getPragmaFromContext,
  hasProp,
  isFragmentElement,
  isFragmentHasLessThanTwoChildren,
  isFragmentWithOnlyTextAndIsNotChild,
  isFragmentWithSingleExpression,
  isJSXElementOfBuiltinComponent,
  isJSXElementOfUserDefinedComponent,
  isLiteral,
  isWhiteSpace,
} from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleFixer } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

function trimLikeReact(text: string) {
  const leadingSpaces = /^\s*/u.exec(text)?.[0];
  const trailingSpaces = /\s*$/u.exec(text)?.[0];

  const start = leadingSpaces?.includes("\n") ? leadingSpaces.length : 0;
  const end = trailingSpaces?.includes("\n") ? text.length - trailingSpaces.length : text.length;

  return text.slice(start, end);
}

export const RULE_NAME = "no-useless-fragment";

export type MessageID = "NO_USELESS_FRAGMENT" | "NO_USELESS_FRAGMENT_IN_HTML";

type Options = readonly [
  {
    allowExpressions?: boolean;
  }?,
];

const defaultOptions = [
  {
    allowExpressions: false,
  },
] as const;

const schema = [{
  type: "object",
  properties: {
    allowExpressions: {
      type: "boolean",
    },
  },
}] satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow unnecessary fragments",
      requiresTypeChecking: false,
    },
    fixable: "code",
    // eslint-disable-next-line perfectionist/sort-objects
    schema,
    messages: {
      NO_USELESS_FRAGMENT:
        "Fragments should contain more than one child - otherwise, there's no need for a Fragment at all.",
      NO_USELESS_FRAGMENT_IN_HTML: "Passing a fragment to an HTML element is useless.",
    },
  },
  defaultOptions,
  create(context) {
    const config = context.options[0] ?? {};
    const allowExpressions = config.allowExpressions ?? false;

    const reactPragma = getPragmaFromContext(context);
    const fragmentPragma = getFragmentFromContext(context);

    function canFix(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
      // Not safe to fix fragments without a jsx parent.
      if (!(node.parent.type === NodeType.JSXElement || node.parent.type === NodeType.JSXFragment)) {
        // const a = <></>
        if (node.children.length === 0) {
          return false;
        }

        // const a = <>cat {meow}</>
        if (
          node.children.some(
            (child) =>
              // eslint-disable-next-line @typescript-eslint/no-extra-parens
              (isLiteral(child) && !isWhiteSpace(child))
              || child.type === NodeType.JSXExpressionContainer,
          )
        ) {
          return false;
        }
      }

      // Not safe to fix `<Eeee><>foo</></Eeee>` because `Eeee` might require its children be a ReactElement
      return !(isJSXElementOfUserDefinedComponent(node.parent)
        && !isFragmentElement(node.parent, reactPragma, fragmentPragma));
    }

    function getFix(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
      if (!canFix(node)) {
        return null;
      }

      return function fix(fixer: RuleFixer) {
        const opener = node.type === NodeType.JSXFragment ? node.openingFragment : node.openingElement;
        const closer = node.type === NodeType.JSXFragment ? node.closingFragment : node.closingElement;

        const childrenText = opener.type === NodeType.JSXOpeningElement && opener.selfClosing
          ? ""
          : context
            .getSourceCode()
            .getText()
            .slice(opener.range[1], closer?.range[0]);

        return fixer.replaceText(node, trimLikeReact(childrenText));
      };
    }

    function checkNode(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
      if (
        node.type === NodeType.JSXElement
        && hasProp(
          node.openingElement.attributes,
          "key",
          context,
        )
      ) {
        return;
      }

      if (
        isFragmentHasLessThanTwoChildren(node)
        && !isFragmentWithOnlyTextAndIsNotChild(node)
        && !(allowExpressions && isFragmentWithSingleExpression(node))
      ) {
        context.report({
          fix: getFix(node),
          messageId: "NO_USELESS_FRAGMENT",
          node,
        });
      }

      if (isJSXElementOfBuiltinComponent(node.parent)) {
        context.report({
          fix: getFix(node),
          messageId: "NO_USELESS_FRAGMENT_IN_HTML",
          node,
        });
      }
    }

    return {
      JSXElement(node) {
        if (isFragmentElement(node, reactPragma, fragmentPragma)) {
          checkNode(node);
        }
      },
      JSXFragment: checkNode,
    };
  },
});
