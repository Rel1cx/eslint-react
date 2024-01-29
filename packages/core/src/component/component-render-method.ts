import { NodeType, traverseUp, type TSESTreeFunction } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { Option as O } from "effect";
import { isMatching, P } from "ts-pattern";

import { isClassComponent } from "./component-collector-legacy";

const isRenderMethodLike = isMatching({
  key: {
    type: NodeType.Identifier,
    name: "render",
  },
  type: P.union(NodeType.MethodDefinition, NodeType.PropertyDefinition),
  parent: {
    type: NodeType.ClassBody,
    parent: {
      type: NodeType.ClassDeclaration,
    },
  },
});

export function isFunctionOfRenderMethod(node: TSESTreeFunction, context: RuleContext) {
  if (!isRenderMethodLike(node.parent)) return false;

  return isClassComponent(node.parent.parent.parent, context);
}

/**
 * Check whether given node is declared inside class component's render block
 * ```jsx
 * class Component extends React.Component {
 *   render() {
 *     class NestedClassComponent extends React.Component {
 *      render() { return <div />; }
 *     }
 *     const nestedFunctionComponent = () => <div />;
 *  }
 * }
 * ```
 * @param node The AST node being checked
 * @param context
 * @returns `true` if node is inside class component's render block, `false` if not
 * @deprecated It will be removed in the future
 */
export function isInsideRenderMethod(node: TSESTree.Node, context: RuleContext) {
  const predicate = (node: TSESTree.Node): node is TSESTree.MethodDefinition => {
    return isRenderMethodLike(node) && isClassComponent(node.parent.parent, context);
  };

  return O.isSome(traverseUp(node, predicate));
}
