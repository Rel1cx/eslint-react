import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import * as Extract from "./extract";

export type Predicate<T extends TSESTree.Node> = (node: TSESTree.Node) => node is T;
export type NodePredicate = (node: TSESTree.Node) => boolean;

export function findParent<T extends TSESTree.Node>(
  of: TSESTree.Node | null,
  where: Predicate<T>,
): T | null;
export function findParent(
  of: TSESTree.Node | null,
  where: NodePredicate,
): TSESTree.Node | null;
export function findParent(
  of: TSESTree.Node | null,
  where: NodePredicate,
): TSESTree.Node | null {
  if (of == null) return null;
  let parent = of.parent;
  while (parent?.type !== AST.Program) {
    if (parent == null) return null;
    if (where(parent)) return parent;
    parent = parent.parent;
  }
  return null;
}

export function findProperty(
  in_: TSESTree.ObjectLiteralElement[],
  named: string,
): TSESTree.Property | null {
  for (const property of in_) {
    if (
      property.type === AST.Property
      && Extract.propertyName(property.key) === named
    ) {
      return property;
    }
    if (
      property.type === AST.SpreadElement
      && property.argument.type === AST.ObjectExpression
    ) {
      const found = findProperty(property.argument.properties, named);
      if (found != null) return found;
    }
  }
  return null;
}
