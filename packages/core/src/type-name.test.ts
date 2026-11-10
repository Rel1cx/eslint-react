import { createTypeTestBed } from "@local/testkit";
import dedent from "dedent";
import { describe, expect, it } from "vitest";

import { getFullyQualifiedNameEx } from "./type-name";

const bed = createTypeTestBed({
  "/global.d.ts": dedent`
    export as namespace preact;
    export interface VNode {}
    export namespace preact { export interface Options {} }
  `,
  "/fixture.ts": dedent`
    interface Props { children: string }
    enum Color { Red }
    declare const p: Props;
    declare const plain: string;
  `,
});

describe("getFullyQualifiedNameEx", () => {
  it("should qualify a property symbol with its interface name", () => {
    const property = bed.getTypeOf("p").getProperty("children");
    if (property == null) throw new Error("No property named 'children' found");
    expect(getFullyQualifiedNameEx(bed.checker, property)).toBe("Props.children");
  });

  it("should qualify an enum member with its enum name", () => {
    expect(getFullyQualifiedNameEx(bed.checker, bed.getSymbolOf("Red"))).toBe("Color.Red");
  });

  it("should prepend the namespace from an 'export as namespace' declaration", () => {
    expect(getFullyQualifiedNameEx(bed.checker, bed.getSymbolOf("VNode"))).toBe("preact.VNode");
  });

  it("should not duplicate the namespace when the name is already qualified by it", () => {
    expect(getFullyQualifiedNameEx(bed.checker, bed.getSymbolOf("Options"))).toBe("preact.Options");
  });

  it("should return a plain declaration name as is", () => {
    expect(getFullyQualifiedNameEx(bed.checker, bed.getSymbolOf("plain"))).toBe("plain");
  });
});
