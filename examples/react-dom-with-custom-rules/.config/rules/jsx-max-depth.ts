import type { RuleDefinition } from "@eslint-react/kit";

/** Options for {@link jsxMaxDepth}. */
export type JsxMaxDepthOptions = {
  /** Maximum allowed depth for JSX elements. */
  max: number;
};

/** Enforce JSX maximum depth. */
export function jsxMaxDepth({ max }: JsxMaxDepthOptions): RuleDefinition {
  return (context) => ({
    JSXElement(node) {
      let depth = 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parent: any = node.parent;
      while (parent) {
        if (parent.type === "JSXElement") {
          depth++;
        }
        parent = parent.parent;
      }
      if (depth > max) {
        context.report({
          node,
          message: `JSX element exceeds maximum depth of ${max} (found ${depth}).`,
        });
      }
    },
  });
}
