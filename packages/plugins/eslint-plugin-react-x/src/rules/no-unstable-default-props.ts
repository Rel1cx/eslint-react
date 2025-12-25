import * as AST from "@eslint-react/ast";
import { isReactHookCall, useComponentCollector } from "@eslint-react/core";
import { getOrElseUpdate } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, toRegExp } from "@eslint-react/shared";
import { getObjectType } from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { match } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-unstable-default-props";

export const RULE_FEATURES = [
  "CFG",
] as const satisfies RuleFeature[];

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
  if (node.type === T.NewExpression && node.callee.type === T.Identifier) {
    return node.callee.name;
  }
  if (node.type === T.CallExpression && node.callee.type === T.MemberExpression) {
    const { object } = node.callee;
    if (object.type === T.Identifier) {
      return object.name;
    }
  }
  return null;
}

export function create(context: RuleContext<MessageID, Options>, [options]: Options): RuleListener {
  const { ctx, listeners } = useComponentCollector(context);
  const declarators = new WeakMap<AST.TSESTreeFunction, AST.ObjectDestructuringVariableDeclarator[]>();
  const { safeDefaultProps = [] } = options;
  const safePatterns = safeDefaultProps.map((s) => toRegExp(s));

  return {
    ...listeners,
    [AST.SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR](node: AST.ObjectDestructuringVariableDeclarator) {
      const functionEntry = ctx.getCurrentEntry();
      if (functionEntry == null) return;
      getOrElseUpdate(
        declarators,
        functionEntry.node,
        () => [],
      ).push(node);
    },
    "Program:exit"(program) {
      for (const { node: component } of ctx.getAllComponents(program)) {
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
          const construction = getObjectType(
            value,
            initialScope,
          );
          if (construction == null) {
            continue;
          }
          if (isReactHookCall(construction.node)) {
            continue;
          }
          if (safePatterns.length > 0) {
            const identifier = extractIdentifier(right);
            if (identifier != null && safePatterns.some((pattern) => pattern.test(identifier))) {
              continue;
            }
          }
          const forbiddenType = AST.toDelimiterFormat(right);
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
  };
}
