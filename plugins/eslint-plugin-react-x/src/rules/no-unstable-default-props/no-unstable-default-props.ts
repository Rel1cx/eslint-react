import { createRule } from "@/utils/create-rule";
import { Check, Extract, type TSESTreeFunction, Traverse } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { getSettingsFromContext, toRegExp } from "@eslint-react/shared";
import { computeObjectType } from "@eslint-react/var";
import { getOrInsertComputed } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { JSONSchema4 } from "@typescript-eslint/utils/json-schema";
import { match } from "ts-pattern";
import { type ObjectDestructuringVariableDeclarator, SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR } from "./lib";

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
    docs: {
      description: "Prevents using referential-type values as default props in object destructuring.",
    },
    messages: {
      default:
        "A/an '{{kind}}' as default prop. This could lead to potential infinite render loop in React. Use a variable instead of '{{kind}}'.",
    },
    schema,
  },
  name: RULE_NAME,
  create,
  defaultOptions,
});

function extractIdentifier(node: TSESTree.Node): string | null {
  if (node.type === AST.NewExpression) {
    const callee = Extract.unwrap(node.callee);
    if (callee.type === AST.Identifier) {
      return callee.name;
    }
  }
  if (node.type === AST.CallExpression) {
    const callee = Extract.unwrap(node.callee);
    if (callee.type === AST.Identifier) {
      return callee.name;
    }
    if (callee.type === AST.MemberExpression) {
      const { object } = callee;
      if (object.type === AST.Identifier) {
        return object.name;
      }
    }
  }
  return null;
}

export function create(context: RuleContext<MessageID, Options>, [options]: Options) {
  const { compilationMode } = getSettingsFromContext(context);
  if (compilationMode === "infer" || compilationMode === "all") return {};
  if (compilationMode === "annotation" && context.sourceCode.ast.body.some(Check.isDirective("use memo"))) return {};
  const { api, visitor } = core.getFunctionComponentCollector(context);

  const declarators = new WeakMap<TSESTreeFunction, ObjectDestructuringVariableDeclarator[]>();
  const { safeDefaultProps = [] } = options;
  const safePatterns = safeDefaultProps.map((s) => toRegExp(s));

  return merge(visitor, {
    "Program:exit"(program) {
      for (const { node: component } of api.getAllComponents(program)) {
        const { params } = component;
        const [props] = params;
        if (props == null) {
          continue;
        }
        const properties = match(props)
          .with({ type: AST.ObjectPattern }, ({ properties }) => properties)
          .with({ type: AST.Identifier }, ({ name }) => {
            return declarators
              .get(component)
              ?.filter((d) => d.init.name === name)
              .flatMap((d) => d.id.properties) ?? [];
          })
          .otherwise(() => []);
        for (const prop of properties) {
          if (prop.type !== AST.Property || prop.value.type !== AST.AssignmentPattern) {
            continue;
          }
          const { value } = prop;
          const { right } = value;
          const construction = computeObjectType(context, value);
          if (construction == null) {
            continue;
          }
          if (core.isHookCall(construction.node)) {
            continue;
          }
          if (safePatterns.length > 0) {
            const identifier = extractIdentifier(right);
            if (identifier != null && safePatterns.some((pattern) => pattern.test(identifier))) {
              continue;
            }
          }
          context.report({
            data: {
              kind: Extract.getHumanReadableKind(right),
            },
            messageId: "default",
            node: right,
          });
        }
      }
    },
    [SEL_OBJECT_DESTRUCTURING_VARIABLE_DECLARATOR](node: ObjectDestructuringVariableDeclarator) {
      const enclosingFunction = Traverse.findParent(node, Check.isFunction);
      if (enclosingFunction == null) return;
      getOrInsertComputed(declarators, enclosingFunction, () => []).push(node);
    },
  });
}
