import { xhtmlEntities } from "./xhtml-entities";

/**
 * Unescape the text content of string literals, e.g. &amp; -> &
 * @param text The escaped string literal text.
 * @returns The unescaped string literal text.
 */
export function unescapeStringLiteralText(text: string): string {
  return text.replaceAll(/&(?:#\d+|#x[\da-fA-F]+|[0-9a-zA-Z]+);/g, entity => {
    const item = entity.slice(1, -1);
    // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
    if (item[0] === "#") {
      const codePoint = item[1] === "x"
        ? parseInt(item.slice(2), 16)
        : parseInt(item.slice(1), 10);
      return codePoint > 0x10ffff // RangeError: Invalid code point
        ? entity
        : String.fromCodePoint(codePoint);
    }
    return xhtmlEntities.has(item)
      ? xhtmlEntities.get(item)
      : entity;
  });
}
