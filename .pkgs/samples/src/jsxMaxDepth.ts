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
      let parent: typeof node.parent | null | undefined = node.parent;

      while (parent != null) {
        if (parent.type === "JSXElement") {
          depth++;
        }
        parent = parent.parent;
      }

      // Check depth limit
      if (depth > max) {
        context.report({
          message: `JSX element exceeds maximum depth of ${max} (found ${depth}).`,
          node,
        });
      }
    },
  });
}
