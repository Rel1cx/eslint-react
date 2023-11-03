import { NodeType } from "@eslint-react/ast";
import { getFragmentFromContext, getPragmaFromContext, isFragmentElement } from "@eslint-react/jsx";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { RuleFixer } from "@typescript-eslint/utils/ts-eslint";
import type { ConstantCase } from "string-ts";

import { createRule, trimLikeReact } from "../utils";

export const RULE_NAME = "prefer-fragment-syntax";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce using fragment syntax instead of `Pragma.Fragment`",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    fixable: "code",
    schema: [],
    messages: {
      PREFER_FRAGMENT_SYNTAX: "Use fragment syntax instead of `{{reactPragma}}.{{fragmentPragma}}`.",
    },
  },
  defaultOptions: [],
  create(context) {
    const reactPragma = getPragmaFromContext(context);
    const fragmentPragma = getFragmentFromContext(context);

    function getFix(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
      return function fix(fixer: RuleFixer) {
        const opener = node.type === NodeType.JSXFragment ? node.openingFragment : node.openingElement;
        const closer = node.type === NodeType.JSXFragment ? node.closingFragment : node.closingElement;

        const childrenText = opener.type === NodeType.JSXOpeningElement && opener.selfClosing
          ? ""
          : context
            .getSourceCode()
            .getText()
            .slice(opener.range[1], closer?.range[0]);

        return fixer.replaceText(node, `<>${trimLikeReact(childrenText)}</>`);
      };
    }

    return {
      JSXElement(node) {
        if (isFragmentElement(node, reactPragma, fragmentPragma)) {
          const hasAttributes = node.openingElement.attributes.length > 0;

          if (hasAttributes) {
            return;
          }

          context.report({
            data: {
              fragmentPragma,
              reactPragma,
            },
            fix: getFix(node),
            messageId: "PREFER_FRAGMENT_SYNTAX",
            node,
          });
        }
      },
    };
  },
});
