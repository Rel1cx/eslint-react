import type { _ } from "@eslint-react/eff";
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
  name: string,
  initialScope: Scope,
  props: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
): TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute | _ {
  return findPropInAttributes(name, initialScope, props);
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
): VAR.StaticValue {
  switch (attribute.type) {
    case T.JSXAttribute:
      if (attribute.value?.type === T.Literal) {
        return {
          kind: "some",
          node: attribute.value,
          initialScope,
          value: attribute.value.value,
        } as const;
      }
      if (attribute.value?.type === T.JSXExpressionContainer) {
        return {
          kind: "lazy",
          node: attribute.value.expression,
          initialScope,
        } as const;
      }
      return { kind: "none", node: attribute, initialScope } as const;
    case T.JSXSpreadAttribute:
      return {
        kind: "lazy",
        node: attribute.argument,
        initialScope,
      } as const;
    default:
      return { kind: "none", node: attribute, initialScope } as const;
  }
}

export function findPropInProperties(
  name: string,
  properties: (TSESTree.Property | TSESTree.RestElement | TSESTree.SpreadElement)[],
  initialScope: Scope,
  seenProps: string[] = [],
): (typeof properties)[number] | _ {
  return properties.findLast((prop) => {
    if (prop.type === T.Property) {
      return "name" in prop.key
        && prop.key.name === name;
    }
    if (prop.type === T.SpreadElement) {
      switch (prop.argument.type) {
        case T.Identifier: {
          if (seenProps.includes(prop.argument.name)) {
            return false;
          }
          const variable = VAR.findVariable(prop.argument.name, initialScope);
          const variableNode = VAR.getVariableNode(variable, 0);
          if (variableNode?.type === T.ObjectExpression) {
            return findPropInProperties(
              name,
              variableNode.properties,
              initialScope,
              [...seenProps, prop.argument.name],
            ) != null;
          }
          return false;
        }
        case T.ObjectExpression: {
          return findPropInProperties(
            name,
            prop.argument.properties,
            initialScope,
            seenProps,
          ) != null;
        }
      }
      return false;
    }
    return false;
  });
}

export function findPropInAttributes(
  name: string,
  initialScope: Scope,
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
): TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute | _ {
  return attributes.findLast((attr) => {
    if (attr.type === T.JSXAttribute) {
      return getPropName(attr) === name;
    }
    switch (attr.argument.type) {
      case T.Identifier: {
        const variable = VAR.findVariable(attr.argument.name, initialScope);
        const variableNode = VAR.getVariableNode(variable, 0);
        if (variableNode?.type === T.ObjectExpression) {
          return findPropInProperties(name, variableNode.properties, initialScope) != null;
        }
        return false;
      }
      case T.ObjectExpression:
        return findPropInProperties(name, attr.argument.properties, initialScope) != null;
    }
    return false;
  });
}
