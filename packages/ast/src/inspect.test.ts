import { inspect } from "node:util";
import { describe, expect, it } from "vitest";

import { BaseProto, Class, NodeInspectSymbol, toJson, toStringUnknown } from "./inspect";

class Result extends Class {
  readonly tag: "Success" | "Failure";
  readonly value: unknown;

  constructor(tag: "Success" | "Failure", value: unknown) {
    super();
    this.tag = tag;
    this.value = value;
  }

  toJSON() {
    return { _tag: this.tag, value: this.value };
  }
}

describe("Inspectable", () => {
  it("NodeInspectSymbol is the well-known Node.js inspection symbol", () => {
    const obj = {
      [NodeInspectSymbol]() {
        return "custom";
      },
    };
    expect(inspect(obj)).toBe("custom");
  });

  it("Class delegates toString and Node inspection to toJSON", () => {
    const success = new Result("Success", 42);
    expect(success.toString()).toBe(`{"_tag":"Success","value":42}`);
    expect(success[NodeInspectSymbol]()).toEqual({ _tag: "Success", value: 42 });
    expect(inspect(success)).toContain("Success");
  });

  it("toJson returns plain values unchanged and unwraps toJSON", () => {
    expect(toJson(1)).toBe(1);
    expect(toJson({ a: 1 })).toEqual({ a: 1 });
    expect(toJson(new Result("Failure", "boom"))).toEqual({ _tag: "Failure", value: "boom" });
    expect(toJson([new Result("Success", 1)])).toEqual([{ _tag: "Success", value: 1 }]);
  });

  it("toJson recovers when toJSON throws", () => {
    const bad = {
      toJSON() {
        throw new Error("nope");
      },
    };
    expect(toJson(bad)).toBe("[toJSON threw]");
  });

  it("toStringUnknown keeps strings and formats objects as JSON", () => {
    expect(toStringUnknown("hi")).toBe("hi");
    expect(toStringUnknown({ a: 1 }, 0)).toBe(`{"a":1}`);
    expect(toStringUnknown(1)).toBe("1");
  });

  it("toStringUnknown handles circular references", () => {
    const obj: Record<string, unknown> = { name: "loop" };
    obj["self"] = obj;
    expect(toStringUnknown(obj, 0)).toBe(`{"name":"loop"}`);
  });

  it("BaseProto provides toString and Node inspection to objects with their own toJSON", () => {
    const obj = Object.create(BaseProto);
    obj.toJSON = () => ({ name: "example", value: 42 });
    expect(obj.toString()).toBe(`{"name":"example","value":42}`);
    expect(inspect(obj)).toContain("example");
  });

  it("BaseProto.toJSON alone recurses and degrades to a diagnostic placeholder", () => {
    // Matches upstream behavior: toJson(this) re-discovers the inherited toJSON
    // and recurses until the guarded catch returns "[toJSON threw]".
    const obj = Object.create(BaseProto);
    expect(obj.toString()).toBe(`"[toJSON threw]"`);
  });
});
