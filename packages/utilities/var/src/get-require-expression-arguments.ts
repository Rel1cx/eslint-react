import { identity } from "@local/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { P, match } from "ts-pattern";

/**
 * Get the arguments of a require expression
 * @param node The node to match
 * @returns The require expression arguments or null if the node is not a require expression
 * @internal
 */
export function getRequireExpressionArguments(node: TSESTree.Node) {
  return match<typeof node, TSESTree.CallExpressionArgument[] | null>(node)
    .with(
      {
        // require("source")
        type: AST.CallExpression,
        arguments: P.select(),
        callee: {
          type: AST.Identifier,
          name: "require",
        },
      },
      identity,
    )
    .with(
      {
        // require("source").variable
        type: AST.MemberExpression,
        object: P.select(),
      },
      getRequireExpressionArguments,
    )
    .otherwise(() => null);
}
