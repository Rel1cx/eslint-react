import { type RuleContext, type RuleFeature, toRegExp } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { type CamelCase, camelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-forbidden-props";

export const RULE_FEATURES = [
  "CFG",
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const messageId = camelCase(RULE_NAME);

type Options = readonly [
  {
    forbid: (string | {
      excludedNodes?: string[];
      prop: string;
    } | {
      includedNodes?: string[];
      prop: string;
    })[];
  },
];

const defaultOptions = [{
  forbid: [{ prop: "/_/" }],
}] as const satisfies Options;

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [...defaultOptions],
    deprecated: {
      deprecatedSince: "2.3.2",
      message: "This rule is deprecated and will be removed in future versions.",
      replacedBy: [{
        rule: {
          name: "no-restricted-syntax",
          url: "https://eslint.org/docs/latest/rules/no-restricted-syntax",
        },
      }],
    },
    docs: {
      description: "Disallow certain props on components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      [messageId]: 'Prop "{{name}}" is forbidden.',
    },
    schema: [{
      type: "object",
      additionalProperties: false,
      properties: {
        forbid: {
          type: "array",
          items: {
            anyOf: [
              { type: "string" },
              {
                type: "object",
                additionalProperties: false,
                properties: {
                  excludedNodes: {
                    type: "array",
                    items: { type: "string" },
                    uniqueItems: true,
                  },
                  prop: { type: "string" },
                },
                required: ["prop"],
              },
              {
                type: "object",
                additionalProperties: false,
                properties: {
                  includedNodes: {
                    type: "array",
                    items: { type: "string" },
                    uniqueItems: true,
                  },
                  prop: { type: "string" },
                },
                required: ["prop"],
              },
            ],
          },
        },
      },
    }],
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

export function create(context: RuleContext<MessageID, Options>, [option]: Options): RuleListener {
  const { forbid = [{ prop: "/_/" }] } = option;

  return {
    JSXOpeningElement(node) {
      let nodeName: string | null = null;
      // Get the name of the component element
      if (node.name.type === T.JSXIdentifier) {
        nodeName = node.name.name;
      } else if (node.name.type === T.JSXNamespacedName) {
        nodeName = node.name.name.name;
      }

      // Iterate over each attribute (prop) of the component
      for (const attr of node.attributes) {
        // Skip spread attributes
        if (attr.type === T.JSXSpreadAttribute) {
          continue;
        }
        const name = attr.name.name;
        if (typeof name !== "string") {
          continue;
        }
        // Check against each forbidden prop configuration
        for (const forbiddenPropItem of forbid) {
          if (typeof forbiddenPropItem !== "string" && nodeName != null) {
            // If the component is in the excluded list, skip it
            if ("excludedNodes" in forbiddenPropItem && forbiddenPropItem.excludedNodes.includes(nodeName)) {
              continue;
            }
            // If `includedNodes` is specified, the component must be in the list
            if ("includedNodes" in forbiddenPropItem && !forbiddenPropItem.includedNodes.includes(nodeName)) {
              continue;
            }
          }
          // Get the prop name to forbid, which can be a string or a regex pattern
          const forbiddenProp = typeof forbiddenPropItem === "string" ? forbiddenPropItem : forbiddenPropItem.prop;

          // Convert the forbidden prop string to a regular expression for matching
          const forbiddenPropRegExp = toRegExp(forbiddenProp);
          // Test if the prop name matches the forbidden pattern
          if (forbiddenPropRegExp.test(name)) {
            // Report an error if a forbidden prop is found
            context.report({
              messageId,
              node: attr,
              data: { name },
            });
          }
        }
      }
    },
  };
}
