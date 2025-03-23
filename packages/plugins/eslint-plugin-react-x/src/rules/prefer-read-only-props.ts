import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import type ts from "typescript";
import { useComponentCollector } from "@eslint-react/core";
import { getConstrainedTypeAtLocation, isTypeReadonly } from "@typescript-eslint/type-utils";
import { ESLintUtils, type ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import { getTypeImmutability, isImmutable, isReadonlyDeep, isReadonlyShallow, isUnknown } from "is-immutable-type";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-read-only-props";

export const RULE_FEATURES = [
  "TSC",
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Enforces read-only props in components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      preferReadOnlyProps: "A function component's props should be read-only.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const services = ESLintUtils.getParserServices(context, false);
  const { ctx, listeners } = useComponentCollector(context);
  return {
    ...listeners,
    "Program:exit"(node) {
      const components = ctx.getAllComponents(node);
      for (const [, component] of components) {
        const [props] = component.node.params;
        if (props == null) {
          continue;
        }
        const propsType = getConstrainedTypeAtLocation(services, props);
        if (isTypeReadonlyLoose(services, propsType)) {
          continue;
        }
        context.report({ messageId: "preferReadOnlyProps", node: props });
      }
    },
  };
}

function isTypeReadonlyLoose(services: ParserServicesWithTypeInformation, type: ts.Type): boolean {
  if (isTypeReadonly(services.program, type)) return true;
  try {
    const im = getTypeImmutability(services.program, type);
    return isUnknown(im) || isImmutable(im) || isReadonlyShallow(im) || isReadonlyDeep(im);
  } catch {
    return true;
  }
}
