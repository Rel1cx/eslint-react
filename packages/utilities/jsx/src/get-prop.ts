import { is, NodeType } from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";
import { findVariable, getVariableNode } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import type { TSESTree } from "@typescript-eslint/utils";
import { getStaticValue } from "@typescript-eslint/utils/ast-utils";

/**
 * Get the name of a JSX attribute with namespace
 * @param node The JSX attribute node
 * @returns string
 */
export function getPropName(node: TSESTree.JSXAttribute) {
  switch (node.name.type) {
    case NodeType.JSXIdentifier:
      return node.name.name;
    case NodeType.JSXNamespacedName:
      return `${node.name.namespace.name}:${node.name.name.name}`;
  }
}

export function getProp(
  props: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propName: string,
  context: RuleContext,
  initialScope: Scope,
): O.Option<TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute> {
  return findPropInAttributes(props, context, initialScope)(propName);
}

/**
 * Gets and resolves the static value of a JSX attribute
 * @param attribute The JSX attribute to get the value of
 * @param context The rule context
 * @returns  The static value of the given JSX attribute
 */
export function getPropValue(
  attribute: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute,
  context: RuleContext,
) {
  const initialScope = context.sourceCode.getScope(attribute);
  if (attribute.type === NodeType.JSXAttribute && "value" in attribute) {
    const { value } = attribute;
    if (value === null) return O.none();
    if (value.type === NodeType.Literal) return O.some(getStaticValue(value, initialScope));
    if (value.type === NodeType.JSXExpressionContainer) return O.some(getStaticValue(value.expression, initialScope));

    return O.none();
  }
  const { argument } = attribute;

  return O.some(getStaticValue(argument, initialScope));
}

/**
 * @param properties The properties to search in
 * @param context The rule context
 * @param initialScope The initial scope to start from
 * @param seenProps The properties that have already been seen
 * @returns A function that searches for a property in the given properties
 */
export function findPropInProperties(
  properties: (TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement)[],
  context: RuleContext,
  initialScope: Scope,
  seenProps: string[] = [],
) {
  /**
   * Search for a property in the given properties
   * @param propName The name of the property to search for
   * @returns The property if found
   */
  return (propName: string): O.Option<(typeof properties)[number]> => {
    return O.fromNullable(
      properties.findLast((prop) => {
        switch (true) {
          case prop.type === NodeType.Property && "name" in prop.key && prop.key.name === propName:
            return true;
          case prop.type === NodeType.SpreadElement:
            switch (true) {
              case prop.argument.type === NodeType.Identifier: {
                const { name } = prop.argument;
                const maybeInit = O.flatMap(
                  findVariable(name, initialScope),
                  getVariableNode(0),
                );
                if (O.isNone(maybeInit)) return false;
                const init = maybeInit.value;
                if (!is(NodeType.ObjectExpression)(init)) return false;
                if (seenProps.includes(name)) return false;
                return O.isSome(
                  findPropInProperties(init.properties, context, initialScope, [...seenProps, name])(propName),
                );
              }
              case prop.argument.type === NodeType.ObjectExpression: {
                return O.isSome(
                  findPropInProperties(prop.argument.properties, context, initialScope, seenProps)(propName),
                );
              }
              default: {
                return false;
              }
            }
          case prop.type === NodeType.RestElement:
            return false;
          default:
            return false;
        }
      }),
    );
  };
}

/**
 * @param attributes The attributes to search in
 * @param context The rule context
 * @param initialScope The initial scope to start from
 * @returns A function that searches for a property in the given attributes
 */
export function findPropInAttributes(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  context: RuleContext,
  initialScope: Scope,
) {
  /**
   * Search for a property in the given attributes
   * @param propName The name of the property to search for
   * @returns The property if found
   */
  return (propName: string) => {
    return O.fromNullable(
      attributes.findLast((attr) => {
        switch (attr.type) {
          case NodeType.JSXAttribute:
            return getPropName(attr) === propName;
          case NodeType.JSXSpreadAttribute:
            switch (attr.argument.type) {
              case NodeType.Identifier: {
                const { name } = attr.argument;
                const maybeInit = O.flatMap(
                  findVariable(name, initialScope),
                  getVariableNode(0),
                );
                if (O.isNone(maybeInit)) return false;
                const init = maybeInit.value;
                if (!is(NodeType.ObjectExpression)(init)) return false;
                return O.isSome(findPropInProperties(init.properties, context, initialScope)(propName));
              }
              case NodeType.ObjectExpression:
                return O.isSome(findPropInProperties(attr.argument.properties, context, initialScope)(propName));
              case NodeType.MemberExpression:
                // Not implemented
                return false;
              case NodeType.CallExpression:
                // Not implemented
                return false;
              default:
                return false;
            }
          default:
            return false;
        }
      }),
    );
  };
}
