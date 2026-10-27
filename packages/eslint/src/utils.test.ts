import { describe, expect, it } from "vitest";

import { complete } from "./utils";

describe("complete", () => {
  const defaults = {
    capture: false,
    limit: 10,
    tags: [] as readonly string[],
  };

  it("returns the defaults when no options are supplied", () => {
    expect(complete(undefined, defaults)).toEqual(defaults);
    expect(complete(null, defaults)).toEqual(defaults);
  });

  it("overrides only the supplied properties", () => {
    expect(complete({ limit: 5 }, defaults)).toEqual({ ...defaults, limit: 5 });
  });

  it("treats nullish values as absent", () => {
    const withUndefined: {
      capture?: boolean | undefined;
      limit?: number | undefined;
    } = { capture: undefined, limit: undefined };
    const withNull: {
      capture?: boolean | null;
      limit?: number | null;
    } = { capture: null, limit: null };
    expect(complete(withUndefined, defaults)).toEqual(defaults);
    expect(complete(withNull, defaults)).toEqual(defaults);
  });

  it("preserves falsy values", () => {
    expect(complete({ capture: true, limit: 0 }, defaults)).toEqual({ ...defaults, capture: true, limit: 0 });
  });

  it("does not mutate the supplied options or defaults", () => {
    const options = { capture: true };
    const result = complete(options, defaults);
    expect(result).not.toBe(defaults);
    expect(defaults.capture).toBe(false);
    expect(options).toEqual({ capture: true });
  });
});
