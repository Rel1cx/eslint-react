import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/tools";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Get the name of a JSX attribute with namespace
 * @param node The JSX attribute node
 * @returns string
 */
// eslint-disable-next-line @typescript-eslint/consistent-return
export function getPropName(node: TSESTree.JSXAttribute) {
  switch (node.name.type) {
    case AST_NODE_TYPES.JSXIdentifier:
      return node.name.name;
    case AST_NODE_TYPES.JSXNamespacedName:
      return `${node.name.namespace.name}:${node.name.name.name}`;
  }
}

export function getProp(
  props: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
  propName: string,
  initialScope: Scope,
): O.Option<TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute> {
  return findPropInAttributes(props, initialScope)(propName);
}

/**
 * Gets and resolves the static value of a JSX attribute
 * @param attribute The JSX attribute to get the value of
 * @param initialScope The initial scope to start from
 * @returns  The static value of the given JSX attribute
 */
export function getPropValue(
  attribute: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute,
  initialScope: Scope,
) {
  if (attribute.type === AST_NODE_TYPES.JSXAttribute && "value" in attribute) {
    const { value } = attribute;
    if (value === null) return O.none();
    if (value.type === AST_NODE_TYPES.Literal) return VAR.getStaticValue(value, initialScope);
    if (value.type === AST_NODE_TYPES.JSXExpressionContainer) {
      return VAR.getStaticValue(value.expression, initialScope);
    }

    return O.none();
  }
  const { argument } = attribute;

  return VAR.getStaticValue(argument, initialScope);
}

/**
 * @param properties The properties to search in
 * @param initialScope The initial scope to start from
 * @param seenProps The properties that have already been seen
 * @returns A function that searches for a property in the given properties
 */
export function findPropInProperties(
  properties: (TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement)[],
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
          case prop.type === AST_NODE_TYPES.Property && "name" in prop.key && prop.key.name === propName:
            return true;
          case prop.type === AST_NODE_TYPES.SpreadElement:
            switch (true) {
              case prop.argument.type === AST_NODE_TYPES.Identifier: {
                const { name } = prop.argument;
                const maybeInit = O.flatMap(
                  VAR.findVariable(name, initialScope),
                  VAR.getVariableNode(0),
                );
                if (O.isNone(maybeInit)) return false;
                const init = maybeInit.value;
                if (!AST.is(AST_NODE_TYPES.ObjectExpression)(init)) return false;
                if (seenProps.includes(name)) return false;
                return O.isSome(
                  findPropInProperties(init.properties, initialScope, [...seenProps, name])(propName),
                );
              }
              case prop.argument.type === AST_NODE_TYPES.ObjectExpression: {
                return O.isSome(
                  findPropInProperties(prop.argument.properties, initialScope, seenProps)(propName),
                );
              }
              default: {
                return false;
              }
            }
          case prop.type === AST_NODE_TYPES.RestElement:
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
 * @param initialScope The initial scope to start from
 * @returns A function that searches for a property in the given attributes
 */
export function findPropInAttributes(
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
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
          case AST_NODE_TYPES.JSXAttribute:
            return getPropName(attr) === propName;
          case AST_NODE_TYPES.JSXSpreadAttribute:
            switch (attr.argument.type) {
              case AST_NODE_TYPES.CallExpression:
                // Not implemented
                return false;
              case AST_NODE_TYPES.Identifier: {
                const { name } = attr.argument;
                const maybeInit = O.flatMap(
                  VAR.findVariable(name, initialScope),
                  VAR.getVariableNode(0),
                );
                if (O.isNone(maybeInit)) return false;
                const init = maybeInit.value;
                if (!AST.is(AST_NODE_TYPES.ObjectExpression)(init)) return false;
                return O.isSome(findPropInProperties(init.properties, initialScope)(propName));
              }
              case AST_NODE_TYPES.MemberExpression:
                // Not implemented
                return false;
              case AST_NODE_TYPES.ObjectExpression:
                return O.isSome(findPropInProperties(attr.argument.properties, initialScope)(propName));
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
