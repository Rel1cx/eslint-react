import type { TSESTreeFunction } from "@eslint-react/ast";
import { NodeType } from "@eslint-react/ast";
import { ERFunctionComponentFlag, useComponentCollector } from "@eslint-react/core";
import type { RuleContext } from "@eslint-react/types";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import type { ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { Function as F, Option as O } from "effect";
import type { ConstantCase } from "string-ts";
import { unionTypeParts } from "ts-api-utils";

import { createRule } from "../utils";

export const RULE_NAME = "function-component";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "report all function components, including anonymous ones",
    },
    messages: {
      FUNCTION_COMPONENT:
        "[function component] name: {{name}}, memo: {{memo}}, forwardRef: {{forwardRef}}, props: {{props}}, hookCalls: {{hookCalls}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    function getProps(node: TSESTreeFunction, context: RuleContext, services: ParserServicesWithTypeInformation) {
      const [props] = node.params;
      if (!props) return [];
      if (props.type === NodeType.ObjectPattern) {
        return props.properties.map(p => context.sourceCode.getText(p));
      }
      const propsType = getConstrainedTypeAtLocation(services, props);
      const variants = unionTypeParts(propsType);
      if (variants.length === 1 && variants[0]) {
        return variants[0]
          .getProperties()
          .map(p => p.getEscapedName().toString());
      }
      return variants.map(t => t.getProperties().map(p => p.getEscapedName().toString()));
    }
    const { ctx, listeners } = useComponentCollector(context);
    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);
        for (const { name, flag, hookCalls, node } of components.values()) {
          context.report({
            data: {
              name: O.getOrElse(name, F.constant("anonymous")),
              forwardRef: Boolean(flag & ERFunctionComponentFlag.ForwardRef),
              hookCalls: hookCalls.map(h => context.sourceCode.getText(h.callee)),
              memo: Boolean(flag & ERFunctionComponentFlag.Memo),
              props: getProps(node, context, services),
            },
            messageId: "FUNCTION_COMPONENT",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
