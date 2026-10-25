import { Check, Traverse } from "@eslint-react/ast";
import { getFirstNodeOfType, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { getClassId } from "./class";

describe("getClassId", () => {
  it.each([
    ["class Component {}", "Component"],
    ["const Component = class {}", "Component"],
    ["const Component = class Named {}", "Named"],
  ])("should get class id for %s", (code, expectedName) => {
    let found = false;
    Traverse.simpleTraverse(parseCode(code).ast, {
      enter(node) {
        if (Check.isClass(node)) {
          const id = getClassId(node);
          expect(id).not.toBeNull();
          if (id?.type === AST.Identifier) {
            expect(id.name).toBe(expectedName);
          }
          found = true;
        }
      },
      setParentPointers: true,
    });
    expect(found).toBe(true);
  });

  it("should return null for anonymous class without binding", () => {
    const code = "const arr = [class {}]";
    const node = getFirstNodeOfType<TSESTree.ClassExpression>(code, AST.ClassExpression);
    expect(getClassId(node)).toBeNull();
  });

  it("should return the destructuring pattern for a class assigned via destructuring", () => {
    const node = getFirstNodeOfType<TSESTree.ClassExpression>("const { x } = class {}", AST.ClassExpression);
    expect(getClassId(node)?.type).toBe(AST.ObjectPattern);
  });

  it("should return null for an anonymous default-exported class", () => {
    const node = getFirstNodeOfType<TSESTree.ClassDeclaration>("export default class {}", AST.ClassDeclaration);
    expect(getClassId(node)).toBeNull();
  });
});
