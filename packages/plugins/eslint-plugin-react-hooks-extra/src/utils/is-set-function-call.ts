import type { RuleContext } from "@eslint-react/kit";
import type { ESLintReactSettingsNormalized } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import * as VAR from "@eslint-react/var";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isFromUseStateCall } from "./is-from-use-state-call";

export function isSetFunctionCall(context: RuleContext, settings: ESLintReactSettingsNormalized) {
  const isIdFromUseStateCall = isFromUseStateCall(context, settings);
  // eslint-disable-next-line function/function-return-boolean
  return (node: TSESTree.CallExpression) => {
    switch (node.callee.type) {
      // const data = useState();
      // data.at(1)();
      case T.CallExpression: {
        const { callee } = node.callee;
        if (callee.type !== T.MemberExpression) {
          return false;
        }
        if (!("name" in callee.object)) {
          return false;
        }
        const isAt = callee.property.type === T.Identifier && callee.property.name === "at";
        const [index] = node.callee.arguments;
        if (!isAt || index == null) {
          return false;
        }
        const indexScope = context.sourceCode.getScope(node);
        const indexValue = VAR.toStaticValue({
          kind: "lazy",
          node: index,
          initialScope: indexScope,
        }).value;
        return indexValue === 1 && isIdFromUseStateCall(callee.object);
      }
      // const [data, setData] = useState();
      // setData();
      case T.Identifier: {
        return isIdFromUseStateCall(node.callee);
      }
      // const data = useState();
      // data[1]();
      case T.MemberExpression: {
        if (!("name" in node.callee.object)) {
          return false;
        }
        const property = node.callee.property;
        const propertyScope = context.sourceCode.getScope(node);
        const propertyValue = VAR.toStaticValue({
          kind: "lazy",
          node: property,
          initialScope: propertyScope,
        }).value;
        return propertyValue === 1 && isIdFromUseStateCall(node.callee.object);
      }
      default: {
        return false;
      }
    }
  };
}
