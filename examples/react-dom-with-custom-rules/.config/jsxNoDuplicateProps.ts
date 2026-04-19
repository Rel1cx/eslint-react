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
      const seen = new Map<string, string>();

      // ─── Check each attribute ──────────────────────
      for (const attr of node.attributes) {
        if (attr.type !== "JSXAttribute") continue;
        if (attr.name.type !== "JSXIdentifier") continue;

        const name = ignoreCase ? attr.name.name.toLowerCase() : attr.name.name;

        // › Report duplicate
        if (seen.has(name)) {
          context.report({
            node: attr,
            message: `Duplicate prop "${attr.name.name}" found.`,
          });
        } else {
          seen.set(name, attr.name.name);
        }
      }
    },
  });
}
