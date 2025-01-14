import { _, identity } from "@eslint-react/eff";
import * as VAR from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { match, P } from "ts-pattern";

export function getAttributeName(node: TSESTree.JSXAttribute) {
  switch (node.name.type) {
    case T.JSXIdentifier:
      return node.name.name;
    case T.JSXNamespacedName:
      return `${node.name.namespace.name}:${node.name.name.name}`;
  }
}

export function getAttributeNode(
  name: string,
  initialScope: Scope,
  attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
): TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute | _ {
  return attributes.findLast((attr) => {
    if (attr.type === T.JSXAttribute) {
      return getAttributeName(attr) === name;
    }
    switch (attr.argument.type) {
      case T.Identifier: {
        const variable = VAR.findVariable(attr.argument.name, initialScope);
        const variableNode = VAR.getVariableNode(variable, 0);
        if (variableNode?.type === T.ObjectExpression) {
          return VAR.findPropertyInProperties(name, variableNode.properties, initialScope) != null;
        }
        return false;
      }
      case T.ObjectExpression:
        return VAR.findPropertyInProperties(name, attr.argument.properties, initialScope) != null;
    }
    return false;
  });
}

export function getAttributeStaticValue(
  node: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute,
  initialScope: Scope,
): VAR.StaticValue {
  switch (node.type) {
    case T.JSXAttribute:
      if (node.value?.type === T.Literal) {
        return {
          kind: "some",
          node: node.value,
          initialScope,
          value: node.value.value,
        } as const;
      }
      if (node.value?.type === T.JSXExpressionContainer) {
        return {
          kind: "lazy",
          node: node.value.expression,
          initialScope,
        } as const;
      }
      return { kind: "none", node, initialScope } as const;
    case T.JSXSpreadAttribute:
      return {
        kind: "lazy",
        node: node.argument,
        initialScope,
      } as const;
    default:
      return { kind: "none", node, initialScope } as const;
  }
}

export function getAttributeStringValue(
  name: string,
  node: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute | _,
  initialScope: Scope,
) {
  if (node == null) return _;
  const attributeValue = getAttributeStaticValue(node, initialScope);
  const attributeValueResolved = VAR.toResolved(attributeValue).value;
  return match(attributeValueResolved)
    .with(P.string, identity)
    .with({ [name]: P.select(P.string) }, identity)
    .otherwise(() => _);
}
