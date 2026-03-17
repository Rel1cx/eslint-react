import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/types";

/**
 * Recursively extract the **text content** from a JSX node tree.
 *
 * Mirrors the semantics of
 * [`hast-util-to-string`](https://github.com/rehypejs/rehype-minify/tree/main/packages/hast-util-to-string):
 * element-like nodes recurse into their children; text nodes contribute
 * their value; everything else (expression containers, spread children, …)
 * is treated as opaque and yields an empty string.
 *
 * This is intentionally a **best-effort, static** extraction — dynamic
 * expressions cannot be resolved without runtime information.
 *
 * @param node - Any AST node to extract text from.
 * @returns The concatenated text content of all reachable text nodes.
 *
 * @example
 * ```ts
 * // <p>Hello <em>world</em></p>
 * toText(pNode); // -> "Hello world"
 *
 * // <>{name}</>
 * toText(fragmentNode); // -> "" (expression is opaque)
 *
 * // <img alt="photo" />
 * toText(imgNode); // -> ""
 * ```
 */
export function toText(node: TSESTree.Node): string {
  switch (node.type) {
    // --- Leaf text nodes ---------------------------------------------------
    case AST.JSXText:
      return node.value;

    case AST.Literal:
      return typeof node.value === "string" ? node.value : "";

    // --- Container nodes – recurse into children --------------------------
    case AST.JSXElement:
      return childrenToText(node.children);

    case AST.JSXFragment:
      return childrenToText(node.children);

    // --- Everything else is opaque ----------------------------------------
    default:
      return "";
  }
}

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

function childrenToText(children: TSESTree.JSXChild[]): string {
  let result = "";
  for (const child of children) {
    result += toText(child as TSESTree.Node);
  }
  return result;
}
