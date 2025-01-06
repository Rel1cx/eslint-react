import { getElementRepresentName } from "@eslint-react/core";
import { F, isString, O } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-iframe-sandbox";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const validTypes = [
  "",
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
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noMissingIframeSandbox: "Add missing 'sandbox' attribute on 'iframe' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node) {
        const elementName = getElementRepresentName(node.openingElement, context);
        if (elementName !== "iframe") return;
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        O.match(JSX.findPropInAttributes(attributes, initialScope)("sandbox"), {
          onNone() {
            context.report({
              messageId: "noMissingIframeSandbox",
              node: node.openingElement,
            });
          },
          onSome(a) {
            const hasValidSandbox = F.pipe(
              JSX.getPropValue(a, context.sourceCode.getScope(a)),
              O.filter(isString),
              O.map((value) => value.split(" ")),
              O.exists((values) => values.every((value) => validTypes.some((validType) => validType === value))),
            );
            if (hasValidSandbox) return;
            context.report({
              messageId: "noMissingIframeSandbox",
              node: a,
            });
          },
        });
      },
    };
  },
  defaultOptions: [],
});
