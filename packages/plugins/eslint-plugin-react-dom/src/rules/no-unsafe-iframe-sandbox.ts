import { NodeType } from "@eslint-react/ast";
import { isCreateElementCall } from "@eslint-react/core";
import { findPropInAttributes, findPropInProperties, getPropValue } from "@eslint-react/jsx";

import { F, O, Pred } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-iframe-sandbox";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const unsafeCombinations = [
  ["allow-scripts", "allow-same-origin"],
  // ...
] as const;

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
      CallExpression(node) {
        const initialScope = context.sourceCode.getScope(node);
        if (!isCreateElementCall(node, context)) return;
        const [name, props] = node.arguments;
        if (!isMatching({ type: NodeType.Literal, value: "iframe" }, name)) return;
        if (!props || props.type !== NodeType.ObjectExpression) return;
        const maybeSandboxProperty = findPropInProperties(props.properties, context, initialScope)("sandbox");
        if (O.isNone(maybeSandboxProperty)) return;
        const isSafeSandboxValue = !F.pipe(
          maybeSandboxProperty,
          O.filter(isMatching({
            type: NodeType.Property,
            value: {
              type: NodeType.Literal,
              value: P.string,
            },
          })),
          O.flatMapNullable(v => "value" in v ? v.value : null),
          O.flatMapNullable(v => "value" in v ? v.value : null),
          O.filter(Pred.isString),
          O.map(v => v.split(" ")),
          O.exists(values =>
            unsafeCombinations.some(combinations => combinations.every(unsafeValue => values.includes(unsafeValue)))
          ),
        );
        if (isSafeSandboxValue) return;
        context.report({
          messageId: "NO_UNSAFE_IFRAME_SANDBOX",
          node: maybeSandboxProperty.value,
        });
      },
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
          O.filter(Pred.isString),
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
