import { isOneOf, NodeType } from "@eslint-react/ast";
import { isCloneElementCall, isCreateElementCall, isInitializedFromReact } from "@eslint-react/core";

import { O, Record } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { ConstantCase } from "string-ts";
import { isMatching, match, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-array-index-key";

export type MessageID = ConstantCase<typeof RULE_NAME>;

const reactChildrenMethod = ["forEach", "map"] as const;

function isReactChildrenMethod(name: string): name is typeof reactChildrenMethod[number] {
  return reactChildrenMethod.some((method) => method === name);
}

const iteratorFunctionIndexParamPosition = {
  every: 1,
  filter: 1,
  find: 1,
  findIndex: 1,
  findLast: 1,
  findLastIndex: 1,
  flatMap: 1,
  forEach: 1,
  map: 1,
  reduce: 2,
  reduceRight: 2,
  some: 1,
} as const;

function isUsingReactChildren(node: TSESTree.CallExpression, context: RuleContext) {
  const { callee } = node;
  if (!("property" in callee) || !("object" in callee) || !("name" in callee.property)) {
    return false;
  }
  if (!isReactChildrenMethod(callee.property.name)) return false;
  const initialScope = context.sourceCode.getScope(node);
  return match(callee.object)
    .with({ type: NodeType.Identifier, name: "Children" }, () => true)
    .with(
      { type: NodeType.MemberExpression, object: { type: NodeType.Identifier, name: P.string } },
      ({ object }) => isInitializedFromReact(object.name, context, initialScope),
    )
    .otherwise(() => false);
}

function getMapIndexParamName(node: TSESTree.CallExpression, context: RuleContext) {
  const { callee } = node;
  if (callee.type !== NodeType.MemberExpression) return O.none();
  if (callee.property.type !== NodeType.Identifier) return O.none();
  const { name } = callee.property;
  if (!Record.has(iteratorFunctionIndexParamPosition, name as never)) return O.none();
  const callbackArg = node.arguments[isUsingReactChildren(node, context) ? 1 : 0];
  if (!callbackArg) return O.none();
  if (!isOneOf([NodeType.ArrowFunctionExpression, NodeType.FunctionExpression])(callbackArg)) return O.none();
  const { params } = callbackArg;
  const maybeIndexParamPosition = Record.get(iteratorFunctionIndexParamPosition, name as never);
  if (O.isNone(maybeIndexParamPosition)) return O.none();
  const indexParamPosition = maybeIndexParamPosition.value;
  if (params.length < indexParamPosition + 1) return O.none();
  const param = params.at(indexParamPosition);

  return param && "name" in param ? O.some(param.name) : O.none();
}

function getIdentifiersFromBinaryExpression(side: TSESTree.Node): TSESTree.Identifier[] {
  if (side.type === NodeType.Identifier) return [side];
  if (side.type === NodeType.BinaryExpression) {
    return [
      ...getIdentifiersFromBinaryExpression(side.left),
      ...getIdentifiersFromBinaryExpression(side.right),
    ].filter(Boolean);
  }

  return [];
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using Array index as key",
    },
    messages: {
      NO_ARRAY_INDEX_KEY: "Do not use Array index as key.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const indexParamNames: string[] = [];

    function pushIndexParamName(node: TSESTree.CallExpression) {
      O.map(getMapIndexParamName(node, context), (name) => indexParamNames.push(name));
    }

    function popIndexParamName(node: TSESTree.CallExpression) {
      O.map(getMapIndexParamName(node, context), () => indexParamNames.pop());
    }

    function isArrayIndex(node: TSESTree.Node): node is TSESTree.Identifier {
      return node.type === NodeType.Identifier && indexParamNames.some((name) => name === node.name);
    }

    function checkPropValue(node: TSESTree.Node): ReportDescriptor<MessageID>[] {
      // key={bar}
      if (isArrayIndex(node)) {
        return [{ messageId: "NO_ARRAY_INDEX_KEY", node }];
      }
      // key={`foo-${bar}`} or key={'foo' + bar}
      if (isOneOf([NodeType.TemplateLiteral, NodeType.BinaryExpression])(node)) {
        const exps = NodeType.TemplateLiteral === node.type
          ? node.expressions
          : getIdentifiersFromBinaryExpression(node);

        return exps.reduce<ReportDescriptor<MessageID>[]>((acc, exp) => {
          if (isArrayIndex(exp)) return [...acc, { messageId: "NO_ARRAY_INDEX_KEY", node: exp }];

          return acc;
        }, []);
      }
      const isToStringCall = isMatching({
        type: NodeType.CallExpression,
        callee: {
          type: NodeType.MemberExpression,
          property: {
            type: NodeType.Identifier,
            name: "toString",
          },
        },
      }, node);
      // key={bar.toString()}
      if (isToStringCall) {
        if (!("object" in node.callee && isArrayIndex(node.callee.object))) return [];

        return [{ messageId: "NO_ARRAY_INDEX_KEY", node: node.callee.object }];
      }
      // key={String(bar)}
      const isStringCall = isMatching({
        type: NodeType.CallExpression,
        callee: {
          type: NodeType.Identifier,
          name: "String",
        },
      }, node);
      if (isStringCall) {
        const [arg] = node.arguments;
        if (arg && isArrayIndex(arg)) return [{ messageId: "NO_ARRAY_INDEX_KEY", node: arg }];
      }

      return [];
    }

    return {
      CallExpression(node) {
        if (
          (isCreateElementCall(node, context) || isCloneElementCall(node, context))
          && node.arguments.length > 1
        ) {
          if (indexParamNames.length === 0) return;
          const props = node.arguments[1];
          if (props?.type !== NodeType.ObjectExpression) return;
          for (const prop of props.properties) {
            if (!isMatching({ key: { name: "key" } }, prop)) continue;
            if (!("value" in prop)) continue;
            const descriptors = checkPropValue(prop.value);
            for (const descriptor of descriptors) {
              context.report(descriptor);
            }
          }
        }

        pushIndexParamName(node);
      },
      "CallExpression:exit": popIndexParamName,
      JSXAttribute(node) {
        if (node.name.name !== "key") return;
        if (indexParamNames.length === 0) return;
        const { value } = node;
        if (value?.type !== NodeType.JSXExpressionContainer) return;
        const descriptors = checkPropValue(value.expression);
        for (const descriptor of descriptors) {
          context.report(descriptor);
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
