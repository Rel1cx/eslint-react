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
} from "@eslint-react/jsx";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export type MessageID = "NO_USELESS_FRAGMENT" | "NO_USELESS_FRAGMENT_IN_BUILT_IN";

type Options = readonly [
  {
    allowExpressions?: boolean;
  }?,
];

const defaultOptions = [
  {
    allowExpressions: true,
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
    schema,
    messages: {
      NO_USELESS_FRAGMENT: "Fragments containing a single element are usually unnecessary.",
      NO_USELESS_FRAGMENT_IN_BUILT_IN: "Passing a fragment to a built-in component is unnecessary.",
    },
  },
  defaultOptions,
  create(context) {
    const config = context.options[0] ?? {};
    const allowExpressions = config.allowExpressions ?? true;

    const reactPragma = getPragmaFromContext(context);
    const fragmentPragma = getFragmentFromContext(context);

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
          messageId: "NO_USELESS_FRAGMENT",
          node,
        });
      }

      if (isJSXElementOfBuiltinComponent(node.parent)) {
        context.report({
          messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN",
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
