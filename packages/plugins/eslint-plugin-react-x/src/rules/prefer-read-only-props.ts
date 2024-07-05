import { NodeType } from "@eslint-react/ast";
import { useComponentCollector } from "@eslint-react/core";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import type { ParserServices } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { getTypeImmutability, isImmutable, isReadonlyDeep, isReadonlyShallow, isUnknown } from "is-immutable-type";
import type { ConstantCase } from "string-ts";
import { unionTypeParts } from "ts-api-utils";
import type ts from "typescript";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-read-only-props";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isReadonlyType(type: ts.Type, services: ParserServices): boolean {
  if (!services.program) throw new Error("This rule requires type checking to be enabled");
  try {
    const im = getTypeImmutability(services.program, type);
    return isUnknown(im) || isImmutable(im) || isReadonlyShallow(im) || isReadonlyDeep(im);
  } catch {
    // TODO: getImmutability may throw when checking certain types
    // eslint-disable-next-line no-console
    console.warn("Failed to check immutability of type");
    return true;
  }
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce that component props are read-only",
    },
    messages: {
      PREFER_READ_ONLY_PROPS: "Component props should be read-only.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const services = ESLintUtils.getParserServices(context);
    const { ctx, listeners } = useComponentCollector(context);
    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);
        for (const [_, component] of components) {
          const [props] = component.node.params;
          if (!props) continue;
          if (props.type === NodeType.ObjectPattern) {
            const { properties } = props;
            const values = properties.filter((prop) => !!prop.value);
            const valuesTypes = values
              .map((v) => getConstrainedTypeAtLocation(services, v))
              .map((t) => unionTypeParts(t))
              .flat();
            if (valuesTypes.some((t) => !isReadonlyType(t, services))) {
              context.report({
                messageId: "PREFER_READ_ONLY_PROPS",
                node: props,
              });
              return;
            }
          }
          const propsType = getConstrainedTypeAtLocation(services, props);
          const propsTypes = unionTypeParts(propsType);
          if (propsTypes.some((t) => !isReadonlyType(t, services))) {
            context.report({
              messageId: "PREFER_READ_ONLY_PROPS",
              node: props,
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
