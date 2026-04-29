import { Extract } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { isMatching } from "ts-pattern";

import { createRule } from "@/utils/create-rule";
import { getIdentifiersFromBinaryExpression, getMapIndexParamName, report } from "./lib";

export const RULE_NAME = "no-array-index-key";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

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
  const indexParamNames: Array<string | null> = [];

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
        const callee = Extract.unwrap(node.callee);
        switch (true) {
          // Case: key={index.toString()}
          case callee.type === AST.MemberExpression
            && callee.property.type === AST.Identifier
            && callee.property.name === "toString"
            && isArrayIndex(callee.object): {
            return [{
              messageId: "default",
              node: callee.object,
            }];
          }
          // Case: key={String(index)}
          case callee.type === AST.Identifier
            && callee.name === "String"
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

  return merge(
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
        // The key's value must be an expression container (ex: key={...})
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
