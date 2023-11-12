import { NodeType } from "@eslint-react/ast";
import { findPropInProperties, getProp, isCreateElementCall } from "@eslint-react/jsx";
import { O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-prop";

export type MessageID = ConstantCase<typeof RULE_NAME>;

// No need to check because TypeScript don't allow this
// function isValidAttribute(
//   prop: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute,
// ) {
//   return (
//     "value" in prop
//     && prop.value
//     && "expression" in prop.value
//     && isFunction(prop.value.expression)
//   );
// }

// No need to check because TypeScript don't allow this
// function isValidProperty(
//   prop:
//     | TSESTree.PropertyComputedName
//     | TSESTree.PropertyNonComputedName
//     | TSESTree.RestElement
//     | TSESTree.SpreadElement,
// ) {
//   return (
//     "value" in prop
//     && prop.value
//     && "type" in prop.value
//     && isFunction(prop.value)
//   );
// }

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow passing of children as props",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_CHILDREN_PROP: "Children should always be actual children, not passed in as a prop.",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      JSXElement(node) {
        O.map(getProp(node.openingElement.attributes, "children", context), prop => {
          context.report({
            messageId: "NO_CHILDREN_PROP",
            node: prop,
          });
        });
      },
      // eslint-disable-next-line perfectionist/sort-objects
      CallExpression(node) {
        if (node.arguments.length === 0) {
          return;
        }

        if (!isCreateElementCall(node, context)) {
          return;
        }

        const [_, props] = node.arguments;

        if (!props || props.type !== NodeType.ObjectExpression) {
          return;
        }

        O.map(findPropInProperties(props.properties, context)("children"), prop => {
          context.report({
            messageId: "NO_CHILDREN_PROP",
            node: prop,
          });
        });
      },
    };
  },
});
