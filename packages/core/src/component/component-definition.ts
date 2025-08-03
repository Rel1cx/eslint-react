import * as AST from "@eslint-react/ast";

import { type RuleContext } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { isMatching, P } from "ts-pattern";
import { isChildrenOfCreateElement } from "./component-children";
import { ComponentDetectionHint } from "./component-detection-hint";
import { isClassComponent } from "./component-is";
import { isRenderMethodLike } from "./component-render-method";

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

/**
 * Check whether given node is a function of a render method of a class component
 * @example
 * ```tsx
 * class Component extends React.Component {
 *   renderHeader = () => <div />;
 *   renderFooter = () => <div />;
 * }
 * ```
 * @param node The AST node to check
 * @returns `true` if node is a render function, `false` if not
 */
export function isFunctionOfRenderMethod(node: AST.TSESTreeFunction) {
  if (!isRenderMethodLike(node.parent)) {
    return false;
  }

  return isClassComponent(node.parent.parent.parent);
}

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
  if (hint & ComponentDetectionHint.SkipArrayMapArgument && AST.isArrayMapCall(node.parent)) {
    return false;
  }
  const significantParent = AST.findParentNode(
    node,
    AST.isOneOf([
      T.JSXExpressionContainer,
      T.ArrowFunctionExpression,
      T.FunctionExpression,
      T.Property,
      T.ClassBody,
    ]),
  );
  return significantParent == null || significantParent.type !== T.JSXExpressionContainer;
}
