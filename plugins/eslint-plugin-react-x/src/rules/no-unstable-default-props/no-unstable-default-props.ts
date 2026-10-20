import { createRule } from "@/utils/create-rule";
import { Check, Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";
import { getSettingsFromContext, toRegExp } from "@eslint-react/shared";
import { resolveObjectType } from "@eslint-react/var";
import { AST_NODE_TYPES as AST, TSESTree } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { match } from "ts-pattern";
import { type ObjectDestructuringVariableDeclarator, SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR, getHumanReadableKind } from "./lib";

export const RULE_NAME = "no-unstable-default-props";

export const RULE_FEATURES = ["CFG"] as const satisfies RuleFeature[];

export type MessageID = "default";

type Options = readonly [
  {
    safeDefaultProps?: readonly string[];
  },
];

const defaultOptions = [
  {
    safeDefaultProps: [],
  },
] as const satisfies Options;

const schema = [
  {
    type: "object",
    additionalProperties: false,
    properties: {
      safeDefaultProps: {
        type: "array",
        items: { type: "string" },
      },
    },
  },
] satisfies [JSONSchema4];

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    defaultOptions: [...defaultOptions],
    docs: {
      description: "Prevents using referential-type values as default props in object destructuring.",
    },
    messages: {
      default: "A/an '{{kind}}' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of '{{kind}}'.",
    },
    schema,
  },
  name: RULE_NAME,
  create,
});

export function create(context: RuleContext<MessageID, Options>, [options]: Options): RuleListener {
  const { compilationMode } = getSettingsFromContext(context);
  if (compilationMode === "infer" || compilationMode === "all") return {};
  if (compilationMode === "annotation" && context.sourceCode.ast.body.some((stmt) => Check.isDirective(stmt, "use memo"))) return {};
  const { api, visitor } = core.getFunctionComponentCollector(context);

  const declarators: ObjectDestructuringVariableDeclarator[] = [];
  const { safeDefaultProps = [] } = options;
  const safePatterns = safeDefaultProps.map((s) => toRegExp(s));

  return merge(visitor, {
    [SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR](node: ObjectDestructuringVariableDeclarator) {
      declarators.push(node);
    },
    "Program:exit"(program) {
      // Innermost components first so each destructuring declarator is
      // attributed to the closest enclosing component and reported only once.
      const components = api
        .getAllComponents(program)
        .map(({ node }) => node)
        .sort((a, b) => (a.range[1] - a.range[0]) - (b.range[1] - b.range[0]));
      const innermostComponentOf = (node: TSESTree.Node) =>
        components.find((component) =>
          component.range[0] <= node.range[0]
          && node.range[1] <= component.range[1]
        );
      for (const component of components) {
        const { params } = component;
        const [props] = params;
        if (props == null) {
          continue;
        }
        const properties = match(props)
          .with({ type: AST.ObjectPattern }, ({ properties }) => properties)
          .with({ type: AST.Identifier }, ({ name }) => {
            return declarators
              .filter((d) =>
                d.init.name === name
                && innermostComponentOf(d) === component
              )
              .flatMap((d) => d.id.properties);
          })
          .otherwise(() => []);
        for (const prop of properties) {
          if (prop.type !== AST.Property || prop.value.type !== AST.AssignmentPattern) {
            continue;
          }
          const { value } = prop;
          const { right } = value;
          const construction = resolveObjectType(context, value, { boundary: component });
          if (construction == null) {
            continue;
          }
          if (core.isHookCall(construction.node)) {
            continue;
          }
          if (safePatterns.length > 0) {
            const getName = (n: TSESTree.Node) => Check.isIdentifier(n) ? n.name : null;
            const name = match(right)
              .with({ type: AST.NewExpression }, (n) => getName(n.callee))
              .with({ type: AST.CallExpression }, (n) => {
                return match(Extract.unwrap(n.callee))
                  .when(Check.isIdentifier, ({ name }) => name)
                  .when(Check.isMemberExpression, ({ object }) => getName(object))
                  .otherwise(() => null);
              })
              .otherwise(() => null);
            if (name != null && safePatterns.some((pattern) => pattern.test(name))) {
              continue;
            }
          }
          context.report({
            data: {
              kind: getHumanReadableKind(right),
            },
            messageId: "default",
            node: right,
          });
        }
      }
    },
  });
}
