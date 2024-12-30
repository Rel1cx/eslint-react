import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

import { isCreateElementCall } from "../utils";

/**
 * Determines whether inside `createElement`'s props.
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is inside createElement's props
 */
export function isInsideCreateElementProps(
  node: TSESTree.Node,
  context: RuleContext,
) {
  return F.pipe(
    O.Do,
    O.bind("call", () => AST.traverseUpGuard(node, isCreateElementCall(context))),
    O.bind("prop", () => AST.traverseUpGuard(node, AST.is(AST_NODE_TYPES.ObjectExpression))),
    O.bind("arg1", ({ call }) => O.fromNullable(call.arguments[1])),
    O.exists(({ arg1, prop }) => prop === arg1),
  );
}

/**
 * Determines whether inside `createElement`'s children.
 * @param node The AST node to check
 * @param context The rule context
 * @returns `true` if the node is inside createElement's children
 */
export function isChildrenOfCreateElement(
  node: TSESTree.Node,
  context: RuleContext,
) {
  return F.pipe(
    O.fromNullable(node.parent),
    O.filter(AST.is(AST_NODE_TYPES.CallExpression)),
    O.filter(isCreateElementCall(context)),
    O.exists(n =>
      n.arguments
        .slice(2)
        .some(arg => arg === node)
    ),
  );
}
