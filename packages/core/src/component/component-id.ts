import * as AST from "@eslint-react/ast";
import { unit } from "@eslint-react/eff";
import type { RuleContext } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { isComponentWrapperCallLoose } from "./component-wrapper";

export function getFunctionComponentId(
  context: RuleContext,
  node: AST.TSESTreeFunction,
): TSESTree.Identifier | TSESTree.Identifier[] | unit {
  const functionId = AST.getFunctionId(node);
  if (functionId != null) {
    return functionId;
  }
  const { parent } = node;
  // Get function component identifier from `const Component = memo(() => {});`
  if (
    parent.type === T.CallExpression
    && isComponentWrapperCallLoose(context, parent)
    && parent.parent.type === T.VariableDeclarator
    && parent.parent.id.type === T.Identifier
  ) {
    return parent.parent.id;
  }
  // Get function component identifier from `const Component = memo(forwardRef(() => {}));`
  if (
    parent.type === T.CallExpression
    && isComponentWrapperCallLoose(context, parent)
    && parent.parent.type === T.CallExpression
    && isComponentWrapperCallLoose(context, parent.parent)
    && parent.parent.parent.type === T.VariableDeclarator
    && parent.parent.parent.id.type === T.Identifier
  ) {
    return parent.parent.parent.id;
  }
  return unit;
}
