import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { getElementFullType } from "@eslint-react/jsx";
import { getSettingsFromContext } from "@eslint-react/shared";
import { type ObjectType, computeObjectType } from "@eslint-react/var";
import { getOrInsertComputed } from "@local/eff";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { compare } from "compare-versions";

import { createRule } from "../../utils";

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
  if (compilationMode === "annotation" && ast.isFileHasDirective(context.sourceCode.ast, "use memo")) return {};
  const isReact18OrBelow = compare(version, "19.0.0", "<");
  const { api, visitor } = core.getFunctionComponentCollector(context);
  const constructions = new WeakMap<ast.TSESTreeFunction, ObjectType[]>();

  return merge(
    visitor,
    {
      JSXOpeningElement(node) {
        const fullName = getElementFullType(node.parent);
        const selfName = fullName.split(".").at(-1);
        if (selfName == null) return;
        if (!isContextName(selfName, isReact18OrBelow)) return;
        const enclosingFunction = ast.findParent(node, ast.isFunction);
        if (enclosingFunction == null) return;
        if (compilationMode === "annotation" && core.isFunctionHasDirective(enclosingFunction, "use memo")) return;
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
        const construction = computeObjectType(context, valueExpression);
        if (construction == null) return;
        if (core.isHookCall(construction.node)) {
          return;
        }
        getOrInsertComputed(constructions, enclosingFunction, () => []).push(construction);
      },
      "Program:exit"(program) {
        for (const { directives, node: component } of api.getAllComponents(program)) {
          if (compilationMode === "annotation" && directives.some((d) => d.directive === "use memo")) continue;
          for (const construction of constructions.get(component) ?? []) {
            const { kind, node: constructionNode } = construction;
            const suggestion = kind === "function"
              ? "Consider wrapping it in a useCallback hook."
              : "Consider wrapping it in a useMemo hook.";
            context.report({
              data: {
                kind: ast.getHumanReadableKind(constructionNode),
                suggestion,
              },
              messageId: "unstableContextValue",
              node: constructionNode,
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
