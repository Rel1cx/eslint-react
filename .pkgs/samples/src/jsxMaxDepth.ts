import type { RuleFunction } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

/** Options for {@link jsxMaxDepth}. */
export type JsxMaxDepthOptions = {
  /** Maximum allowed depth for JSX elements. */
  max: number;
};

/** Enforce JSX maximum depth. */
export function jsxMaxDepth(options: JsxMaxDepthOptions): RuleFunction {
  const { max } = options;
  return (context) => ({
    JSXElement(node) {
      const depth = getJsxDepth(node);

      // Guard: only report elements nested deeper than the limit
      if (depth <= max) return;

      context.report({
        message: `JSX element exceeds maximum depth of ${max} (found ${depth}).`,
        node,
      });
    },
  });
}

/**
 * Count the number of JSX element ancestors of the given node
 * @param node The JSX element to measure from
 * @returns The number of enclosing JSX elements
 */
function getJsxDepth(node: TSESTree.JSXElement) {
  let depth = 0;
  let parent: typeof node.parent | null | undefined = node.parent;

  while (parent != null) {
    if (parent.type === "JSXElement") {
      depth++;
    }
    parent = parent.parent;
  }

  return depth;
}
