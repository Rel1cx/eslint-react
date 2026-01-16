import * as AST from "@eslint-react/ast";
import { isCloneElementCall, isCreateElementCall, isInitializedFromReact } from "@eslint-react/core";
import { unit } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, report } from "@eslint-react/shared";
import { coerceSettings } from "@eslint-react/shared";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { isMatching } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-array-index-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

const REACT_CHILDREN_METHOD = ["forEach", "map"] as const;

export function getIndexParamPosition(methodName: string) {
  switch (methodName) {
    case "every":
    case "filter":
    case "find":
    case "findIndex":
    case "findLast":
    case "findLastIndex":
    case "flatMap":
    case "forEach":
    case "map":
    case "some":
      return 1;
    case "reduce":
    case "reduceRight":
      return 2;
    default:
      return -1;
  }
}

// Checks if a method name is 'forEach' or 'map'
function isReactChildrenMethod(name: string): name is typeof REACT_CHILDREN_METHOD[number] {
  return REACT_CHILDREN_METHOD.includes(name as never);
}

// Checks if a CallExpression is `React.Children.map` or `React.Children.forEach`
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
    return isInitializedFromReact(callee.object.object.name, initialScope, importSource);
  }
  return false;
}

// Gets the name of the index parameter from a map-like function's callback
// e.g., in `data.map((item, index) => ...)` it returns 'index'
function getMapIndexParamName(context: RuleContext, node: TSESTree.CallExpression): string | unit {
  const { callee } = node;
  if (callee.type !== T.MemberExpression) {
    return unit;
  }
  if (callee.property.type !== T.Identifier) {
    return unit;
  }
  const { name } = callee.property;
  // Determines the position of the index parameter for array methods like 'map', 'forEach', etc
  const indexPosition = getIndexParamPosition(name);
  if (indexPosition === -1) {
    return unit;
  }
  // The callback function is the first argument, or the second for `React.Children` methods
  const callbackArg = node.arguments[isUsingReactChildren(context, node) ? 1 : 0];
  if (callbackArg == null) {
    return unit;
  }
  if (!AST.isOneOf([T.ArrowFunctionExpression, T.FunctionExpression])(callbackArg)) {
    return unit;
  }
  const { params } = callbackArg;
  if (params.length < indexPosition + 1) {
    return unit;
  }
  const param = params.at(indexPosition);

  return param != null && "name" in param
    ? param.name
    : unit;
}

// Recursively collects all identifiers from a binary expression
// e.g., for `a + b + c`, it returns identifiers for a, b, and c
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
      description: "Disallows using an item's index in the array as its key.",
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
  // A stack to keep track of index parameter names from nested map calls
  const indexParamNames: Array<string | unit> = [];

  // Checks if a given node is an identifier that matches a known array index parameter name
  function isArrayIndex(node: TSESTree.Node): node is TSESTree.Identifier {
    return node.type === T.Identifier
      && indexParamNames.some((name) => name != null && name === node.name);
  }

  // Checks if a call expression is `React.createElement` or `React.cloneElement`
  function isCreateOrCloneElementCall(node: TSESTree.Node): node is TSESTree.CallExpression {
    return isCreateElementCall(context, node) || isCloneElementCall(context, node);
  }

  // Generates report descriptors for various ways an array index can be used as a key
  function getReportDescriptors(node: TSESTree.Node): ReportDescriptor<MessageID>[] {
    switch (node.type) {
      // Case: key={index}
      case T.Identifier: {
        if (indexParamNames.some((name) => name != null && name === node.name)) {
          return [{
            messageId: "noArrayIndexKey",
            node,
          }];
        }
        return [];
      }
      // Case: key={`foo-${index}`} or key={'foo' + index}
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
      // Case: key={index.toString()} or key={String(index)}
      case T.CallExpression: {
        switch (true) {
          // Case: key={index.toString()}
          case node.callee.type === T.MemberExpression
            && node.callee.property.type === T.Identifier
            && node.callee.property.name === "toString"
            && isArrayIndex(node.callee.object): {
            return [{
              messageId: "noArrayIndexKey",
              node: node.callee.object,
            }];
          }
          // Case: key={String(index)}
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
      // Push the index parameter name (if any) to the stack
      indexParamNames.push(getMapIndexParamName(context, node));
      if (node.arguments.length === 0) {
        return;
      }
      // Check for array index usage in `createElement` and `cloneElement` calls
      if (!isCreateOrCloneElementCall(node)) {
        return;
      }
      const [, props] = node.arguments;
      if (props?.type !== T.ObjectExpression) {
        return;
      }
      for (const prop of props.properties) {
        // Find the 'key' prop
        if (!isMatching({ key: { name: "key" } })(prop)) {
          continue;
        }
        if (!("value" in prop)) {
          continue;
        }
        // Check its value and report if it uses an array index
        for (const descriptor of getReportDescriptors(prop.value)) {
          report(context)(descriptor);
        }
      }
    },
    // When exiting a CallExpression, pop the index name from the stack to manage scope
    "CallExpression:exit"() {
      indexParamNames.pop();
    },
    // Handles JSX attributes
    JSXAttribute(node) {
      // Check only for the 'key' attribute
      if (node.name.name !== "key") {
        return;
      }
      // Ignore if we are not inside a map-like call
      if (indexParamNames.length === 0) {
        return;
      }
      // The key's value must be an expression container (e.g., key={...})
      if (node.value?.type !== T.JSXExpressionContainer) {
        return;
      }
      // Check the expression and report if it uses an array index
      for (const descriptor of getReportDescriptors(node.value.expression)) {
        report(context)(descriptor);
      }
    },
  };
}
