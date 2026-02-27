import * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { unit } from "@eslint-react/eff";
import { type RuleContext, type RuleFeature, defineRuleListener, report } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { isMatching } from "ts-pattern";

import { createRule } from "../../utils";

export const RULE_NAME = "no-array-index-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

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

// Gets the name of the index parameter from a map-like function's callback
// e.g., in `data.map((item, index) => ...)` it returns 'index'
function getMapIndexParamName(context: RuleContext, node: TSESTree.CallExpression): string | unit {
  const { callee } = node;
  if (callee.type !== AST.MemberExpression) {
    return unit;
  }
  if (callee.property.type !== AST.Identifier) {
    return unit;
  }
  const { name } = callee.property;
  // Determines the position of the index parameter for array methods like 'map', 'forEach', etc
  const indexPosition = getIndexParamPosition(name);
  if (indexPosition === -1) {
    return unit;
  }
  // The callback function is the first argument, or the second for `React.Children` methods
  const callbackArg = node.arguments[
    core.isChildrenMap(context, callee) || core.isChildrenForEach(context, callee)
      ? 1
      : 0
  ];
  if (callbackArg == null) {
    return unit;
  }
  if (!ast.isOneOf([AST.ArrowFunctionExpression, AST.FunctionExpression])(callbackArg)) {
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
function getIdentifiersFromBinaryExpression(side: TSESTree.BinaryExpression["left"]): readonly TSESTree.Identifier[] {
  if (side.type === AST.Identifier) {
    return [side];
  }
  if (side.type === AST.BinaryExpression) {
    return [
      ...getIdentifiersFromBinaryExpression(side.left),
      ...getIdentifiersFromBinaryExpression(side.right),
    ] as const;
  }
  return [] as const;
}

export default createRule<[], MessageID>({
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallows using an item's index in the array as its key.",
    },
    messages: {
      default: "Do not use item index in the array as its key.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // A stack to keep track of index parameter names from nested map calls
  const indexParamNames: Array<string | unit> = [];

  // Checks if a given node is an identifier that matches a known array index parameter name
  function isArrayIndex(node: TSESTree.Node): node is TSESTree.Identifier {
    return node.type === AST.Identifier
      && indexParamNames.some((name) => name != null && name === node.name);
  }

  // Checks if a call expression is `React.createElement` or `React.cloneElement`
  function isCreateOrCloneElementCall(node: TSESTree.Node): node is TSESTree.CallExpression {
    return core.isCreateElementCall(context, node) || core.isCloneElementCall(context, node);
  }

  // Generates report descriptors for various ways an array index can be used as a key
  function getReportDescriptors(node: TSESTree.Node): ReportDescriptor<MessageID>[] {
    switch (node.type) {
      // Case: key={index}
      case AST.Identifier: {
        if (indexParamNames.some((name) => name != null && name === node.name)) {
          return [{
            messageId: "default",
            node,
          }];
        }
        return [];
      }
      // Case: key={`foo-${index}`} or key={'foo' + index}
      case AST.TemplateLiteral:
      case AST.BinaryExpression: {
        const descriptors: ReportDescriptor<MessageID>[] = [];
        const expressions = node.type === AST.TemplateLiteral
          ? node.expressions
          : getIdentifiersFromBinaryExpression(node);
        for (const expression of expressions) {
          if (isArrayIndex(expression)) {
            descriptors.push({
              messageId: "default",
              node: expression,
            });
          }
        }
        return descriptors;
      }
      // Case: key={index.toString()} or key={String(index)}
      case AST.CallExpression: {
        switch (true) {
          // Case: key={index.toString()}
          case node.callee.type === AST.MemberExpression
            && node.callee.property.type === AST.Identifier
            && node.callee.property.name === "toString"
            && isArrayIndex(node.callee.object): {
            return [{
              messageId: "default",
              node: node.callee.object,
            }];
          }
          // Case: key={String(index)}
          case node.callee.type === AST.Identifier
            && node.callee.name === "String"
            && node.arguments[0] != null
            && isArrayIndex(node.arguments[0]): {
            return [{
              messageId: "default",
              node: node.arguments[0],
            }];
          }
        }
      }
    }
    return [];
  }

  return defineRuleListener(
    {
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
        if (props?.type !== AST.ObjectExpression) {
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
        if (node.value?.type !== AST.JSXExpressionContainer) {
          return;
        }
        // Check the expression and report if it uses an array index
        for (const descriptor of getReportDescriptors(node.value.expression)) {
          report(context)(descriptor);
        }
      },
    },
  );
}
