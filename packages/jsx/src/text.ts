/**
 * Collapse a JSX text string using Babel's `cleanJSXElementLiteralChild`
 * whitespace rules.
 *
 * 1. Split the input on CRLF, LF, or CR.
 * 2. Track the last line containing a character other than a space or tab,
 *    defaulting to the first line when there is none.
 * 3. Replace each tab with a space.
 * 4. Remove leading spaces from non-first lines and trailing spaces from
 *    non-last physical lines.
 * 5. Append a single space after each line that still has content, except the
 *    last tracked line.
 * @param text The JSX text string to collapse (typically a decoded `JSXText.value`).
 * @returns The collapsed string, or `null` when the collapsed result is empty
 * (for example, for empty input or multiline input containing only spaces, tabs,
 * and line breaks).
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
