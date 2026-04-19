import type { RuleFunction } from "@eslint-react/kit";

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
      let depth = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parent: any = node.parent;

      // ─── Walk up the tree ──────────────────────────
      while (parent) {
        if (parent.type === "JSXElement") {
          depth++;
        }
        parent = parent.parent;
      }

      // › Check depth limit
      if (depth > max) {
        context.report({
          node,
          message: `JSX element exceeds maximum depth of ${max} (found ${depth}).`,
        });
      }
    },
  });
}
