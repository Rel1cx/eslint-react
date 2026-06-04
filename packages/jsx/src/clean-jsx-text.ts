import type { TSESTree } from "@typescript-eslint/types";

/**
 * Clean a `JSXText` node's value following React's whitespace rules.
 *
 * This mirrors Babel's `cleanJSXElementLiteralChild` algorithm:
 * 1. Split the raw text into lines.
 * 2. Find the last non-empty line.
 * 3. Trim leading spaces on non-first lines and trailing spaces on non-last lines.
 * 4. Collapse tabs into spaces.
 * 5. Append a single space after each non-last non-empty line.
 *
 * @param node - The JSXText node to clean.
 * @returns The cleaned string, or `null` if the text contains only whitespace.
 *
 * @see https://github.com/babel/babel/blob/main/packages/babel-types/src/utils/react/cleanJSXElementLiteralChild.ts
 */
export function cleanJSXTextValue(node: TSESTree.JSXText): string | null {
  const lines = node.value.split(/\r\n|\n|\r/);

  let lastNonEmptyLine = 0;
  for (let i = 0; i < lines.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (/[^ \t]/.exec(lines[i]!) != null) {
      lastNonEmptyLine = i;
    }
  }

  let str = "";
  for (let i = 0; i < lines.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const line = lines[i]!;

    const isFirstLine = i === 0;
    const isLastLine = i === lines.length - 1;
    const isLastNonEmptyLine = i === lastNonEmptyLine;

    // Replace rendered whitespace tabs with spaces
    let trimmedLine = line.replace(/\t/g, " ");

    // Trim whitespace touching a newline
    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^ +/, "");
    }
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/ +$/, "");
    }

    if (trimmedLine.length > 0) {
      if (!isLastNonEmptyLine) {
        trimmedLine += " ";
      }
      str += trimmedLine;
    }
  }

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return str || null;
}

/**
 * Check whether a `JSXText` node is padding whitespace that React trims away.
 *
 * Uses {@link cleanJSXTextValue} to precisely determine whether the text
 * contributes any visible characters after React's whitespace normalization.
 *
 * @param node - The JSXText node to check.
 * @returns `true` when the text is purely formatting whitespace.
 */
export function isPaddingWhitespace(node: TSESTree.JSXText): boolean {
  return cleanJSXTextValue(node) == null && node.value.includes("\n");
}
