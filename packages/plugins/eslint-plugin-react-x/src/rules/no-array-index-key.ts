import * as AST from "@eslint-react/ast";
import { isCloneElementCall, isCreateElementCall, isInitializedFromReact } from "@eslint-react/core";
import { isNullable, O } from "@eslint-react/eff";
import { unsafeDecodeSettings } from "@eslint-react/shared";
import type { RuleContext, RuleFeature } from "@eslint-react/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

// #region Rule Metadata

export const RULE_NAME = "no-array-index-key";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

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
  const settings = unsafeDecodeSettings(context.settings);
  const { callee } = node;
  if (!("property" in callee) || !("object" in callee) || !("name" in callee.property)) {
    return false;
  }
  if (!isReactChildrenMethod(callee.property.name)) {
    return false;
  }
  const initialScope = context.sourceCode.getScope(node);
  if (callee.object.type === T.Identifier && callee.object.name === "Children") {
    return true;
  }
  if (callee.object.type === T.MemberExpression && "name" in callee.object.object) {
    return isInitializedFromReact(callee.object.object.name, initialScope, settings.importSource);
  }
  return false;
}

function getMapIndexParamName(node: TSESTree.CallExpression, context: RuleContext) {
  const { callee } = node;
  if (callee.type !== T.MemberExpression) {
    return O.none();
  }
  if (callee.property.type !== T.Identifier) {
    return O.none();
  }
  const { name } = callee.property;
  if (!iteratorFunctionIndexParamPosition.has(name)) {
    return O.none();
  }
  const callbackArg = node.arguments[isUsingReactChildren(node, context) ? 1 : 0];
  if (!callbackArg) {
    return O.none();
  }
  if (!AST.isOneOf([T.ArrowFunctionExpression, T.FunctionExpression])(callbackArg)) {
    return O.none();
  }
  const { params } = callbackArg;
  const indexParamPosition = iteratorFunctionIndexParamPosition.get(name);
  if (isNullable(indexParamPosition)) {
    return O.none();
  }
  if (params.length < indexParamPosition + 1) {
    return O.none();
  }
  const param = params.at(indexParamPosition);

  return param && "name" in param ? O.some(param.name) : O.none();
}

// #endregion

// #region Rule Implementation

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using Array index as 'key'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noArrayIndexKey: "Do not use Array index as 'key'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const indexParamNames: O.Option<string>[] = [];

    function isArrayIndex(node: TSESTree.Node): node is TSESTree.Identifier {
      return node.type === T.Identifier
        && indexParamNames.some(O.exists((name) => name === node.name));
    }

    function isCreateOrCloneElementCall(node: TSESTree.Node): node is TSESTree.CallExpression {
      return isCreateElementCall(node, context) || isCloneElementCall(node, context);
    }

    function getReportDescriptors(node: TSESTree.Node): ReportDescriptor<MessageID>[] {
      switch (node.type) {
        // key={bar}
        case T.Identifier: {
          if (indexParamNames.some(O.exists((name) => name === node.name))) {
            return [{
              messageId: "noArrayIndexKey",
              node,
            }];
          }
          return [];
        }
        // key={`foo-${bar}`} or key={'foo' + bar}
        case T.TemplateLiteral:
        case T.BinaryExpression: {
          const descriptors: ReportDescriptor<MessageID>[] = [];
          const expressions = node.type === T.TemplateLiteral
            ? node.expressions
            : AST.getIdentifiersFromBinaryExpression(node);
          for (const expression of expressions) {
            if (isArrayIndex(expression)) {
              descriptors.push({
                messageId: "noArrayIndexKey",
                node: expression,
              });
            }
          }
          return descriptors;
        }
        // key={bar.toString()} or key={String(bar)}
        case T.CallExpression: {
          switch (true) {
            // key={bar.toString()}
            case node.callee.type === T.MemberExpression
              && node.callee.property.type === T.Identifier
              && node.callee.property.name === "toString"
              && isArrayIndex(node.callee.object): {
              return [{
                messageId: "noArrayIndexKey",
                node: node.callee.object,
              }];
            }
            // key={String(bar)}
            case node.callee.type === T.Identifier
              && node.callee.name === "String"
              && node.arguments[0]
              && isArrayIndex(node.arguments[0]): {
              return [{
                messageId: "noArrayIndexKey",
                node: node.arguments[0],
              }];
            }
          }
        }
      }
      return [];
    }

    return {
      CallExpression(node) {
        indexParamNames.push(getMapIndexParamName(node, context));
        if (node.arguments.length === 0) {
          return;
        }
        if (!isCreateOrCloneElementCall(node)) {
          return;
        }
        const [_, props] = node.arguments;
        if (props?.type !== T.ObjectExpression) {
          return;
        }
        for (const prop of props.properties) {
          if (!isMatching({ key: { name: "key" } })(prop)) {
            continue;
          }
          if (!("value" in prop)) {
            continue;
          }
          const descriptors = getReportDescriptors(prop.value);
          for (const descriptor of descriptors) {
            context.report(descriptor);
          }
        }
      },
      "CallExpression:exit"() {
        indexParamNames.pop();
      },
      JSXAttribute(node) {
        if (node.name.name !== "key") {
          return;
        }
        if (indexParamNames.length === 0) {
          return;
        }
        if (node.value?.type !== T.JSXExpressionContainer) {
          return;
        }
        const descriptors = getReportDescriptors(node.value.expression);
        for (const descriptor of descriptors) {
          context.report(descriptor);
        }
      },
    };
  },
  defaultOptions: [],
});
