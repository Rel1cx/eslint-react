import { Check, type TSESTreeFunction } from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

/**
 * Check if a function parameter has a type annotation that looks like a React component type.
 * Matches types like ComponentType, React.ComponentType, FC, React.FC, etc.
 * @param param The parameter to check.
 */
export function hasComponentTypeAnnotation(param: TSESTree.Parameter): boolean {
  if (param.type !== AST.Identifier || param.typeAnnotation == null) return false;
  const annotation = param.typeAnnotation.typeAnnotation;
  // Check for direct references like ComponentType, FC, etc.
  if (annotation.type === AST.TSTypeReference) {
    return isComponentTypeName(annotation.typeName);
  }
  return false;
}

/**
 * Check if a type name refers to a known React component type.
 * @param typeName The type name to check.
 */
export function isComponentTypeName(typeName: TSESTree.EntityName): boolean {
  if (typeName.type === AST.Identifier) {
    return /^(ComponentType|FC|ComponentClass|FunctionComponent|Component)$/.test(typeName.name);
  }
  // Handle qualified names like React.ComponentType, React.FC
  if (typeName.type === AST.TSQualifiedName) {
    if (typeName.left.type === AST.Identifier && typeName.left.name === "React") {
      return isComponentTypeName(typeName.right);
    }
  }
  return false;
}

/**
 * Heuristically check if a function is a Higher Order Component (HOC) based on its parameters.
 * Considers a function an HOC if it takes a parameter that looks like a React component
 * (by name or type annotation). This does not validate that the function actually returns
 * a React component.
 * @param fn The function to check.
 */
export function isHigherOrderComponent(fn: TSESTreeFunction): boolean {
  return fn.params.some((param) => {
    // Check for PascalCase parameter name (e.g., WrappedComponent, Component)
    if (param.type === AST.Identifier && core.isFunctionComponentNameLoose(param.name)) {
      return true;
    }
    // Check for ComponentType/FC type annotation
    if (hasComponentTypeAnnotation(param)) {
      return true;
    }
    return false;
  });
}

export function isTestMock(node: TSESTree.Node | null): node is TSESTree.MemberExpression {
  return node != null
    && node.type === AST.MemberExpression
    && node.object.type === AST.Identifier
    && node.property.type === AST.Identifier
    && node.property.name === "mock";
}

export function isTestMockCallback(node: TSESTree.Node | null) {
  return node != null
    && Check.isFunction(node)
    && node.parent.type === AST.CallExpression
    && isTestMock(node.parent.callee)
    && node.parent.arguments[1] === node;
}
