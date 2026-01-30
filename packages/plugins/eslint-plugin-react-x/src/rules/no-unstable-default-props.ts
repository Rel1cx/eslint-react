import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { getOrElseUpdate } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener, toRegExp } from "@eslint-react/shared";
import { getObjectType } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-default-props";

export const RULE_FEATURES = ["CFG"] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

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
    docs: {
      description: "Prevents using referential-type values as default props in object destructuring.",
    },
    messages: {
      noUnstableDefaultProps:
        "A/an '{{forbiddenType}}' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of '{{forbiddenType}}'.",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

function extractIdentifier(node: TSESTree.Node): string | null {
  if (node.type === AST.NewExpression && node.callee.type === AST.Identifier) {
    return node.callee.name;
  }
  if (
    node.type === AST.CallExpression
    && node.callee.type === AST.MemberExpression
  ) {
    const { object } = node.callee;
    if (object.type === AST.Identifier) {
      return object.name;
    }
  }
  return null;
}

export function create(
  context: RuleContext<MessageID, Options>,
  [options]: Options,
): RuleListener {
  // If "use memo" directive is present in the file, skip analysis
  if (
    ast.getFileDirectives(context.sourceCode.ast).some(
      (d) => d.value === "use memo",
    )
  ) {
    return {};
  }

  const { ctx, visitor } = core.useComponentCollector(context);
  const declarators = new WeakMap<
    ast.TSESTreeFunction,
    ast.ObjectDestructuringVariableDeclarator[]
  >();
  const { safeDefaultProps = [] } = options;
  const safePatterns = safeDefaultProps.map((s) => toRegExp(s));

  return defineRuleListener(visitor, {
    [ast.SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR](
      node: ast.ObjectDestructuringVariableDeclarator,
    ) {
      const functionEntry = ctx.getCurrentEntry();
      if (functionEntry == null) return;
      getOrElseUpdate(declarators, functionEntry.node, () => []).push(node);
    },
    "Program:exit"(program) {
      for (const { node: component } of ctx.getAllComponents(program)) {
        const { params } = component;
        const [props] = params;
        if (props == null) {
          continue;
        }
        const properties = match(props)
          .with({ type: AST.ObjectPattern }, ({ properties }) => properties)
          .with({ type: AST.Identifier }, ({ name }) => {
            return (
              declarators
                .get(component)
                ?.filter((d) => d.init.name === name)
                .flatMap((d) => d.id.properties) ?? []
            );
          })
          .otherwise(() => []);
        for (const prop of properties) {
          if (
            prop.type !== AST.Property
            || prop.value.type !== AST.AssignmentPattern
          ) {
            continue;
          }
          const { value } = prop;
          const { right } = value;
          const initialScope = context.sourceCode.getScope(value);
          const construction = getObjectType(value, initialScope);
          if (construction == null) {
            continue;
          }
          if (core.isHookCall(construction.node)) {
            continue;
          }
          if (safePatterns.length > 0) {
            const identifier = extractIdentifier(right);
            if (
              identifier != null
              && safePatterns.some((pattern) => pattern.test(identifier))
            ) {
              continue;
            }
          }
          const forbiddenType = ast.toDelimiterFormat(right);
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
  });
}
