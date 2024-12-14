import { isReactHookCallWithNameLoose, isUseStateCall, useComponentCollector } from "@eslint-react/core";
import { decodeSettings } from "@eslint-react/shared";
import { F, O } from "@eslint-react/tools";
import type { RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { capitalize } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "use-state";

export const RULE_FEATURES = [
  "LNT",
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
    },
    messages: {
      useState: "An useState call is not destructured into value + setter pair.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const alias = decodeSettings(context.settings).additionalHooks?.useState ?? [];
    const { ctx, listeners } = useComponentCollector(context);

    return {
      ...listeners,
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node);
        for (const { hookCalls } of components.values()) {
          if (hookCalls.length === 0) continue;
          for (const hookCall of hookCalls) {
            if (
              !isUseStateCall(hookCall, context)
              && !alias.some(isReactHookCallWithNameLoose(hookCall))
            ) {
              continue;
            }
            if (hookCall.parent.type !== AST_NODE_TYPES.VariableDeclarator) {
              continue;
            }
            const { id } = hookCall.parent;
            const descriptor = O.some({ messageId: "useState", node: id } as const);
            F.pipe(
              match<typeof id, O.Option<ReportDescriptor<MessageID>>>(id)
                .with({ type: AST_NODE_TYPES.Identifier }, F.constant(descriptor))
                .with({ type: AST_NODE_TYPES.ArrayPattern }, n => {
                  const [state, setState] = n.elements;
                  if (state?.type === AST_NODE_TYPES.ObjectPattern && setState?.type === AST_NODE_TYPES.Identifier) {
                    return isSetterNameLoose(setState.name)
                      ? O.none()
                      : descriptor;
                  }
                  if (state?.type !== AST_NODE_TYPES.Identifier || setState?.type !== AST_NODE_TYPES.Identifier) {
                    return O.none();
                  }
                  const [stateName, setStateName] = [state.name, setState.name];
                  const expectedSetterName = `set${capitalize(stateName)}`;
                  if (setStateName === expectedSetterName) return O.none();
                  return descriptor;
                })
                .otherwise(O.none),
              O.map(context.report),
            );
          }
        }
      },
    };
  },
  defaultOptions: [],
});
