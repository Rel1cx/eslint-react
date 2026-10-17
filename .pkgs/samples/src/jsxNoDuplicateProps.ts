import type { RuleFunction } from "@eslint-react/kit";

/** Options for {@link jsxNoDuplicateProps}. */
export type JsxNoDuplicatePropsOptions = {
  /** Whether to ignore case when checking for duplicate props. */
  ignoreCase?: boolean;
};

/** Disallow duplicate properties in JSX. */
export function jsxNoDuplicateProps(options: JsxNoDuplicatePropsOptions = {}): RuleFunction {
  const { ignoreCase = false } = options;
  return (context) => ({
    JSXOpeningElement(node) {
      // Track prop names already seen on this element
      const seen = new Set<string>();

      for (const attr of node.attributes) {
        // Guard: only plain attributes with simple names can be duplicates
        if (attr.type !== "JSXAttribute") continue;
        if (attr.name.type !== "JSXIdentifier") continue;

        const name = ignoreCase ? attr.name.name.toLowerCase() : attr.name.name;

        // Report: duplicate prop
        if (seen.has(name)) {
          context.report({
            message: `Duplicate prop "${attr.name.name}" found.`,
            node: attr,
          });
          continue;
        }

        seen.add(name);
      }
    },
  });
}
