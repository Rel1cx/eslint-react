import { NodeType } from "@eslint-react/ast";
import { findPropInAttributes, findPropInProperties, getPropValue, isCreateElementCall } from "@eslint-react/jsx";
import { _, F, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-missing-iframe-sandbox";

export type MessageID = ConstantCase<typeof RULE_NAME>;

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

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "enforce that `iframe` elements explicitly specify a `sandbox` attribute",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      NO_MISSING_IFRAME_SANDBOX: "Missing explicit sandbox attribute for iframe",
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        if (!isCreateElementCall(node, context)) return;
        const [name, props] = node.arguments;
        if (!isMatching({ type: NodeType.Literal, value: "iframe" }, name)) return;
        if (!props || props.type !== NodeType.ObjectExpression) {
          context.report({
            messageId: "NO_MISSING_IFRAME_SANDBOX",
            node: props ?? node,
          });

          return;
        }
        const maybeSandboxProperty = findPropInProperties(props.properties, context, initialScope)("sandbox");
        if (O.isNone(maybeSandboxProperty)) {
          context.report({
            messageId: "NO_MISSING_IFRAME_SANDBOX",
            node: props,
          });

          return;
        }
        const sandboxProperty = maybeSandboxProperty.value;
        const hasValidSandbox = isMatching({
          type: NodeType.Property,
          value: {
            type: NodeType.Literal,
            value: P.union(...validTypes),
          },
        }, sandboxProperty);
        if (hasValidSandbox) return;
        context.report({
          messageId: "NO_MISSING_IFRAME_SANDBOX",
          node: sandboxProperty,
        });
      },
      JSXElement(node) {
        const { name } = node.openingElement;
        if (name.type !== NodeType.JSXIdentifier || name.name !== "iframe") return;
        const { attributes } = node.openingElement;
        const initialScope = context.sourceCode.getScope?.(node) ?? context.getScope();
        const maybeSandboxAttribute = findPropInAttributes(attributes, context, initialScope)("sandbox");
        if (O.isNone(maybeSandboxAttribute)) {
          context.report({
            messageId: "NO_MISSING_IFRAME_SANDBOX",
            node: node.openingElement,
          });

          return;
        }
        const sandboxAttribute = maybeSandboxAttribute.value;
        const hasValidSandbox = F.pipe(
          getPropValue(sandboxAttribute, context),
          O.flatMapNullable(v => v?.value),
          O.filter(_.isString),
          O.map((value) => value.split(" ")),
          O.exists((values) => values.every((value) => validTypes.some((validType) => validType === value))),
        );
        if (hasValidSandbox) return;
        context.report({
          messageId: "NO_MISSING_IFRAME_SANDBOX",
          node: sandboxAttribute,
        });
      },
    };
  },
}) satisfies ESLintUtils.RuleModule<MessageID>;
