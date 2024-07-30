import { NodeType } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { isMatching } from "ts-pattern";

import { isFromUseStateCall } from "./is-from-use-state-call";

export function isSetStateCall(context: RuleContext, useStateAlias: string[]) {
  return (node: TSESTree.CallExpression) => {
    switch (node.callee.type) {
      // const [data, setData] = useState();
      // setData();
      case NodeType.Identifier: {
        return isFromUseStateCall(context, useStateAlias)(node.callee);
      }
      // const data = useState();
      // data[1]();
      case NodeType.MemberExpression: {
        if (!("name" in node.callee.object)) return false;
        const initialScope = context.sourceCode.getScope(node);
        const property = getStaticValue(node.callee.property, initialScope);
        if (property?.value === 1) return isFromUseStateCall(context, useStateAlias)(node.callee.object);
        return false;
      }
      // const data = useState();
      // data.at(1)();
      case NodeType.CallExpression: {
        const callee = node.callee.callee;
        if (callee.type !== NodeType.MemberExpression) return false;
        if (!("name" in callee.object)) return false;
        const isAt = isMatching({
          type: NodeType.MemberExpression,
          property: {
            type: NodeType.Identifier,
            name: "at",
          },
        }, callee);
        const [index] = node.callee.arguments;
        if (!isAt || !index) return false;
        const initialScope = context.sourceCode.getScope(node);
        const value = getStaticValue(index, initialScope);
        if (value?.value === 1) return isFromUseStateCall(context, useStateAlias)(callee.object);
        return false;
      }
      default: {
        return false;
      }
    }
  };
}
