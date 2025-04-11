import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { createRule } from "../utils";

export const RULE_NAME = "no-nested-component-definitions";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow nesting lazy component declarations inside other components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noNestedComponentDefinitions:
        "Do not declare lazy components inside other components. Instead, always declare them at the top level of your module.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const hint = ER.ComponentDetectionHint.None;
  const collector = ER.useComponentCollector(context, { hint });
  const collectorLegacy = ER.useComponentCollectorLegacy();

  const lazyComponentDeclarations = new Set<TSESTree.CallExpression>();

  return {
    ...collector.listeners,
    ...collectorLegacy.listeners,
    ImportExpression(node) {
      const lazyCall = AST.findParentNode(node, (n) => ER.isLazyCall(context, n));
      if (lazyCall != null) {
        lazyComponentDeclarations.add(lazyCall);
      }
    },
    "Program:exit"(program) {
      const functionComponents = [
        ...collector
          .ctx
          .getAllComponents(program)
          .values(),
      ];

      const classComponents = [
        ...collectorLegacy
          .ctx
          .getAllComponents(program)
          .values(),
      ];

      for (const lazy of lazyComponentDeclarations) {
        const significantParent = AST.findParentNode(lazy, (n) => {
          if (JSX.isJSX(n)) return true;
          if (n.type === T.CallExpression) {
            return ER.isReactHookCall(n) || ER.isCreateElementCall(context, n) || ER.isCreateContextCall(context, n);
          }
          if (AST.isFunction(n)) {
            return functionComponents.some((c) => c.node === n);
          }
          if (AST.isClass(n)) {
            return classComponents.some((c) => c.node === n);
          }
          return false;
        });
        if (significantParent != null) {
          context.report({
            messageId: "noNestedComponentDefinitions",
            node: lazy,
          });
        }
      }
    },
  };
}
