import type { RuleFunction } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

/** Tag names of inline HTML elements. */
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

/** Disallow adjacent inline elements not separated by whitespace. */
export function noAdjacentInlineElements(): RuleFunction {
  return (context) => ({
    JSXElement(node) {
      const children = node.children;

      // Check each pair of adjacent children
      for (let i = 0; i < children.length - 1; i++) {
        const currentName = getInlineElementName(children[i]);
        const nextName = getInlineElementName(children[i + 1]);

        // Guard: both neighbors must be inline elements
        if (currentName == null || nextName == null) continue;

        context.report({
          message: `Adjacent inline elements "${currentName}" and "${nextName}" should be separated by whitespace.`,
          node: children[i]!,
        });
      }
    },
  });
}

/**
 * Get the tag name of a JSX child when it is an inline element with a simple identifier name
 * @param child The JSX child to inspect
 * @returns The lowercase tag name, or null when the child is not an inline element
 */
function getInlineElementName(child: TSESTree.JSXElement["children"][number] | undefined) {
  if (child?.type !== "JSXElement") return null;

  const name = child.openingElement.name;
  if (name.type !== "JSXIdentifier") return null;

  return INLINE_ELEMENTS.has(name.name) ? name.name : null;
}
