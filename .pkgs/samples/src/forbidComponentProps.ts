import type { RuleFunction } from "@eslint-react/kit";

/** Options for {@link forbidComponentProps}. */
export type ForbidComponentPropsOptions = {
  /** Prop names that are not allowed on React components. */
  forbidden: string[];
};

/** Forbid certain props on React components (not DOM elements). */
export function forbidComponentProps(options: ForbidComponentPropsOptions): RuleFunction {
  const { forbidden } = options;
  return (context) => ({
    JSXAttribute(node) {
      // Extract prop name
      const propName = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (propName == null || !forbidden.includes(propName)) return;

      // Extract element name
      const elemName = node.parent.name.type === "JSXIdentifier" ? node.parent.name.name : null;

      // Guard: only check components (PascalCase), not DOM elements
      if (elemName == null || elemName[0] !== elemName[0]?.toUpperCase()) return;

      context.report({
        message: `Prop "${propName}" is forbidden on components.`,
        node,
      });
    },
  });
}
