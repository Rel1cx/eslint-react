import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { getOrUpdate } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-default-props";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

type ObjectDestructuringDeclarator = {
  id: TSESTree.ObjectPattern;
  init: TSESTree.Identifier;
} & TSESTree.VariableDeclarator;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents using referential-type values as default props in object destructuring.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnstableDefaultProps:
        "A/an '{{forbiddenType}}' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of '{{forbiddenType}}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, listeners } = ER.useComponentCollector(context);
  const declarators = new Map<
    AST.TSESTreeFunction,
    ObjectDestructuringDeclarator[]
  >();

  return {
    ...listeners,
    "Program:exit"(node) {
      const components = ctx.getAllComponents(node);
      for (const { node: component } of components.values()) {
        const { params } = component;
        const [props] = params;
        if (props == null) {
          continue;
        }
        const properties = match(props)
          .with({ type: T.ObjectPattern }, ({ properties }) => properties)
          .with({ type: T.Identifier }, ({ name }) => {
            return declarators.get(component)
              ?.filter((d) => d.init.name === name)
              .flatMap((d) => d.id.properties) ?? [];
          })
          .otherwise(() => []);
        for (const prop of properties) {
          if (prop.type !== T.Property || prop.value.type !== T.AssignmentPattern) {
            continue;
          }
          const { value } = prop;
          const { right } = value;
          const initialScope = context.sourceCode.getScope(value);
          const construction = VAR.getConstructionDetectionResult(
            value,
            initialScope,
            VAR.ConstructionDetectionHint.StrictCallExpression,
          );
          if (construction == null) {
            continue;
          }
          if (ER.isReactHookCall(construction.node)) {
            continue;
          }
          const forbiddenType = AST.toReadableNodeType(right);
          context.report({
            messageId: "noUnstableDefaultProps",
            node: right,
            data: {
              forbiddenType,
            },
          });
        }
      }
    },
    "VariableDeclarator[id.type='ObjectPattern'][init.type='Identifier']"(node: ObjectDestructuringDeclarator) {
      const functionEntry = ctx.getCurrentEntry();
      if (functionEntry == null) return;
      getOrUpdate(
        declarators,
        functionEntry.node,
        () => [],
      ).push(node);
    },
  };
}
