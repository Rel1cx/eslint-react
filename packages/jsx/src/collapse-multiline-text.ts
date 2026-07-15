/**
 * Collapse a multiline JSX text string following React's whitespace rules.
 *
 * This mirrors Babel's `cleanJSXElementLiteralChild` algorithm:
 * 1. Split the raw text into lines.
 * 2. Find the last non-empty line.
 * 3. Trim leading spaces on non-first lines and trailing spaces on non-last lines.
 * 4. Collapse tabs into spaces.
 * 5. Append a single space after each non-last non-empty line.
 * @param text The raw JSX text string to collapse.
 * @returns The collapsed string, or `null` if the text contains only whitespace.
 * @see https://github.com/babel/babel/blob/main/packages/babel-types/src/utils/react/cleanJSXElementLiteralChild.ts
 */
export function collapseMultilineText(text: string): string | null {
  const lines = text.split(/\r\n|\n|\r/);

  let lastNonEmptyLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/[^ \t]/.exec(lines[i] ?? "") != null) {
      lastNonEmptyLine = i;
    }
  }

  let str = "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? "";

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

  return str === "" ? null : str;
}
