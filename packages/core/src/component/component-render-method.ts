import * as AST from "@eslint-react/ast";
import { O } from "@eslint-react/eff";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { isMatching, P } from "ts-pattern";

import { isClassComponent } from "./component-collector-legacy";

const isRenderMethodLike = isMatching({
  key: {
    type: T.Identifier,
    name: "render",
  },
  type: P.union(T.MethodDefinition, T.PropertyDefinition),
  parent: {
    type: T.ClassBody,
    parent: {
      type: T.ClassDeclaration,
    },
  },
});

export function isFunctionOfRenderMethod(node: AST.TSESTreeFunction) {
  if (!isRenderMethodLike(node.parent)) {
    return false;
  }

  return isClassComponent(node.parent.parent.parent);
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
 * @returns `true` if node is inside class component's render block, `false` if not
 */
export function isInsideRenderMethod(node: TSESTree.Node) {
  return O.isSome(AST.findParentNode(node, (node: TSESTree.Node) => {
    return isRenderMethodLike(node) && isClassComponent(node.parent.parent);
  }));
}
