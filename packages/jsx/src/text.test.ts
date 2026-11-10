import { describe, expect, it } from "vitest";

import { collapseMultilineText } from "./text";

describe("collapseMultilineText", () => {
  it("keeps single-line text untouched", () => {
    expect(collapseMultilineText("foo")).toBe("foo");
    expect(collapseMultilineText("  foo  ")).toBe("  foo  ");
  });

  it("collapses multiline text following JSX whitespace rules", () => {
    expect(collapseMultilineText("foo\n  bar")).toBe("foo bar");
    expect(collapseMultilineText("\n  foo\n  bar\n")).toBe("foo bar");
  });

  it("collapses CRLF and CR line breaks", () => {
    expect(collapseMultilineText("foo\r\n  bar")).toBe("foo bar");
    expect(collapseMultilineText("foo\r  bar")).toBe("foo bar");
  });

  it("collapses tabs into spaces", () => {
    expect(collapseMultilineText("\tfoo")).toBe(" foo");
  });

  it("returns null for whitespace-only text", () => {
    expect(collapseMultilineText("\n   \n  ")).toBeNull();
    expect(collapseMultilineText("")).toBeNull();
  });
});
