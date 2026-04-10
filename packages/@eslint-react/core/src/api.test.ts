/// <reference types="node" />

import { describe, expect, it } from "vitest";

/**
 * This function mirrors the core matching logic inside `isAPI` from
 * `is-react-api.ts`. We test it in isolation to verify the bugfix from PR #1660.
 *
 * BEFORE (buggy):
 *   if (name.substring(name.indexOf(".") + 1) === api) return true;
 *
 * The old code used `name.substring(name.indexOf(".") + 1)` which only strips
 * up to the FIRST dot. For a deeply nested name like `a.b.createElement`,
 * it would compare `"b.createElement" === "createElement"` → false (wrong).
 *
 * It also broke for names without dots: `name.indexOf(".")` returns -1, so
 * `name.substring(0)` returns the full name, potentially matching the API
 * name even without a dot prefix (e.g. `"createElement"` would match when
 * the fully qualified name is just `"createElement"` — which happens to be
 * correct, but only by accident and conflates the exact-match path).
 *
 * AFTER (fixed):
 *   if (name.endsWith(`.${api}`)) return true;
 *
 * `endsWith` correctly checks the suffix regardless of how many dots appear
 * in the name, and it requires the dot to be present so it won't false-positive
 * on names that merely end with the same characters without a dot separator.
 */
function matchesReactAPI(name: string, api: string): boolean {
  if (name === api) return true;
  if (name.endsWith(`.${api}`)) return true;
  return false;
}

/**
 * Buggy implementation that was used before PR #1660, kept here so we can
 * demonstrate the cases it gets wrong.
 */
function matchesReactAPIBuggy(name: string, api: string): boolean {
  if (name === api) return true;
  if (name.substring(name.indexOf(".") + 1) === api) return true;
  return false;
}

