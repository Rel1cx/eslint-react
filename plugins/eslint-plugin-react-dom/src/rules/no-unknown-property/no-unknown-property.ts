// Ported from https://github.com/jsx-eslint/eslint-plugin-react/blob/master/lib/rules/no-unknown-property.js
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import {
  ATTRIBUTE_TAGS_MAP,
  getStandardName,
  getTagName,
  getText,
  has,
  hasUpperCaseCharacter,
  isValidAriaAttribute,
  isValidDataAttribute,
  isValidHTMLTagInJSX,
  normalizeAttributeCase,
  tagNameHasDot,
} from "./lib";

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

export const RULE_NAME = "no-unknown-property";

export const RULE_FEATURES = [
  "FIX",
  "CFG",
] as const satisfies RuleFeature[];

// ------------------------------------------------------------------------------
// Types
// ------------------------------------------------------------------------------

type MessageID =
  | "dataLowercaseRequired"
  | "invalidPropOnTag"
  | "unknownProp"
  | "unknownPropWithStandardName";

interface Options {
  ignore?: string[];
  requireDataLowercase?: boolean;
}

// ------------------------------------------------------------------------------
// Default Options
// ------------------------------------------------------------------------------

const DEFAULTS: {
  ignore: string[];
  requireDataLowercase: boolean;
} = {
  ignore: [],
  requireDataLowercase: false,
};

// ------------------------------------------------------------------------------
// Rule Definition & Implementation
// ------------------------------------------------------------------------------

const messages = {
  dataLowercaseRequired:
    "React does not recognize data-* props with uppercase characters on a DOM element. Found '{{name}}', use '{{lowerCaseName}}' instead",
  invalidPropOnTag:
    "Invalid property '{{name}}' found on tag '{{tagName}}', but it is only allowed on: {{allowedTags}}",
  unknownProp: "Unknown property '{{name}}' found",
  unknownPropWithStandardName: "Unknown property '{{name}}' found, use '{{standardName}}' instead",
};

export default createRule({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows unknown 'DOM' properties.",
    },
    fixable: "code",
    messages,
    schema: [{
      type: "object",
      additionalProperties: false,
      properties: {
        ignore: {
          type: "array",
          items: {
            type: "string",
          },
        },
        requireDataLowercase: {
          type: "boolean",
          default: false,
        },
      },
    }],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

/**
 * Create function for the ESLint rule
 * @param context ESLint rule context
 * @returns Rule listener
 */
export function create(context: RuleContext<MessageID, Options[]>) {
  /**
   * Gets the ignore configuration from rule options
   * @returns Array of attribute names to ignore
   */
  function getIgnoreConfig(): string[] {
    return context.options[0]?.ignore ?? DEFAULTS.ignore;
  }

  /**
   * Gets the requireDataLowercase option from rule options
   * @returns Whether data attributes must be lowercase
   */
  function getRequireDataLowercase(): boolean {
    return context.options[0]?.requireDataLowercase ?? DEFAULTS.requireDataLowercase;
  }

  return merge(
    {
      JSXAttribute(node): void {
        const ignoreNames: string[] = getIgnoreConfig();
        const actualName: string = getText(context, node.name);

        // Skip checking if the attribute name is in the ignore list
        if (ignoreNames.includes(actualName)) {
          return;
        }

        const name: string = normalizeAttributeCase(actualName);

        // Ignore tags like <Foo.bar />
        if (tagNameHasDot(node)) {
          return;
        }

        // Handle data-* attributes
        if (isValidDataAttribute(name)) {
          if (getRequireDataLowercase() && hasUpperCaseCharacter(name)) {
            context.report({
              data: {
                name: actualName,
                lowerCaseName: actualName.toLowerCase(),
              },
              messageId: "dataLowercaseRequired",
              node,
            });
          }
          return;
        }

        // Handle ARIA attributes
        if (isValidAriaAttribute(name)) return;

        const tagName: string | null = getTagName(node);

        // Special case for fbt/fbs nodes
        if (tagName === "fbt" || tagName === "fbs") return;

        // Only validate HTML/DOM elements, not React components
        if (!isValidHTMLTagInJSX(node)) return;

        // Check if attribute is allowed only on specific tags
        const allowedTags = has(ATTRIBUTE_TAGS_MAP, name)
          ? ATTRIBUTE_TAGS_MAP[name]
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
              messageId: "invalidPropOnTag",
              node,
            });
          }
          return;
        }

        // Check if the attribute name is similar to a standard property name
        const standardName: string | null = getStandardName(name, context);

        const hasStandardNameButIsNotUsed = standardName != null && standardName !== name;
        const usesStandardName = standardName != null && standardName === name;
        if (usesStandardName) {
          // Attribute name is correct, nothing to do
          return;
        }

        if (hasStandardNameButIsNotUsed) {
          // Suggest the correct standard name
          context.report({
            data: {
              name: actualName,
              standardName,
            },
            fix(fixer) {
              return fixer.replaceText(node.name, standardName);
            },
            messageId: "unknownPropWithStandardName",
            node,
          });
          return;
        }

        // Report unknown attribute
        context.report({
          data: {
            name: actualName,
          },
          messageId: "unknownProp",
          node,
        });
      },
    },
  );
}
