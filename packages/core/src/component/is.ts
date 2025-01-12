import type * as AST from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

/**
 * Check if a node is a React class component
 * @param node The AST node to check
 * @returns `true` if the node is a class component, `false` otherwise
 */
export function isClassComponent(node: TSESTree.Node): node is AST.TSESTreeClass {
  if ("superClass" in node && node.superClass) {
    const re = /^(?:Pure)?Component$/u;
    switch (true) {
      case node.superClass.type === T.Identifier:
        return re.test(node.superClass.name);
      case node.superClass.type === T.MemberExpression
        && node.superClass.property.type === T.Identifier:
        return re.test(node.superClass.property.name);
    }
  }
  return false;
}

/**
 * Check if a node is a React PureComponent
 * @param node The AST node to check
 * @returns `true` if the node is a pure component, `false` otherwise
 */
export function isPureComponent(node: TSESTree.Node) {
  if ("superClass" in node && node.superClass) {
    const re = /^PureComponent$/u;
    switch (true) {
      case node.superClass.type === T.Identifier:
        return re.test(node.superClass.name);
      case node.superClass.type === T.MemberExpression
        && node.superClass.property.type === T.Identifier:
        return re.test(node.superClass.property.name);
    }
  }
  return false;
}
