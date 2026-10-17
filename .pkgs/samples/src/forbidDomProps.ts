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
      // Extract prop name
      const propName = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (propName == null || !forbidden.includes(propName)) return;

      // Extract element name
      const elemName = node.parent.name.type === "JSXIdentifier" ? node.parent.name.name : null;

      // Guard: only check DOM elements (lowercase), not components
      if (elemName == null || elemName[0] !== elemName[0]?.toLowerCase()) return;

      context.report({
        message: `Prop "${propName}" is forbidden on DOM elements.`,
        node,
      });
    },
  });
}
