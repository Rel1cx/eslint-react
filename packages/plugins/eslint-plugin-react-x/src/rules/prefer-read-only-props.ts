import { useComponentCollector } from "@eslint-react/core";
import { isTypeReadonly } from "@typescript-eslint/type-utils";
import type { ParserServices } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { getTypeImmutability, isImmutable, isReadonlyDeep, isReadonlyShallow, isUnknown } from "is-immutable-type";
import type { ConstantCase } from "string-ts";
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
    return isTypeReadonly(services.program, type);
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
          const propsType = services.getTypeAtLocation(props);
          if (isReadonlyType(propsType, services)) return;
          context.report({ messageId: "PREFER_READ_ONLY_PROPS", node: props });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
