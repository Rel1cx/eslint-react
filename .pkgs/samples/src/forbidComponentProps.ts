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
      // › Extract prop name
      const propName = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (propName == null || !forbidden.includes(propName)) return;

      // › Verify context is JSX opening element
      const parent = node.parent;
      if (parent?.type !== "JSXOpeningElement") return;

      // › Extract element name
      const elemName = parent.name.type === "JSXIdentifier" ? parent.name.name : null;

      // › Guard: only check components (PascalCase), not DOM elements
      if (elemName == null || elemName[0] !== elemName[0]?.toUpperCase()) return;

      context.report({
        node,
        message: `Prop "${propName}" is forbidden on components.`,
      });
    },
  });
}
