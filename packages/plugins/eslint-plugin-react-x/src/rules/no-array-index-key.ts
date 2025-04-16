import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import { Reporter as RPT, type RuleContext, type RuleFeature } from "@eslint-react/kit";
import { coerceSettings } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-array-index-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const reactChildrenMethod = ["forEach", "map"] as const;

function isReactChildrenMethod(name: string): name is typeof reactChildrenMethod[number] {
  return reactChildrenMethod.some((method) => method === name);
}

function isUsingReactChildren(context: RuleContext, node: TSESTree.CallExpression) {
  const { importSource = "react" } = coerceSettings(context.settings);
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
    return ER.isInitializedFromReact(callee.object.object.name, importSource, initialScope);
  }
  return false;
}

function getMapIndexParamName(context: RuleContext, node: TSESTree.CallExpression): string | _ {
  const { callee } = node;
  if (callee.type !== T.MemberExpression) {
    return _;
  }
  if (callee.property.type !== T.Identifier) {
    return _;
  }
  const { name } = callee.property;
  const indexPosition = AST.getArrayMethodCallbackIndexParamPosition(name);
  if (indexPosition === -1) {
    return _;
  }
  const callbackArg = node.arguments[isUsingReactChildren(context, node) ? 1 : 0];
  if (callbackArg == null) {
    return _;
  }
  if (!AST.isOneOf([T.ArrowFunctionExpression, T.FunctionExpression])(callbackArg)) {
    return _;
  }
  const { params } = callbackArg;
  if (params.length < indexPosition + 1) {
    return _;
  }
  const param = params.at(indexPosition);

  return param != null && "name" in param
    ? param.name
    : _;
}

function getIdentifiersFromBinaryExpression(
  side:
    | TSESTree.BinaryExpression
    | TSESTree.BinaryExpression["left"]
    | TSESTree.BinaryExpression["right"],
): readonly TSESTree.Identifier[] {
  if (side.type === T.Identifier) {
    return [side];
  }
  if (side.type === T.BinaryExpression) {
    return [
      ...getIdentifiersFromBinaryExpression(side.left),
      ...getIdentifiersFromBinaryExpression(side.right),
    ] as const;
  }
  return [] as const;
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow an item's index in the array as its key.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noArrayIndexKey: "Do not use item index in the array as its key.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const report = RPT.make(context);
  const indexParamNames: Array<string | _> = [];

  function isArrayIndex(node: TSESTree.Node): node is TSESTree.Identifier {
    return node.type === T.Identifier
      && indexParamNames.some((name) => name != null && name === node.name);
  }

  function isCreateOrCloneElementCall(node: TSESTree.Node): node is TSESTree.CallExpression {
    return ER.isCreateElementCall(context, node) || ER.isCloneElementCall(context, node);
  }

  function getReportDescriptors(node: TSESTree.Node): ReportDescriptor<MessageID>[] {
    switch (node.type) {
      // key={bar}
      case T.Identifier: {
        if (indexParamNames.some((name) => name != null && name === node.name)) {
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
          : getIdentifiersFromBinaryExpression(node);
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
            && node.arguments[0] != null
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
      indexParamNames.push(getMapIndexParamName(context, node));
      if (node.arguments.length === 0) {
        return;
      }
      if (!isCreateOrCloneElementCall(node)) {
        return;
      }
      const [, props] = node.arguments;
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
        for (const descriptor of getReportDescriptors(prop.value)) {
          report.send(descriptor);
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
      for (const descriptor of getReportDescriptors(node.value.expression)) {
        report.send(descriptor);
      }
    },
  };
}
