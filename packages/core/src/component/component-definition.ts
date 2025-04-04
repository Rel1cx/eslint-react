import * as AST from "@eslint-react/ast";

import { type RuleContext } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isMatching, P } from "ts-pattern";
import { ComponentDetectionHint } from "./component-detection-hint";
import { isChildrenOfCreateElement, isFunctionOfRenderMethod } from "./hierarchy";

const isFunctionOfClassMethod = isMatching({
  type: P.union(T.ArrowFunctionExpression, T.FunctionExpression),
  parent: T.MethodDefinition,
});

const isFunctionOfClassProperty = isMatching({
  type: P.union(T.ArrowFunctionExpression, T.FunctionExpression),
  parent: T.Property,
});

const isFunctionOfObjectMethod = isMatching({
  type: P.union(T.ArrowFunctionExpression, T.FunctionExpression),
  parent: {
    type: T.Property,
    parent: {
      type: T.ObjectExpression,
    },
  },
});

export function isValidComponentDefinition(context: RuleContext, node: AST.TSESTreeFunction, hint: bigint) {
  if (isChildrenOfCreateElement(context, node) || isFunctionOfRenderMethod(node)) {
    return false;
  }
  if (hint & ComponentDetectionHint.SkipObjectMethod && isFunctionOfObjectMethod(node.parent)) {
    return false;
  }
  if (hint & ComponentDetectionHint.SkipClassMethod && isFunctionOfClassMethod(node.parent)) {
    return false;
  }
  if (hint & ComponentDetectionHint.SkipClassProperty && isFunctionOfClassProperty(node.parent)) {
    return false;
  }
  if (hint & ComponentDetectionHint.SkipArrayMapArgument && AST.isArrayMapCallLoose(node.parent)) {
    return false;
  }
  const boundaryNode = AST.findParentNode(
    node,
    AST.isOneOf([
      T.JSXExpressionContainer,
      T.ArrowFunctionExpression,
      T.FunctionExpression,
      T.Property,
      T.ClassBody,
    ]),
  );
  return boundaryNode == null || boundaryNode.type !== T.JSXExpressionContainer;
}
