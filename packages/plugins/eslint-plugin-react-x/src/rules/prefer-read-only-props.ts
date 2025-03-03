import { useComponentCollector } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { getConstrainedTypeAtLocation, isTypeReadonly } from "@typescript-eslint/type-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-read-only-props";

export const RULE_FEATURES = [
  "CHK",
  "TSC",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce read-only props in components",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
        for (const [, component] of components) {
          const [props] = component.node.params;
          if (props == null) {
            continue;
          }
          const propsType = getConstrainedTypeAtLocation(services, props);
          if (isTypeReadonly(services.program, propsType)) {
            continue;
          }
          context.report({ messageId: "preferReadOnlyProps", node: props });
        }
      },
    };
  },
  defaultOptions: [],
});
