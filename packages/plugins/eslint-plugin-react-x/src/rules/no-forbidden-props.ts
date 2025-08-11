import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import { type RuleContext, type RuleFeature } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { camelCase, type CamelCase } from "string-ts";
import { createRule } from "../utils";

export const RULE_NAME = "no-forbidden-props";

export const RULE_FEATURES = ["CFG"] as const satisfies RuleFeature[];
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
    docs: {
      description: "Disallow certain props on components.",
    },
    messages: {
      [messageId]: 'Prop "{{name}}" is forbidden.',
    },
    schema: [{
      type: "object",
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
      if (node.name.type === T.JSXIdentifier) {
        nodeName = node.name.name;
      } else if (node.name.type === T.JSXNamespacedName) {
        nodeName = node.name.name.name;
      }

      for (const attr of node.attributes) {
        if (attr.type === T.JSXSpreadAttribute) {
          continue;
        }
        const name = attr.name.name;
        if (typeof name !== "string") {
          continue;
        }
        for (const forbiddenPropItem of forbid) {
          if (typeof forbiddenPropItem !== "string" && nodeName != null) {
            if ("excludedNodes" in forbiddenPropItem && forbiddenPropItem.excludedNodes.includes(nodeName)) {
              continue;
            }
            if ("includedNodes" in forbiddenPropItem && !forbiddenPropItem.includedNodes.includes(nodeName)) {
              continue;
            }
          }
          const forbiddenProp = typeof forbiddenPropItem === "string" ? forbiddenPropItem : forbiddenPropItem.prop;

          if (forbiddenProp.startsWith("/") && forbiddenProp.endsWith("/")) {
            // Handle regex patterns like '/_/'
            const regexPattern = forbiddenProp.slice(1, -1);
            const regex = new RegExp(regexPattern);
            if (!regex.test(name)) {
              continue;
            }
          } else if (forbiddenProp !== name) {
            continue;
          }
          context.report({
            messageId,
            node: attr,
            data: { name },
          });
        }
      }
    },
  };
}
