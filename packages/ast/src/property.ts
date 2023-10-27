import type { TSESTree } from "@typescript-eslint/types";

import { isIdentifierWithName } from "./identifier";
import { NodeType } from "./node-types";

export function isPropertyOfObjectExpression(
  node: TSESTree.Node,
): node is TSESTree.Node & { parent: TSESTree.Property } {
  return node.parent?.type === NodeType.Property;
}

export function isPropertyWithIdentifierKey<const T extends string>(node: TSESTree.Node, key: T): node is
  & TSESTree.Property
  & {
    key:
      & TSESTree.Identifier
      & { name: T };
  }
{
  return node.type === NodeType.Property && isIdentifierWithName(node.key, key);
}

export function findPropertyWithIdentifierKey(
  properties: TSESTree.ObjectLiteralElement[],
  key: string,
) {
  return properties.find((x) => isPropertyWithIdentifierKey(x, key));
}
