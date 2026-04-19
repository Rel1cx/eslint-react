import type { RuleFunction } from "@eslint-react/kit";

/** Disallow adjacent inline elements not separated by whitespace. */
export function noAdjacentInlineElements(): RuleFunction {
  /** Set of inline HTML elements. */
  const INLINE_ELEMENTS = new Set([
    "a",
    "abbr",
    "acronym",
    "b",
    "bdi",
    "bdo",
    "big",
    "br",
    "cite",
    "code",
    "dfn",
    "em",
    "i",
    "img",
    "input",
    "kbd",
    "label",
    "map",
    "object",
    "q",
    "samp",
    "script",
    "select",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "textarea",
    "time",
    "tt",
    "var",
  ]);
  return (context) => ({
    JSXElement(node) {
      const children = node.children;

      // ─── Check adjacent pairs ──────────────────────
      for (let i = 0; i < children.length - 1; i++) {
        const current = children[i];
        const next = children[i + 1];

        // › Validate first element
        if (current?.type !== "JSXElement") continue;
        if (current.openingElement.name.type !== "JSXIdentifier") continue;
        const currentName = current.openingElement.name.name;
        if (!INLINE_ELEMENTS.has(currentName)) continue;

        // › Validate second element
        if (next?.type !== "JSXElement") continue;
        if (next.openingElement.name.type !== "JSXIdentifier") continue;
        const nextName = next.openingElement.name.name;
        if (!INLINE_ELEMENTS.has(nextName)) continue;

        // › Report violation
        context.report({
          node: current,
          message: `Adjacent inline elements "${currentName}" and "${nextName}" should be separated by whitespace.`,
        });
      }
    },
  });
}
