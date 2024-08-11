import { isOneOf } from "@eslint-react/ast";
import { isCloneElementCall, isCreateElementCall, isInitializedFromReact } from "@eslint-react/core";
import { unsafeCastSettings } from "@eslint-react/shared";
import { isNullable, O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-array-index-key";

export type MessageID = CamelCase<typeof RULE_NAME>;

// #endregion

// #region Constants

const reactChildrenMethod = ["forEach", "map"] as const;

const iteratorFunctionIndexParamPosition = new Map<string, number>([
  ["every", 1],
  ["filter", 1],
  ["find", 1],
  ["findIndex", 1],
  ["findLast", 1],
  ["findLastIndex", 1],
  ["flatMap", 1],
  ["forEach", 1],
  ["map", 1],
  ["reduce", 2],
  ["reduceRight", 2],
  ["some", 1],
]);

// #endregion

// #region Helpers

function isReactChildrenMethod(name: string): name is typeof reactChildrenMethod[number] {
  return reactChildrenMethod.some((method) => method === name);
}

function isUsingReactChildren(node: TSESTree.CallExpression, context: RuleContext) {
  const settings = unsafeCastSettings(context.settings);
  const { callee } = node;
  if (!("property" in callee) || !("object" in callee) || !("name" in callee.property)) {
    return false;
  }
  if (!isReactChildrenMethod(callee.property.name)) return false;
  const initialScope = context.sourceCode.getScope(node);
  if (callee.object.type === AST_NODE_TYPES.Identifier && callee.object.name === "Children") return true;
  if (callee.object.type === AST_NODE_TYPES.MemberExpression && "name" in callee.object.object) {
    return isInitializedFromReact(callee.object.object.name, initialScope, settings);
  }
  return false;
}

function getMapIndexParamName(node: TSESTree.CallExpression, context: RuleContext) {
  const { callee } = node;
  if (callee.type !== AST_NODE_TYPES.MemberExpression) return O.none();
  if (callee.property.type !== AST_NODE_TYPES.Identifier) return O.none();
  const { name } = callee.property;
  if (!iteratorFunctionIndexParamPosition.has(name)) return O.none();
  const callbackArg = node.arguments[isUsingReactChildren(node, context) ? 1 : 0];
  if (!callbackArg) return O.none();
  if (!isOneOf([AST_NODE_TYPES.ArrowFunctionExpression, AST_NODE_TYPES.FunctionExpression])(callbackArg)) {
    return O.none();
  }
  const { params } = callbackArg;
  const indexParamPosition = iteratorFunctionIndexParamPosition.get(name);
  if (isNullable(indexParamPosition)) return O.none();
  if (params.length < indexParamPosition + 1) return O.none();
  const param = params.at(indexParamPosition);

  return param && "name" in param ? O.some(param.name) : O.none();
}

function getIdentifiersFromBinaryExpression(side: TSESTree.Node): TSESTree.Identifier[] {
  if (side.type === AST_NODE_TYPES.Identifier) return [side];
  if (side.type === AST_NODE_TYPES.BinaryExpression) {
    return [
      ...getIdentifiersFromBinaryExpression(side.left),
      ...getIdentifiersFromBinaryExpression(side.right),
    ].filter(Boolean);
  }

  return [];
}

// #endregion

// #region Rule Definition

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using Array index as 'key'",
    },
    messages: {
      noArrayIndexKey: "Do not use Array index as 'key'.",
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
      return node.type === AST_NODE_TYPES.Identifier && indexParamNames.some((name) => name === node.name);
    }

    function checkPropValue(node: TSESTree.Node): ReportDescriptor<MessageID>[] {
      // key={bar}
      if (isArrayIndex(node)) {
        return [{ messageId: "noArrayIndexKey", node }];
      }
      // key={`foo-${bar}`} or key={'foo' + bar}
      if (isOneOf([AST_NODE_TYPES.TemplateLiteral, AST_NODE_TYPES.BinaryExpression])(node)) {
        const exps = AST_NODE_TYPES.TemplateLiteral === node.type
          ? node.expressions
          : getIdentifiersFromBinaryExpression(node);

        return exps.reduce<ReportDescriptor<MessageID>[]>((acc, exp) => {
          if (isArrayIndex(exp)) return [...acc, { messageId: "noArrayIndexKey", node: exp }];

          return acc;
        }, []);
      }
      const isToStringCall = isMatching({
        type: AST_NODE_TYPES.CallExpression,
        callee: {
          type: AST_NODE_TYPES.MemberExpression,
          property: {
            type: AST_NODE_TYPES.Identifier,
            name: "toString",
          },
        },
      }, node);
      // key={bar.toString()}
      if (isToStringCall) {
        if (!("object" in node.callee && isArrayIndex(node.callee.object))) return [];

        return [{ messageId: "noArrayIndexKey", node: node.callee.object }];
      }
      // key={String(bar)}
      const isStringCall = isMatching({
        type: AST_NODE_TYPES.CallExpression,
        callee: {
          type: AST_NODE_TYPES.Identifier,
          name: "String",
        },
      }, node);
      if (isStringCall) {
        const [arg] = node.arguments;
        if (arg && isArrayIndex(arg)) return [{ messageId: "noArrayIndexKey", node: arg }];
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
          if (props?.type !== AST_NODE_TYPES.ObjectExpression) return;
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
        if (value?.type !== AST_NODE_TYPES.JSXExpressionContainer) return;
        const descriptors = checkPropValue(value.expression);
        for (const descriptor of descriptors) {
          context.report(descriptor);
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
