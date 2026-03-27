import type { RuleDefinition } from "@eslint-react/kit";

/** Options for {@link forbidComponentProps}. */
export type ForbidComponentPropsOptions = {
  /** Prop names that are not allowed on React components. */
  forbidden: string[];
};

/** Forbid certain props on React components (not DOM elements). */
export function forbidComponentProps({ forbidden }: ForbidComponentPropsOptions): RuleDefinition {
  return (context) => ({
    JSXAttribute(node) {
      const propName = node.name.type === "JSXIdentifier" ? node.name.name : null;
      if (propName == null || !forbidden.includes(propName)) return;
      const parent = node.parent;
      if (parent?.type !== "JSXOpeningElement") return;
      const elemName = parent.name.type === "JSXIdentifier" ? parent.name.name : null;
      // Only report on components (PascalCase names), not DOM elements
      if (elemName == null || elemName[0] !== elemName[0]?.toUpperCase()) return;
      context.report({
        node,
        message: `Prop "${propName}" is forbidden on components.`,
      });
    },
  });
}
