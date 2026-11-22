import { createTypeTestBed } from "@local/testkit";
import dedent from "dedent";
import { describe, expect, it } from "vitest";

import { getFullyQualifiedName } from "./type-name";

const bed = createTypeTestBed({
  "/global.d.ts": dedent`
    export as namespace preact;
    export interface VNode {}
    export namespace preact { export interface Options {} }
    declare global {
      interface GlobalWindow { __x?: string }
    }
  `,
  "/plain.d.ts": dedent`
    declare global {
      interface GlobalThing {}
    }
    export {};
  `,
  "/fixture.ts": dedent`
    interface Props { children: string }
    enum Color { Red }
    declare const p: Props;
    declare const plain: string;
    const cfg = { deep: { x: 1 } };
    const f = function named(): { y: string } { return { y: "" } };
  `,
});

describe("getFullyQualifiedName", () => {
  it("should qualify a property symbol with its interface name", () => {
    const property = bed.getTypeOf("p").getProperty("children");
    if (property == null) throw new Error("No property named 'children' found");
    expect(getFullyQualifiedName(bed.checker, property)).toBe("Props.children");
  });

  it("should qualify an enum member with its enum name", () => {
    expect(getFullyQualifiedName(bed.checker, bed.getSymbolOf("Red"))).toBe("Color.Red");
  });

  it("should prepend the namespace from an 'export as namespace' declaration", () => {
    expect(getFullyQualifiedName(bed.checker, bed.getSymbolOf("VNode"))).toBe("preact.VNode");
  });

  it("should not duplicate the namespace when the name is already qualified by it", () => {
    expect(getFullyQualifiedName(bed.checker, bed.getSymbolOf("Options"))).toBe("preact.Options");
  });

  it("should not qualify symbols from 'declare global' blocks with the UMD namespace", () => {
    expect(getFullyQualifiedName(bed.checker, bed.getSymbolOf("GlobalWindow"))).toBe("GlobalWindow");
  });

  it("should qualify members of interfaces from 'declare global' blocks without the UMD namespace", () => {
    expect(getFullyQualifiedName(bed.checker, bed.getSymbolOf("__x"))).toBe("GlobalWindow.__x");
  });

  it("should not qualify symbols from 'declare global' blocks in files without a UMD namespace", () => {
    expect(getFullyQualifiedName(bed.checker, bed.getSymbolOf("GlobalThing"))).toBe("GlobalThing");
  });

  it("should qualify object literal members with their variable declaration name", () => {
    expect(getFullyQualifiedName(bed.checker, bed.getSymbolOf("x"))).toBe("cfg.deep.x");
  });

  it("should qualify symbols within named function expressions", () => {
    expect(getFullyQualifiedName(bed.checker, bed.getSymbolOf("y"))).toBe("f.named.y");
  });

  it("should return a plain declaration name as is", () => {
    expect(getFullyQualifiedName(bed.checker, bed.getSymbolOf("plain"))).toBe("plain");
  });
});
