import * as AST from "@eslint-react/ast";
import { isReactHookCall, useComponentCollector } from "@eslint-react/core";
import { getOrUpdate } from "@eslint-react/eff";
import * as JSX from "@eslint-react/jsx";
import { getSettingsFromContext, type RuleFeature } from "@eslint-react/shared";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { compare } from "compare-versions";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-context-value";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = "unstableContextValue";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow passing constructed values to context providers",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      unstableContextValue:
        "A/an '{{type}}' passed as the value prop to the context provider should not be constructed. It will change on every render. {{suggestion}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { version } = getSettingsFromContext(context);
    const isReact18OrBelow = compare(version, "19.0.0", "<");
    const { ctx, listeners } = useComponentCollector(context);
    const constructions = new Map<AST.TSESTreeFunction, VAR.ValueConstruction[]>();

    return {
      ...listeners,
      JSXOpeningElement(node) {
        const fullName = JSX.getElementName(node.parent);
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
        const construction = VAR.getValueConstruction(valueExpression, initialScope);
        if (construction == null) return;
        if (isReactHookCall(construction.node)) {
          return;
        }
        getOrUpdate(constructions, functionEntry.node, () => []).push(construction);
      },
      "Program:exit"(node) {
        const components = ctx.getAllComponents(node).values();
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
                type: AST.toReadableNodeType(constructionNode),
                suggestion,
              },
            });
          }
        }
      },
    };
  },
  defaultOptions: [],
});

function isContextName(name: string, isReact18OrBelow: boolean): boolean {
  if (name === "Provider") return true;
  if (!isReact18OrBelow) {
    return name.endsWith("Context") || name.endsWith("CONTEXT");
  }
  return false;
}
