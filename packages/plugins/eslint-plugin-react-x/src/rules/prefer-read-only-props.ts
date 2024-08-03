import { useComponentCollector } from "@eslint-react/core";
import { getConstrainedTypeAtLocation, isTypeReadonly } from "@typescript-eslint/type-utils";
import type { ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { getTypeImmutability, isImmutable, isReadonlyDeep, isReadonlyShallow, isUnknown } from "is-immutable-type";
import type { CamelCase } from "string-ts";
import type ts from "typescript";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-read-only-props";

export type MessageID = CamelCase<typeof RULE_NAME>;

function isReadonlyType(type: ts.Type, services: ParserServicesWithTypeInformation): boolean {
  try {
    const im = getTypeImmutability(services.program, type);
    return isUnknown(im) || isImmutable(im) || isReadonlyShallow(im) || isReadonlyDeep(im);
  } catch {
    return true;
  }
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce read-only props in components",
    },
    messages: {
      preferReadOnlyProps: "A function component's props should be read-only.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const services = ESLintUtils.getParserServices(context, false);
    const { ctx, listeners } = useComponentCollector(context);
    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);
        for (const [_, component] of components) {
          const [props] = component.node.params;
          if (!props) continue;
          const propsType = getConstrainedTypeAtLocation(services, props);
          if (isTypeReadonly(services.program, propsType) || isReadonlyType(propsType, services)) continue;
          context.report({ messageId: "preferReadOnlyProps", node: props });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
