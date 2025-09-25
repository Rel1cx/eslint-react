import * as AST from "@eslint-react/ast";
import { type RuleContext } from "@eslint-react/kit";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import { P, isMatching } from "ts-pattern";
import { isChildrenOfCreateElement } from "./component-children";
import { ComponentDetectionHint } from "./component-detection-hint";
import { isClassComponent } from "./component-is";
import { isRenderMethodLike } from "./component-render-method";

/**
 * Function pattern matchers for different contexts
 */
const functionPatterns = {
  classMethod: {
    type: P.union(T.ArrowFunctionExpression, T.FunctionExpression),
    parent: T.MethodDefinition,
  },

  classProperty: {
    type: P.union(T.ArrowFunctionExpression, T.FunctionExpression),
    parent: T.Property,
  },

  objectMethod: {
    type: P.union(T.ArrowFunctionExpression, T.FunctionExpression),
    parent: {
      type: T.Property,
      parent: {
        type: T.ObjectExpression,
      },
    },
  },
};

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
  return isRenderMethodLike(node.parent) && isClassComponent(node.parent.parent.parent);
}

/**
 * Checks if a function node should be excluded based on detection hints
 * @param node The function node to check
 * @param hint Component detection hints as bit flags
 * @returns `true` if the function should be excluded, `false` otherwise
 */
function shouldExcludeBasedOnHint(node: AST.TSESTreeFunction, hint: bigint) {
  if ((hint & ComponentDetectionHint.SkipObjectMethod) && isMatching(functionPatterns.objectMethod)(node)) {
    return true;
  }

  if ((hint & ComponentDetectionHint.SkipClassMethod) && isMatching(functionPatterns.classMethod)(node)) {
    return true;
  }

  if ((hint & ComponentDetectionHint.SkipClassProperty) && isMatching(functionPatterns.classProperty)(node)) {
    return true;
  }

  if ((hint & ComponentDetectionHint.SkipArrayMapArgument) && AST.isArrayMapCall(node.parent)) {
    return true;
  }

  return false;
}

/**
 * Determines if a function node represents a valid React component definition
 * @param context The rule context
 * @param node The function node to check
 * @param hint Component detection hints as bit flags
 * @returns `true` if the node is a valid component definition, `false` otherwise
 */
export function isComponentDefinition(context: RuleContext, node: AST.TSESTreeFunction, hint: bigint) {
  // Check for immediate exclusion cases
  if (isChildrenOfCreateElement(context, node) || isFunctionOfRenderMethod(node)) {
    return false;
  }

  // Check for hint-based exclusions
  if (shouldExcludeBasedOnHint(node, hint)) {
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
