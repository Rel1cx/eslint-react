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

function getJsxDepth({ parent }: TSESTree.Node) {
  let depth = 0;

  while (parent != null && parent.type !== "Program") {
    if (parent.type === "JSXElement") {
      depth++;
    }
    parent = parent.parent;
  }

  return depth;
}