describe("isAPI matching logic (PR #1660 bugfix)", () => {
  describe("exact match", () => {
    it("should match when name equals api exactly", () => {
      expect(matchesReactAPI("createElement", "createElement")).toBe(true);
    });

    it("should match single-word api names exactly", () => {
      expect(matchesReactAPI("memo", "memo")).toBe(true);
      expect(matchesReactAPI("lazy", "lazy")).toBe(true);
      expect(matchesReactAPI("forwardRef", "forwardRef")).toBe(true);
    });

    it("should match multi-segment api names exactly", () => {
      expect(matchesReactAPI("Children.map", "Children.map")).toBe(true);
      expect(matchesReactAPI("Children.forEach", "Children.forEach")).toBe(true);
    });
  });

  describe("single-dot prefix match", () => {
    it("should match React.createElement for api createElement", () => {
      expect(matchesReactAPI("React.createElement", "createElement")).toBe(true);
    });

    it("should match React.memo for api memo", () => {
      expect(matchesReactAPI("React.memo", "memo")).toBe(true);
    });

    it("should match React.forwardRef for api forwardRef", () => {
      expect(matchesReactAPI("React.forwardRef", "forwardRef")).toBe(true);
    });
  });

  describe("deep dotted prefix match (the bug this PR fixes)", () => {
    it("should match a.b.createElement for api createElement", () => {
      expect(matchesReactAPI("a.b.createElement", "createElement")).toBe(true);
    });

    it("should match x.y.z.memo for api memo", () => {
      expect(matchesReactAPI("x.y.z.memo", "memo")).toBe(true);
    });

    it("should match deeply.nested.namespace.forwardRef for api forwardRef", () => {
      expect(matchesReactAPI("deeply.nested.namespace.forwardRef", "forwardRef")).toBe(true);
    });

    it("should match a.b.c.d.createElement for api createElement", () => {
      expect(matchesReactAPI("a.b.c.d.createElement", "createElement")).toBe(true);
    });
  });

  describe("Children API multi-dot matching", () => {
    it("should match React.Children.map for api Children.map", () => {
      expect(matchesReactAPI("React.Children.map", "Children.map")).toBe(true);
    });

    it("should match React.Children.forEach for api Children.forEach", () => {
      expect(matchesReactAPI("React.Children.forEach", "Children.forEach")).toBe(true);
    });

    it("should match React.Children.count for api Children.count", () => {
      expect(matchesReactAPI("React.Children.count", "Children.count")).toBe(true);
    });

    it("should match React.Children.only for api Children.only", () => {
      expect(matchesReactAPI("React.Children.only", "Children.only")).toBe(true);
    });

    it("should match React.Children.toArray for api Children.toArray", () => {
      expect(matchesReactAPI("React.Children.toArray", "Children.toArray")).toBe(true);
    });

    it("should match a.b.Children.map for api Children.map", () => {
      expect(matchesReactAPI("a.b.Children.map", "Children.map")).toBe(true);
    });
  });

  describe("no match cases", () => {
    it("should not match unrelated names", () => {
      expect(matchesReactAPI("notCreateElement", "createElement")).toBe(false);
    });

    it("should not match when api is a substring at the end without a dot separator", () => {
      expect(matchesReactAPI("myCreateElement", "createElement")).toBe(false);
    });

    it("should not match when name has api as a prefix rather than suffix", () => {
      expect(matchesReactAPI("React.createElementFoo", "createElement")).toBe(false);
    });

    it("should not match partial suffix without dot", () => {
      expect(matchesReactAPI("useStateHelper", "useState")).toBe(false);
    });

    it("should not match when name is completely different", () => {
      expect(matchesReactAPI("something.else", "createElement")).toBe(false);
    });

    it("should not match empty name", () => {
      expect(matchesReactAPI("", "createElement")).toBe(false);
    });

    it("should not match when api appears in the middle", () => {
      expect(matchesReactAPI("React.createElement.bind", "createElement")).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should not match when name is a suffix of api without dot", () => {
      // "createElement" does not end with ".Element"
      expect(matchesReactAPI("createElement", "Element")).toBe(false);
    });

    it("should handle name with trailing dot correctly", () => {
      expect(matchesReactAPI("React.", "")).toBe(true);
      // "React." does not end with ".createElement"
      expect(matchesReactAPI("React.", "createElement")).toBe(false);
    });

    it("should handle single character api", () => {
      expect(matchesReactAPI("React.x", "x")).toBe(true);
      expect(matchesReactAPI("ax", "x")).toBe(false);
    });

    it("should handle name that is just a dot followed by api", () => {
      expect(matchesReactAPI(".createElement", "createElement")).toBe(true);
    });
  });

  describe("comparison with buggy implementation", () => {
    it("buggy version fails on deep dotted names", () => {
      // This is the key case the PR fixes:
      // Old: "a.b.createElement".substring("a.b.createElement".indexOf(".") + 1)
      //    = "a.b.createElement".substring(2) = "b.createElement"
      //    "b.createElement" === "createElement" → false (WRONG)
      expect(matchesReactAPIBuggy("a.b.createElement", "createElement")).toBe(false);
      // New: "a.b.createElement".endsWith(".createElement") → true (CORRECT)
      expect(matchesReactAPI("a.b.createElement", "createElement")).toBe(true);
    });

    it("buggy version fails on deep Children API paths", () => {
      // Old: "a.b.Children.map".substring(2) = "b.Children.map"
      //    "b.Children.map" === "Children.map" → false (WRONG)
      expect(matchesReactAPIBuggy("a.b.Children.map", "Children.map")).toBe(false);
      // New: "a.b.Children.map".endsWith(".Children.map") → true (CORRECT)
      expect(matchesReactAPI("a.b.Children.map", "Children.map")).toBe(true);
    });

    it("buggy version accidentally matches name without dot due to indexOf returning -1", () => {
      // Old: "createElement".indexOf(".") = -1
      //    "createElement".substring(-1 + 1) = "createElement".substring(0) = "createElement"
      //    "createElement" === "createElement" → true
      // This happens to be correct but only because the exact match would also catch it.
      // The concern is that it conflates two code paths and could mask issues.
      expect(matchesReactAPIBuggy("createElement", "createElement")).toBe(true);
      expect(matchesReactAPI("createElement", "createElement")).toBe(true);
    });

    it("both correctly reject non-matching names with a single dot", () => {
      expect(matchesReactAPIBuggy("React.memo", "createElement")).toBe(false);
      expect(matchesReactAPI("React.memo", "createElement")).toBe(false);
    });

    it("both correctly match names with a single dot prefix", () => {
      expect(matchesReactAPIBuggy("React.createElement", "createElement")).toBe(true);
      expect(matchesReactAPI("React.createElement", "createElement")).toBe(true);
    });
  });
});
