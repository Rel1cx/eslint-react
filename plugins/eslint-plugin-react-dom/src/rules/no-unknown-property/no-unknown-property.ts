// Ported from https://github.com/jsx-eslint/eslint-plugin-react/blob/master/lib/rules/no-unknown-property.js
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener, getText } from "@eslint-react/eslint";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import {
  getAttributeTagsMap,
  getStandardName,
  getTagName,
  has,
  hasUpperCaseCharacter,
  isValidAriaAttribute,
  isValidDataAttribute,
  isValidHTMLTagInJSX,
  normalizeAttributeCase,
  tagNameHasDot,
} from "./lib";

export const RULE_NAME = "no-unknown-property";

export const RULE_FEATURES = [
  "FIX",
  "CFG",
] as const satisfies RuleFeature[];

// ------------------------------------------------------------------------------
// Types
// ------------------------------------------------------------------------------

export type MessageID =
  | "data-lowercase-required"
  | "invalid-prop-on-tag"
  | "unknown-prop"
  | "unknown-prop-with-standard-name";

type Options = readonly [
  {
    ignore?: readonly string[];
    requireDataLowercase?: boolean;
  }?,
];

type RuleOptions = NonNullable<Options[0]>;

// ------------------------------------------------------------------------------
// Schema
// ------------------------------------------------------------------------------

const schema: [JSONSchema4] = [{
  type: "object",
  additionalProperties: false,
  properties: {
    ignore: {
      type: "array",
      description: "Property names to ignore.",
      items: {
        type: "string",
      },
    },
    requireDataLowercase: {
      type: "boolean",
      description: "Require lowercase names for data-* attributes.",
    },
  },
}];

// ------------------------------------------------------------------------------
// Rule Definition & Implementation
// ------------------------------------------------------------------------------

const messages = {
  "data-lowercase-required":
    "React does not recognize data-* props with uppercase characters on a DOM element. Found '{{name}}', use '{{lowerCaseName}}' instead",
  "invalid-prop-on-tag": "Invalid property '{{name}}' found on tag '{{tagName}}', but it is only allowed on: {{allowedTags}}",
  "unknown-prop": "Unknown property '{{name}}' found",
  "unknown-prop-with-standard-name": "Unknown property '{{name}}' found, use '{{standardName}}' instead",
};

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [{}],
    docs: {
      description: "Disallows unknown 'DOM' properties.",
    },
    fixable: "code",
    messages,
    schema,
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, Options>): RuleListener {
  const options: RuleOptions = { ...(context.options[0] ?? {}) };
  const ignore = options.ignore ??= [];
  const requireDataLowercase = options.requireDataLowercase ??= false;

  let attributeTagsMap: ReturnType<typeof getAttributeTagsMap> | null = null;

  return {
    JSXAttribute(node) {
      const actualName = getText(context, node.name);

      // Skip checking if the attribute name is in the ignore list
      if (ignore.includes(actualName)) {
        return;
      }

      const name = normalizeAttributeCase(actualName);

      // Ignore tags like <Foo.bar />
      if (tagNameHasDot(node)) {
        return;
      }

      // Handle data-* attributes
      if (isValidDataAttribute(name)) {
        if (requireDataLowercase && hasUpperCaseCharacter(name)) {
          context.report({
            data: {
              name: actualName,
              lowerCaseName: actualName.toLowerCase(),
            },
            messageId: "data-lowercase-required",
            node,
          });
        }
        return;
      }

      // Handle ARIA attributes
      if (isValidAriaAttribute(name)) {
        return;
      }

      const tagName = getTagName(node);

      // Special case for fbt/fbs nodes
      if (tagName === "fbt" || tagName === "fbs") {
        return;
      }

      // Only validate HTML/DOM elements, not React components
      if (!isValidHTMLTagInJSX(node)) {
        return;
      }

      // Check if attribute is allowed only on specific tags
      // Resolve lazily so invalid version settings do not fail rule creation.
      const tagsMap = attributeTagsMap ??= getAttributeTagsMap(context);
      const allowedTags = has(tagsMap, name)
        ? tagsMap[name]
        : null;

      if (tagName != null && allowedTags != null) {
        // Report if attribute is used on a tag where it's not allowed
        if (!allowedTags.includes(tagName)) {
          context.report({
            data: {
              name: actualName,
              allowedTags: allowedTags.join(", "),
              tagName,
            },
            messageId: "invalid-prop-on-tag",
            node,
          });
        }
        return;
      }

      // Check if the attribute name is similar to a standard property name
      const standardName = getStandardName(name, context);

      if (standardName == null) {
        context.report({
          data: {
            name: actualName,
          },
          messageId: "unknown-prop",
          node,
        });
        return;
      }

      // Attribute name is correct, nothing to do
      if (standardName === name) {
        return;
      }

      // Suggest the correct standard name
      context.report({
        data: {
          name: actualName,
          standardName,
        },
        fix(fixer) {
          return fixer.replaceText(node.name, standardName);
        },
        messageId: "unknown-prop-with-standard-name",
        node,
      });
    },
  };
}
