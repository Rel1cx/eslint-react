import * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";

/**
 * Get the name of a JSX attribute with namespace
 * @param node The JSX attribute node
 * @returns string
 */
export function getPropName(node: TSESTree.JSXAttribute) {
  switch (node.name.type) {
    case T.JSXIdentifier:
      return node.name.name;
    case T.JSXNamespacedName:
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
  if (attribute.type === T.JSXAttribute && "value" in attribute) {
    const { value } = attribute;
    if (value == null) {
      return O.none();
    }
    if (value.type === T.Literal) {
      return VAR.getStaticValue(value, initialScope);
    }
    if (value.type === T.JSXExpressionContainer) {
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
          case prop.type === T.Property && "name" in prop.key && prop.key.name === propName:
            return true;
          case prop.type === T.SpreadElement:
            switch (true) {
              case prop.argument.type === T.Identifier: {
                const { name } = prop.argument;
                if (seenProps.includes(name)) {
                  return false;
                }
                return F.pipe(
                  VAR.findVariable(name, initialScope),
                  O.flatMap(VAR.getVariableNode(0)),
                  O.filter(AST.is(T.ObjectExpression)),
                  O.flatMap((init) =>
                    findPropInProperties(init.properties, initialScope, [...seenProps, name])(propName)
                  ),
                  O.isSome,
                );
              }
              case prop.argument.type === T.ObjectExpression: {
                return O.isSome(
                  findPropInProperties(prop.argument.properties, initialScope, seenProps)(propName),
                );
              }
              default: {
                return false;
              }
            }
          case prop.type === T.RestElement:
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
          case T.JSXAttribute:
            return getPropName(attr) === propName;
          case T.JSXSpreadAttribute:
            switch (attr.argument.type) {
              case T.CallExpression:
                // Not implemented
                return false;
              case T.Identifier: {
                const { name } = attr.argument;
                return F.pipe(
                  VAR.findVariable(name, initialScope),
                  O.flatMap(VAR.getVariableNode(0)),
                  O.filter(AST.is(T.ObjectExpression)),
                  O.flatMap((init) => findPropInProperties(init.properties, initialScope)(propName)),
                  O.isSome,
                );
              }
              case T.MemberExpression:
                // Not implemented
                return false;
              case T.ObjectExpression:
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
