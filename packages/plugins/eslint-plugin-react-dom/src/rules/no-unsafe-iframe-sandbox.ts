import { NodeType } from "@eslint-react/ast";
import { findPropInAttributes, getPropValue } from "@eslint-react/jsx";
import { F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import * as R from "remeda";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const unsafeCombinations = [
  ["allow-scripts", "allow-same-origin"],
  // ...
] as const;

// TODO: Use the information in `settings["react-x"].additionalComponents` to add support for user-defined components that add the 'sandbox' attribute internally.
export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unsafe iframe 'sandbox' attribute combinations",
    },
    messages: {
      NO_UNSAFE_IFRAME_SANDBOX: "Unsafe 'sandbox' attribute value on 'iframe' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node) {
        const { name } = node.openingElement;
        if (name.type !== NodeType.JSXIdentifier || name.name !== "iframe") return;
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const maybeSandboxAttribute = findPropInAttributes(attributes, context, initialScope)("sandbox");
        if (O.isNone(maybeSandboxAttribute)) return;
        const isSafeSandboxValue = !F.pipe(
          getPropValue(maybeSandboxAttribute.value, context),
          O.flatMapNullable(v => v?.value),
          O.filter(R.isString),
          O.map((value) => value.split(" ")),
          O.exists(values =>
            unsafeCombinations.some(combinations => combinations.every(unsafeValue => values.includes(unsafeValue)))
          ),
        );
        if (isSafeSandboxValue) return;
        context.report({
          messageId: "NO_UNSAFE_IFRAME_SANDBOX",
          node: maybeSandboxAttribute.value,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
