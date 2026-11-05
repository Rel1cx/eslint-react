import { runCollector } from "@local/testkit";
import { describe, expect, it } from "vitest";

import { createFactCollector } from "./collect";

function collectUsages(code: string) {
  return runCollector(
    code,
    () => {
      const collector = createFactCollector();
      return { api: collector.facts, visitor: collector.visitor };
    },
    (facts) => facts.componentUsages.map(({ name, node }) => ({ name, text: code.slice(node.range[0], node.range[1]) })),
  );
}

function collectUsageNames(code: string) {
  return collectUsages(code).map(({ name }) => name);
}

describe("createFactCollector", () => {
  it("collects a capitalized JSX identifier tag", () => {
    expect(collectUsageNames("<Foo />;")).toEqual(["Foo"]);
  });

  it("points each usage node at the opening element's tag identifier", () => {
    expect(collectUsages("<Foo attr={1} />;")).toEqual([{ name: "Foo", text: "Foo" }]);
  });

  it("collects each usage in traversal order, including repeats", () => {
    expect(collectUsageNames("<><A /><B /><A /></>;")).toEqual(["A", "B", "A"]);
  });

  it("collects tags nested in attributes and children", () => {
    expect(collectUsageNames("<Layout header={<Header />}><Content /></Layout>;")).toEqual(["Layout", "Header", "Content"]);
  });

  it("collects the tag of a paired opening element only once", () => {
    expect(collectUsageNames("<Foo></Foo>;")).toEqual(["Foo"]);
  });

  it("ignores lowercase intrinsic element tags", () => {
    expect(collectUsageNames("<div><span /></div>;")).toEqual([]);
  });

  it("ignores tags whose name does not start with an uppercase letter", () => {
    expect(collectUsageNames("<_Foo />;")).toEqual([]);
  });

  it("ignores JSX member expression tags", () => {
    expect(collectUsageNames("<Foo.Bar />;")).toEqual([]);
  });

  it("ignores JSX namespaced name tags", () => {
    expect(collectUsageNames("<svg:Foo />;")).toEqual([]);
  });

  it("ignores JSX expression containers and text", () => {
    expect(collectUsageNames("<div>{Foo}</div>;")).toEqual([]);
  });
});
