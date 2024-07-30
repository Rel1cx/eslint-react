import { is, NodeType } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";
import { isMatching, match } from "ts-pattern";

import { isFromUseStateCall } from "./is-from-use-state-call";

export function isSetStateCall(context: RuleContext, useStateAlias: string[]) {
  return (node: TSESTree.CallExpression) => {
    const topLevelId = match(node.callee)
      // const [data, setData] = useState();
      // setData();
      .with({ type: NodeType.Identifier }, O.some)
      // const data = useState();
      // data[1]();
      .with({ type: NodeType.MemberExpression }, (n) => {
        if (!("name" in n.object)) return O.none();
        const initialScope = context.sourceCode.getScope(n);
        const property = getStaticValue(n.property, initialScope);
        if (property?.value === 1) return O.fromNullable(n.object);
        return O.none();
      })
      // const data = useState();
      // data.at(1)();
      .with({ type: NodeType.CallExpression }, (n) => {
        if (!is(NodeType.MemberExpression)(n.callee)) return O.none();
        if (!("name" in n.callee.object)) return O.none();
        const isAt = isMatching({
          type: NodeType.MemberExpression,
          property: {
            type: NodeType.Identifier,
            name: "at",
          },
        }, n.callee);
        const [index] = n.arguments;
        if (!isAt || !index) return O.none();
        const initialScope = context.sourceCode.getScope(n);
        // const data = useState();
        // const index = 1;
        // data[index]();
        const value = getStaticValue(index, initialScope);
        if (value?.value === 1) return O.fromNullable(n.callee.object);
        return O.none();
      })
      .otherwise(O.none);
    return O.exists(topLevelId, isFromUseStateCall(context, useStateAlias));
  };
}
