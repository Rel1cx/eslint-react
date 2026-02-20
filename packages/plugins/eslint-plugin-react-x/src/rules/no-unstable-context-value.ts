import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { getOrElseUpdate } from "@eslint-react/eff";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { defineRuleListener, getSettingsFromContext } from "@eslint-react/shared";
import { type ObjectType, getObjectType } from "@eslint-react/var";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
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
        "Prevents non-stable values (i.e., object literals) from being used as a value for 'Context.Provider'.",
    },
    messages: {
      unstableContextValue:
        "A/an '{{kind}}' passed as the value prop to the context provider should not be constructed. It will change on every render. {{suggestion}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const { compilationMode, version } = getSettingsFromContext(context);
  if (compilationMode === "infer" || compilationMode === "all") return {};
  if (compilationMode === "annotation" && ast.isDirectiveInFile(context.sourceCode.ast, "use memo")) return {};
  const isReact18OrBelow = compare(version, "19.0.0", "<");
  const { ctx, visitor } = core.useComponentCollector(context);
  const constructions = new WeakMap<ast.TSESTreeFunction, ObjectType[]>();

  return defineRuleListener(
    visitor,
    {
      JSXOpeningElement(node) {
        const fullName = core.getJsxElementType(context, node.parent);
        const selfName = fullName.split(".").at(-1);
        if (selfName == null) return;
        if (!isContextName(selfName, isReact18OrBelow)) return;
        const functionEntry = ctx.getCurrentEntry();
        if (functionEntry == null) return;
        if (compilationMode === "annotation" && ast.isDirectiveInFunction(functionEntry.node, "use memo")) return;
        const attribute = node
          .attributes
          .find((attribute) =>
            attribute.type === AST.JSXAttribute
            && attribute.name.name === "value"
          );
        if (attribute == null || !("value" in attribute)) return;
        const value = attribute.value;
        if (value?.type !== AST.JSXExpressionContainer) return;
        const valueExpression = value.expression;
        const initialScope = context.sourceCode.getScope(valueExpression);
        const construction = getObjectType(valueExpression, initialScope);
        if (construction == null) return;
        if (core.isHookCall(construction.node)) {
          return;
        }
        getOrElseUpdate(constructions, functionEntry.node, () => []).push(construction);
      },
      "Program:exit"(program) {
        for (const { node: component, directives } of ctx.getAllComponents(program)) {
          if (compilationMode === "annotation" && directives.some((d) => d.directive === "use memo")) continue;
          for (const construction of constructions.get(component) ?? []) {
            const { kind, node: constructionNode } = construction;
            const suggestion = kind === "function"
              ? "Consider wrapping it in a useCallback hook."
              : "Consider wrapping it in a useMemo hook.";
            context.report({
              messageId: "unstableContextValue",
              node: constructionNode,
              data: {
                kind: ast.getHumanReadableKind(constructionNode),
                suggestion,
              },
            });
          }
        }
      },
    },
  );
}

function isContextName(name: string, isReact18OrBelow: boolean): boolean {
  if (name === "Provider") return true;
  if (!isReact18OrBelow) {
    return name.endsWith("Context") || name.endsWith("CONTEXT");
  }
  return false;
}
