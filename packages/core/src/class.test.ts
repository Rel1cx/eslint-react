import { parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import { describe, expect, it } from "vitest";

import { getClassId } from "./class";

describe("getClassId", () => {
  it.each([
    ["class Component {}", "Component"],
    ["const Component = class {}", "Component"],
    ["const Component = class Named {}", "Named"],
  ])("should get class id for %s", (code, expectedName) => {
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ClassDeclaration || node.type === AST.ClassExpression) {
          const id = getClassId(node);
          expect(id).not.toBeNull();
          if (id?.type === AST.Identifier) {
            expect(id.name).toBe(expectedName);
          }
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should return null for anonymous class without binding", () => {
    const code = "const arr = [class {}]";
    let found = false;
    simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (node.type === AST.ClassExpression) {
          expect(getClassId(node)).toBeNull();
          found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});
