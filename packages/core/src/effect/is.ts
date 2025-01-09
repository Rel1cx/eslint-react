import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isUseEffectCallLoose } from "../hook";

export function isSetupFunction(node: TSESTree.Node) {
  return node.parent?.type === T.CallExpression
    && node.parent.callee !== node
    && node.parent.callee.type === T.Identifier
    && node.parent.arguments.at(0) === node
    && isUseEffectCallLoose(node.parent);
}

export function isCleanupFunction(node: TSESTree.Node) {
  return F.pipe(
    O.Do,
    O.bind("nearReturn", () => AST.findParentNodeGuard(node, AST.is(T.ReturnStatement))),
    O.bind("nearFunction", () => AST.findParentNodeGuard(node, AST.isFunction)),
    O.bind("nearFunctionOfReturn", ({ nearReturn }) => AST.findParentNodeGuard(nearReturn, AST.isFunction)),
    O.exists(({ nearFunction, nearFunctionOfReturn }) =>
      nearFunction === nearFunctionOfReturn
      && isSetupFunction(nearFunction)
    ),
  );
}
