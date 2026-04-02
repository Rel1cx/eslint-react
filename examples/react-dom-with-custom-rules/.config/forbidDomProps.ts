import type { RuleFunction } from "@eslint-react/kit";

/** Options for {@link forbidDomProps}. */
export type ForbidDomPropsOptions = {
  /** Prop names that are not allowed on DOM elements. */
  forbidden: string[];
};

/** Forbid certain props on DOM elements (not React components). */
export function forbidDomProps(options: ForbidDomPropsOptions): RuleFunction {
  const { forbidden } = options;
  return (context) => ({
    JSXAttribute(node) {
      const propName = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (propName == null || !forbidden.includes(propName)) return;
      const parent = node.parent;
      if (parent?.type !== "JSXOpeningElement") return;
      const elemName = parent.name.type === "JSXIdentifier" ? parent.name.name : null;
      // Only report on DOM elements (lowercase names), not components
      if (elemName == null || elemName[0] !== elemName[0]?.toLowerCase()) return;
      context.report({
        node,
        message: `Prop "${propName}" is forbidden on DOM elements.`,
      });
    },
  });
}
