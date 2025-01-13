import {
  DEFAULT_COMPONENT_HINT,
  isReactHookCallWithNameLoose,
  isUseStateCall,
  useComponentCollector,
} from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import { getSettingsFromContext } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";
import { capitalize } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "use-state";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

function isSetterNameLoose(name: string) {
  const fourthChar = [...name][3];

  return name.startsWith("set")
    && fourthChar === fourthChar?.toUpperCase();
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce destructuring and symmetric naming of 'useState' hook value and setter variables",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      useState: "An useState call is not destructured into value + setter pair.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const alias = getSettingsFromContext(context).additionalHooks?.useState ?? [];
    const {
      ctx,
      listeners,
    } = useComponentCollector(
      context,
      DEFAULT_COMPONENT_HINT,
      {
        collectDisplayName: false,
        collectHookCalls: true,
      },
    );

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);
        for (const { hookCalls } of components.values()) {
          if (hookCalls.length === 0) {
            continue;
          }
          for (const hookCall of hookCalls) {
            if (!isUseStateCall(hookCall, context) && !alias.some(isReactHookCallWithNameLoose(hookCall))) {
              continue;
            }
            if (hookCall.parent.type !== T.VariableDeclarator) {
              continue;
            }
            const { id } = hookCall.parent;
            switch (id.type) {
              case T.Identifier: {
                context.report({ messageId: "useState", node: id });
                break;
              }
              case T.ArrayPattern: {
                const [state, setState] = id.elements;
                if (state?.type === T.ObjectPattern && setState?.type === T.Identifier) {
                  if (!isSetterNameLoose(setState.name)) {
                    context.report({ messageId: "useState", node: id });
                  }
                  break;
                }
                if (state?.type !== T.Identifier || setState?.type !== T.Identifier) {
                  return;
                }
                const [stateName, setStateName] = [state.name, setState.name];
                const expectedSetterName = `set${capitalize(stateName)}`;
                if (setStateName === expectedSetterName) {
                  return;
                }
                context.report({ messageId: "useState", node: id });
              }
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
});
