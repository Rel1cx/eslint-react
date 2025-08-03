import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { getOrElseUpdate } from "@eslint-react/eff";

import { getSettingsFromContext } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { compare } from "compare-versions";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-context-value";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "unstableContextValue";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevents non-stable values (i.e. object literals) from being used as a value for `Context.Provider`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      unstableContextValue:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render. {{suggestion}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { version } = getSettingsFromContext(context);
  const isReact18OrBelow = compare(version, "19.0.0", "<");
  const { ctx, listeners } = ER.useComponentCollector(context);
  const constructions = new WeakMap<AST.TSESTreeFunction, VAR.Construction[]>();

  return {
    ...listeners,
    JSXOpeningElement(node) {
      const fullName = ER.getElementType(context, node.parent);
      const selfName = fullName.split(".").at(-1);
      if (selfName == null) return;
      if (!isContextName(selfName, isReact18OrBelow)) return;
      const functionEntry = ctx.getCurrentEntry();
      if (functionEntry == null) return;
      const attribute = node
        .attributes
        .find((attribute) =>
          attribute.type === T.JSXAttribute
          && attribute.name.name === "value"
        );
      if (attribute == null || !("value" in attribute)) return;
      const value = attribute.value;
      if (value?.type !== T.JSXExpressionContainer) return;
      const valueExpression = value.expression;
      const initialScope = context.sourceCode.getScope(valueExpression);
      const construction = VAR.getConstruction(valueExpression, initialScope);
      if (construction == null) return;
      if (ER.isReactHookCall(construction.node)) {
        return;
      }
      getOrElseUpdate(constructions, functionEntry.node, () => []).push(construction);
    },
    "Program:exit"(program) {
      const components = ctx.getAllComponents(program).values();
      for (const { node: component } of components) {
        for (const construction of constructions.get(component) ?? []) {
          const { kind, node: constructionNode } = construction;
          const suggestion = kind.startsWith("Function")
            ? "Consider wrapping it in a useCallback hook."
            : "Consider wrapping it in a useMemo hook.";
          context.report({
            messageId: "unstableContextValue",
            node: constructionNode,
            data: {
              type: AST.toDelimiterFormat(constructionNode),
              suggestion,
            },
          });
        }
      }
    },
  };
}

function isContextName(name: string, isReact18OrBelow: boolean): boolean {
  if (name === "Provider") return true;
  if (!isReact18OrBelow) {
    return name.endsWith("Context") || name.endsWith("CONTEXT");
  }
  return false;
}
