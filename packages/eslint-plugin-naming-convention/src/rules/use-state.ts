import { NodeType } from "@eslint-react/ast";
import { componentCollector, isUseStateCall } from "@eslint-react/core";
import { getPragmaFromContext } from "@eslint-react/jsx";
import { M, O } from "@eslint-react/tools";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { capitalize, type ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "use-state";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce destructuring and symmetric naming of `useState` hook value and setter variables",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      USE_STATE: "Use `{{setterName}}` as the name of the setter variable for `{{stateName}}`.",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = componentCollector(context);

    return {
      ...listeners,
      "Program:exit"(node) {
        const pragma = getPragmaFromContext(context);
        const components = ctx.getAllComponents(node);

        for (const { hookCalls } of components.values()) {
          if (hookCalls.length === 0) {
            continue;
          }

          for (const hookCall of hookCalls) {
            if (!isUseStateCall(hookCall, context, pragma)) {
              continue;
            }

            if (hookCall.parent.type !== NodeType.VariableDeclarator) {
              continue;
            }

            const { id } = hookCall.parent;

            const maybeDescriptor = M.match<typeof id, O.Option<ReportDescriptor<MessageID>>>(id)
              .with({ type: NodeType.Identifier }, n => {
                return O.some({
                  messageId: "USE_STATE",
                  node: n,
                });
              })
              .with({ type: NodeType.ArrayPattern }, n => {
                const [state, setState] = n.elements;

                if (state?.type !== NodeType.Identifier || setState?.type !== NodeType.Identifier) {
                  return O.none();
                }

                const [stateName, setStateName] = [state.name, setState.name];

                const expectedSetterName = `set${capitalize(stateName)}`;

                if (setStateName === expectedSetterName) {
                  return O.none();
                }

                return O.some(
                  {
                    messageId: "USE_STATE",
                    node: n,
                    data: {
                      setterName: expectedSetterName,
                      stateName,
                    },
                  } as const,
                );
              })
              .otherwise(O.none);

            O.map(maybeDescriptor, context.report);
          }
        }
      },
    };
  },
});
