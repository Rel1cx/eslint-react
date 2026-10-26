import { runInRule } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { type ImportLookupOptions, createImportLookup } from "./create-import-lookup";

function createLookup(code: string, options: ImportLookupOptions) {
  return runInRule(code, (context) => createImportLookup(context.sourceCode.ast, options));
}

describe("createImportLookup", () => {
  describe("source matching", () => {
    it("should index named imports from the exact source", () => {
      const lookup = createLookup('import { render } from "react-dom";', { source: "react-dom" });

      expect(lookup.all()).toEqual([
        { kind: "named", name: "render", local: "render", specifier: "react-dom" },
      ]);
      expect(lookup.has("render", "render")).toBe(true);
    });

    it("should group subpath imports under their base source", () => {
      const lookup = createLookup('import { flushSync } from "react-dom/client";', { source: "react-dom" });

      expect(lookup.all()).toHaveLength(1);
      expect(lookup.has("flushSync", "flushSync")).toBe(true);
      expect(lookup.binding("flushSync")?.specifier).toBe("react-dom/client");
    });

    it("should match scoped package sources", () => {
      const lookup = createLookup('import { createClient } from "@scope/pkg";', { source: "@scope/pkg" });

      expect(lookup.all()).toEqual([
        { kind: "named", name: "createClient", local: "createClient", specifier: "@scope/pkg" },
      ]);
      expect(lookup.has("createClient", "createClient")).toBe(true);
    });

    it("should match subpaths of a scoped package source", () => {
      const lookup = createLookup('import { createClient } from "@scope/pkg/client";', { source: "@scope/pkg" });

      expect(lookup.all()).toHaveLength(1);
      expect(lookup.binding("createClient")?.specifier).toBe("@scope/pkg/client");
    });

    it("should not match unrelated sources", () => {
      const lookup = createLookup('import { render } from "react-dom-utils";', { source: "react-dom" });

      expect(lookup.all()).toHaveLength(0);
    });

    it("should not match imports from a subpath of a different package", () => {
      const lookup = createLookup('import { render } from "react-dom/server";', { source: "react" });

      expect(lookup.all()).toHaveLength(0);
    });
  });

  describe("import forms", () => {
    it("should index default imports as default bindings", () => {
      const lookup = createLookup('import ReactDOM from "react-dom";', { source: "react-dom" });

      expect(lookup.all()).toEqual([
        { kind: "default", name: "default", local: "ReactDOM", specifier: "react-dom" },
      ]);
      expect(lookup.has("ReactDOM", "default")).toBe(true);
      expect(lookup.has("ReactDOM", "render")).toBe(false);
      expect(lookup.hasDefault("ReactDOM")).toBe(true);
      expect(lookup.isModuleBinding("ReactDOM")).toBe(true);
    });

    it("should index `import { default as X }` as a default binding", () => {
      const lookup = createLookup('import { default as ReactDOM } from "react-dom";', { source: "react-dom" });

      expect(lookup.all()).toEqual([
        { kind: "default", name: "default", local: "ReactDOM", specifier: "react-dom" },
      ]);
      expect(lookup.hasDefault("ReactDOM")).toBe(true);
      expect(lookup.isModuleBinding("ReactDOM")).toBe(true);
      expect(lookup.has("ReactDOM", "default")).toBe(true);
      expect(lookup.bindingsOf("default").map((entry) => entry.local)).toEqual(["ReactDOM"]);
    });

    it("should index namespace imports", () => {
      const lookup = createLookup('import * as ReactDOM from "react-dom";', { source: "react-dom" });

      expect(lookup.all()).toEqual([
        { kind: "namespace", local: "ReactDOM", specifier: "react-dom" },
      ]);
      expect(lookup.has("ReactDOM", "")).toBe(false);
      expect(lookup.hasDefault("ReactDOM")).toBe(false);
      expect(lookup.isModuleBinding("ReactDOM")).toBe(true);
      expect(lookup.bindingsOf("").map((entry) => entry.local)).toEqual(["ReactDOM"]);
    });

    it("should use the alias as the local name", () => {
      const lookup = createLookup('import { flushSync as fs } from "react-dom";', { source: "react-dom" });

      expect(lookup.binding("fs")).toEqual({
        kind: "named",
        name: "flushSync",
        local: "fs",
        specifier: "react-dom",
      });
      expect(lookup.has("fs", "flushSync")).toBe(true);
      expect(lookup.has("fs", "render")).toBe(false);
    });

    it("should pre-register builtin namespaces", () => {
      const lookup = createLookup("", { builtinNamespaces: ["ReactDOM"], source: "react-dom" });

      expect(lookup.all()).toEqual([
        { kind: "namespace", local: "ReactDOM", specifier: "react-dom" },
      ]);
      expect(lookup.isModuleBinding("ReactDOM")).toBe(true);
    });

    it("should ignore side-effect-only imports", () => {
      const lookup = createLookup('import "react-dom";', { source: "react-dom" });

      expect(lookup.all()).toHaveLength(0);
    });
  });

  describe("type-only imports", () => {
    it("should ignore `import type` declarations", () => {
      const lookup = createLookup('import type { ComponentType } from "react-dom";', { source: "react-dom" });

      expect(lookup.all()).toHaveLength(0);
      expect(lookup.has("ComponentType", "ComponentType")).toBe(false);
    });

    it("should ignore inline type specifiers but keep value specifiers", () => {
      const lookup = createLookup('import { type ComponentType, render } from "react-dom";', { source: "react-dom" });

      expect(lookup.all().map((entry) => entry.local)).toEqual(["render"]);
      expect(lookup.binding("ComponentType")).toBeNull();
      expect(lookup.has("render", "render")).toBe(true);
    });
  });

  describe("queries", () => {
    it("should preserve source order", () => {
      const lookup = createLookup(
        [
          'import { render } from "react-dom";',
          'import { hydrate } from "react-dom";',
        ].join("\n"),
        { source: "react-dom" },
      );

      expect(lookup.all().map((entry) => entry.local)).toEqual(["render", "hydrate"]);
    });

    it("should return every binding of an imported export in source order", () => {
      const lookup = createLookup(
        [
          'import { render } from "react-dom";',
          'import { render as render2 } from "react-dom";',
        ].join("\n"),
        { source: "react-dom" },
      );

      expect(lookup.bindingsOf("render").map((entry) => entry.local)).toEqual(["render", "render2"]);
      expect(lookup.bindingsOf("hydrate")).toEqual([]);
    });

    it("should return undefined or false for names that are not imported", () => {
      const lookup = createLookup('import { render } from "react-dom";', { source: "react-dom" });

      expect(lookup.binding("createRoot")).toBeNull();
      expect(lookup.has("createRoot", "createRoot")).toBe(false);
      expect(lookup.hasDefault("createRoot")).toBe(false);
      expect(lookup.isModuleBinding("createRoot")).toBe(false);
    });

    it("should return default imports from bindingsOf('default')", () => {
      const lookup = createLookup(
        [
          'import { render } from "react-dom";',
          'import ReactDOM from "react-dom";',
        ].join("\n"),
        { source: "react-dom" },
      );

      expect(lookup.bindingsOf("default").map((entry) => entry.local)).toEqual(["ReactDOM"]);
    });

    it("should answer queries from a lookup over an empty program", () => {
      const lookup = createLookup("", { source: "react-dom" });

      expect(lookup.all()).toEqual([]);
      expect(lookup.binding("render")).toBeNull();
      expect(lookup.bindingsOf("render")).toEqual([]);
    });
  });
});
