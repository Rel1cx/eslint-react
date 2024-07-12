import { is, NodeType, traverseUpGuard } from "@eslint-react/ast";
// import { Function as F, Option as O } from "effect";
import { F, O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { isMatching, P } from "ts-pattern";

/**
 * Unsafe check whether given node is declared directly inside a render property
 * ```jsx
 * const rows = { render: () => <div /> }
 * `                      ^^^^^^^^^^^^^ `
 * _ = <Component rows={ [{ render: () => <div /> }] } />
 * `                                ^^^^^^^^^^^^^       `
 *  ```
 * @internal
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render property, `false` if not
 */
export function isDirectValueOfRenderPropertyLoose(node: TSESTree.Node) {
  const matching = isMatching({
    key: {
      type: NodeType.Identifier,
      name: P.string.startsWith("render"),
    },
    type: NodeType.Property,
  });

  return matching(node) || matching(node.parent);
}

/**
 * Unsafe check whether given node is declared inside a render prop
 * ```jsx
 * _ = <Component renderRow={"node"} />
 * `                         ^^^^^^   `
 * _ = <Component rows={ [{ render: "node" }] } />
 * `                                ^^^^^^       `
 * ```
 * @param node The AST node to check
 * @returns `true` if component is declared inside a render prop, `false` if not
 */
export function isDeclaredInRenderPropLoose(node: TSESTree.Node) {
  if (isDirectValueOfRenderPropertyLoose(node)) {
    return true;
  }

  return F.pipe(
    traverseUpGuard(node, is(NodeType.JSXExpressionContainer)),
    O.flatMapNullable(c => c.parent),
    O.filter(is(NodeType.JSXAttribute)),
    O.flatMapNullable(a => a.name),
    O.exists(isMatching({
      type: NodeType.JSXIdentifier,
      name: P.string.startsWith("render"),
    })),
  );
}
