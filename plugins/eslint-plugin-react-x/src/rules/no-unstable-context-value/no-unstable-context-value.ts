import { createRule } from "@/utils/create-rule";
import { Check } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { getElementFullType } from "@eslint-react/jsx";
import { getSettingsFromContext } from "@eslint-react/shared";
import { resolveObjectType } from "@eslint-react/var";
import { hasProperty } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { compare } from "compare-versions";
import { getHumanReadableKind, isContextName } from "./lib";

export const RULE_NAME = "no-unstable-context-value";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "unstable-context-value";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevents non-stable values (i.e., object literals) from being used as a value for 'Context.Provider' or the '<Context>' shorthand in React 19 and above.",
    },
    messages: {
      "unstable-context-value":
        "A/an '{{kind}}' passed as the value prop to the context provider should not be constructed. It will change on every render. {{suggestion}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { compilationMode, version } = getSettingsFromContext(context);
  if (compilationMode === "infer" || compilationMode === "all") return {};
  if (compilationMode === "annotation" && context.sourceCode.ast.body.some((stmt) => Check.isDirective(stmt, "use memo"))) return {};
  const isReact18OrBelow = compare(version, "19.0.0", "<");
  const { api, visitor } = core.getFunctionComponentCollector(context);
  const valueExpressions: TSESTree.Expression[] = [];

  return merge(
    visitor,
    {
      JSXOpeningElement(node) {
        const fullName = getElementFullType(node.parent);
        const selfName = fullName.split(".").at(-1);
        if (selfName == null) return;
        if (!isContextName(selfName, isReact18OrBelow)) return;
        const attribute = node
          .attributes
          .find((attribute) =>
            attribute.type === AST.JSXAttribute
            && attribute.name.name === "value"
          );
        if (attribute == null || !hasProperty(attribute, "value")) return;
        const value = attribute.value;
        if (value?.type !== AST.JSXExpressionContainer) return;
        if (value.expression.type === AST.JSXEmptyExpression) return;
        // Defer resolution to `Program:exit` where the enclosing component is
        // known and can serve as the resolution boundary.
        valueExpressions.push(value.expression);
      },
      "Program:exit"(program) {
        // Innermost components first so each value expression is attributed to
        // the closest enclosing component and reported only once.
        const components = api
          .getAllComponents(program)
          .filter(({ directives }) =>
            compilationMode !== "annotation"
            || !directives.some((d) => d.directive === "use memo")
          )
          .map(({ node }) => node)
          .sort((a, b) => (a.range[1] - a.range[0]) - (b.range[1] - b.range[0]));
        for (const valueExpression of valueExpressions) {
          const component = components.find((node) =>
            node.range[0] <= valueExpression.range[0]
            && valueExpression.range[1] <= node.range[1]
          );
          if (component == null) continue;
          const construction = resolveObjectType(context, valueExpression, { boundary: component });
          if (construction == null) continue;
          if (core.isHookCall(construction.node)) {
            continue;
          }
          const { kind, node: constructionNode } = construction;
          const suggestion = kind === "function"
            ? "Consider wrapping it in a useCallback hook."
            : "Consider wrapping it in a useMemo hook.";
          context.report({
            data: {
              kind: getHumanReadableKind(constructionNode),
              suggestion,
            },
            messageId: "unstable-context-value",
            node: constructionNode,
          });
        }
      },
    },
  );
}
