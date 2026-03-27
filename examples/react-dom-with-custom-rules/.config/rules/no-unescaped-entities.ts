import type { RuleDefinition } from "@eslint-react/kit";

/** Options for {@link noUnescapedEntities}. */
export type NoUnescapedEntitiesOptions = {
  /** A map from unescaped character to its HTML entity replacement (e.g. `{ ">": "&gt;" }`). */
  entities: Record<string, string>;
};

/** Disallow unescaped HTML entities in JSX text. */
export function noUnescapedEntities({ entities }: NoUnescapedEntitiesOptions): RuleDefinition {
  const chars = Object.keys(entities).map((c) => c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).join("");
  const pattern = new RegExp(`[${chars}]`, "g");
  return (context) => ({
    JSXText(node) {
      let match;
      pattern.lastIndex = 0;
      while ((match = pattern.exec(node.raw)) != null) {
        context.report({
          node,
          message: `Unescaped entity "${match[0]}". Use "${entities[match[0]]}" instead.`,
        });
      }
    },
  });
}
