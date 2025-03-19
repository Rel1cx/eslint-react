import * as AST from "@eslint-react/ast";
import { _ } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isReactHookCallWithNameLoose } from "../hook";
import { isForwardRefCall, isMemoCall } from "../utils";

function isComponentWrapperCall(
  context: RuleContext,
  node: TSESTree.Node,
) {
  if (node.type !== T.CallExpression) {
    return false;
  }
  return isMemoCall(context, node)
    || isForwardRefCall(context, node)
    || isReactHookCallWithNameLoose(node)("useCallback");
}

export function getFunctionComponentIdentifier(
  context: RuleContext,
  node: AST.TSESTreeFunction,
): TSESTree.Identifier | TSESTree.Identifier[] | _ {
  const functionId = AST.getFunctionIdentifier(node);
  if (functionId != null) {
    return functionId;
  }
  const { parent } = node;
  // Get function component identifier from `const Component = memo(() => {});`
  if (
    parent.type === T.CallExpression
    && isComponentWrapperCall(context, parent)
    && parent.parent.type === T.VariableDeclarator
    && parent.parent.id.type === T.Identifier
  ) {
    return parent.parent.id;
  }
  // Get function component identifier from `const Component = memo(forwardRef(() => {}));`
  if (
    parent.type === T.CallExpression
    && isComponentWrapperCall(context, parent)
    && parent.parent.type === T.CallExpression
    && isComponentWrapperCall(context, parent.parent)
    && parent.parent.parent.type === T.VariableDeclarator
    && parent.parent.parent.id.type === T.Identifier
  ) {
    return parent.parent.parent.id;
  }
  return _;
}
