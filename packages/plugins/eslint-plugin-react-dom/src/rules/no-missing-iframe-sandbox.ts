import { findPropInAttributes, getElementType, getPropValue } from "@eslint-react/jsx";
import { decodeSettings, expandSettings } from "@eslint-react/shared";
import { F, isString, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-iframe-sandbox";

export type MessageID = CamelCase<typeof RULE_NAME>;

const validTypes = [
  "allow-downloads",
  "allow-downloads-without-user-activation",
  "allow-forms",
  "allow-modals",
  "allow-orientation-lock",
  "allow-pointer-lock",
  "allow-popups",
  "allow-popups-to-escape-sandbox",
  "allow-presentation",
  "allow-same-origin",
  "allow-scripts",
  "allow-storage-access-by-user-activation",
  "allow-top-navigation",
  "allow-top-navigation-by-user-activation",
  "allow-top-navigation-to-custom-protocols",
] as const;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that add the 'sandbox' attribute internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that 'iframe' component have an explicit 'sandbox' attribute",
    },
    messages: {
      noMissingIframeSandbox: "Add missing 'sandbox' attribute on 'iframe' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { components, polymorphicPropName } = expandSettings(decodeSettings(context.settings));
    return {
      JSXElement(node) {
        const elementType = getElementType(context, components, polymorphicPropName)(node.openingElement);
        if (elementType !== "iframe") return;
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const maybeSandboxAttribute = findPropInAttributes(attributes, context, initialScope)("sandbox");
        if (O.isNone(maybeSandboxAttribute)) {
          context.report({
            messageId: "noMissingIframeSandbox",
            node: node.openingElement,
          });
          return;
        }
        const sandboxAttribute = maybeSandboxAttribute.value;
        const hasValidSandbox = F.pipe(
          getPropValue(sandboxAttribute, context),
          O.flatMapNullable(v => v?.value),
          O.filter(isString),
          O.map((value) => value.split(" ")),
          O.exists((values) => values.every((value) => validTypes.some((validType) => validType === value))),
        );
        if (hasValidSandbox) return;
        context.report({
          messageId: "noMissingIframeSandbox",
          node: sandboxAttribute,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
