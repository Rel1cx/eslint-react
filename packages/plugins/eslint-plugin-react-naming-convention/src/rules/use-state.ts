import { NodeType } from "@eslint-react/ast";
import { isReactHookCallWithNameLoose, isUseStateCall, useComponentCollector } from "@eslint-react/core";
import { getPragmaFromContext } from "@eslint-react/jsx";
import { ESLintSettingsSchema, parseSchema } from "@eslint-react/shared";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { Function as F, Option as O, Predicate as Prd } from "effect";
import { capitalize, type ConstantCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "use-state";

export type MessageID = ConstantCase<typeof RULE_NAME>;

function isSetterNameLoose(name: string) {
  const fourthChar = [...name][3];

  return name.startsWith("set")
    && fourthChar === fourthChar?.toUpperCase();
}

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      description: "enforce destructuring and symmetric naming of 'useState' hook value and setter variables",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      USE_STATE: "'useState' call is not destructured into value + setter pair.",
    },
  },
  defaultOptions: [],
  create(context) {
    const alias = parseSchema(ESLintSettingsSchema, context.settings).reactOptions?.additionalHooks?.useState
      ?? [];
    const { ctx, listeners } = useComponentCollector(context);

    return {
      ...listeners,
      "Program:exit"(node) {
        const pragma = getPragmaFromContext(context);
        const components = ctx.getAllComponents(node);

        for (const { hookCalls } of components.values()) {
          if (hookCalls.length === 0) continue;
          for (const hookCall of hookCalls) {
            if (
              !isUseStateCall(hookCall, context, pragma)
              && !alias.some(F.flip(isReactHookCallWithNameLoose)(hookCall))
            ) {
              continue;
            }
            if (hookCall.parent.type !== NodeType.VariableDeclarator) {
              continue;
            }
            const { id } = hookCall.parent;
            const descriptor = O.some({ messageId: "USE_STATE", node: id } as const);
            F.pipe(
              match<typeof id, O.Option<ReportDescriptor<MessageID>>>(id)
                .with({ type: NodeType.Identifier }, F.constant(descriptor))
                .with({ type: NodeType.ArrayPattern }, n => {
                  const [state, setState] = n.elements;
                  if (state?.type === NodeType.ObjectPattern && setState?.type === NodeType.Identifier) {
                    return F.pipe(
                      O.liftPredicate(Prd.not(isSetterNameLoose))(setState.name),
                      O.flatMap(F.constant(descriptor)),
                    );
                  }
                  if (state?.type !== NodeType.Identifier || setState?.type !== NodeType.Identifier) return O.none();
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
}) satisfies ESLintUtils.RuleModule<MessageID>;
