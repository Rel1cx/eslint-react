import * as JSX from "@eslint-react/jsx";
import { decodeSettings, normalizeSettings } from "@eslint-react/shared";
import { F, isString, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";
import { match, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export type MessageID = CamelCase<typeof RULE_NAME>;

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
      noUnsafeIframeSandbox: "Unsafe 'sandbox' attribute value on 'iframe' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { components, polymorphicPropName } = normalizeSettings(decodeSettings(context.settings));
    return {
      JSXElement(node) {
        const jsxCtx = { getScope: (node: TSESTree.Node) => context.sourceCode.getScope(node) } as const;
        const elementType = JSX.getElementType(jsxCtx, components, polymorphicPropName)(node.openingElement);
        if (elementType !== "iframe") return;
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope(node);
        const maybeSandboxAttribute = JSX.findPropInAttributes(attributes, initialScope)("sandbox");
        if (O.isNone(maybeSandboxAttribute)) return;
        const isSafeSandboxValue = !F.pipe(
          JSX.getPropValue(maybeSandboxAttribute.value, context.sourceCode.getScope(maybeSandboxAttribute.value)),
          O.flatMapNullable(v =>
            match(v)
              .with(P.string, F.identity)
              .with({ sandbox: P.string }, ({ sandbox }) => sandbox)
              .otherwise(F.constNull)
          ),
          O.filter(isString),
          O.map((value) => value.split(" ")),
          O.exists(values =>
            unsafeCombinations.some(combinations => combinations.every(unsafeValue => values.includes(unsafeValue)))
          ),
        );
        if (isSafeSandboxValue) return;
        context.report({
          messageId: "noUnsafeIframeSandbox",
          node: maybeSandboxAttribute.value,
        });
      },
    };
  },
  defaultOptions: [],
});
