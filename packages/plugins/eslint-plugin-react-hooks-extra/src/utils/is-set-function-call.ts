import { O } from "@eslint-react/eff";
import type { ESLintReactSettings } from "@eslint-react/shared";
import type { RuleContext } from "@eslint-react/types";
import * as VAR from "@eslint-react/var";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isMatching } from "ts-pattern";

import { isFromUseStateCall } from "./is-from-use-state-call";

export function isSetFunctionCall(context: RuleContext, settings: ESLintReactSettings) {
  const isIdFromUseStateCall = isFromUseStateCall(context, settings);
  return (node: TSESTree.CallExpression) => {
    switch (node.callee.type) {
      // const data = useState();
      // data.at(1)();
      case T.CallExpression: {
        const { callee } = node.callee;
        if (callee.type !== T.MemberExpression) return false;
        if (!("name" in callee.object)) return false;
        const isAt = isMatching({
          type: T.MemberExpression,
          property: {
            type: T.Identifier,
            name: "at",
          },
        }, callee);
        const [index] = node.callee.arguments;
        if (!isAt || !index) return false;
        const initialScope = context.sourceCode.getScope(node);
        return O.exists(VAR.getStaticValue(index, initialScope), (v) => v === 1)
          && isIdFromUseStateCall(callee.object);
      }
      // const [data, setData] = useState();
      // setData();
      case T.Identifier: {
        return isIdFromUseStateCall(node.callee);
      }
      // const data = useState();
      // data[1]();
      case T.MemberExpression: {
        if (!("name" in node.callee.object)) return false;
        const initialScope = context.sourceCode.getScope(node);
        return O.exists(VAR.getStaticValue(node.callee.property, initialScope), (v) => v === 1)
          && isIdFromUseStateCall(node.callee.object);
      }
      default: {
        return false;
      }
    }
  };
}
