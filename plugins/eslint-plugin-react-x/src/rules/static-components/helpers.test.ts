import tsx from "dedent";

import { collectNodes, getFirstNodeOfType, parseCode } from "@local/testkit";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expect, it } from "vitest";

import { KNOWN_DYNAMIC_EXPRESSION_TYPES, createRenderBoundaryChecker } from "./helpers";

function getDeclarator(root: TSESTree.Node, name: string) {
  const declarator = collectNodes<TSESTree.VariableDeclarator>(root, AST.VariableDeclarator)
    .find((node) => node.id.type === AST.Identifier && node.id.name === name);
  if (declarator == null) throw new Error(`No variable declarator named "${name}" found`);
  return declarator;
}

describe("KNOWN_DYNAMIC_EXPRESSION_TYPES", () => {
  it("contains exactly the expression kinds that always produce a fresh value", () => {
    expect([...KNOWN_DYNAMIC_EXPRESSION_TYPES].sort()).toEqual(
      [
        AST.ArrowFunctionExpression,
        AST.CallExpression,
        AST.ClassExpression,
        AST.FunctionExpression,
        AST.NewExpression,
      ].sort(),
    );
  });
});

describe("createRenderBoundaryChecker", () => {
  const code = tsx`
    function Component() {
      const inside = 1;
      const run = () => {
        const deep = 2;
      };
      return null;
    }
    function other() {
      const outside = 3;
    }
    const top = 4;
  `;

  function setup() {
    const { ast } = parseCode(code);
    const component = getFirstNodeOfType<TSESTree.FunctionDeclaration>(ast, AST.FunctionDeclaration);
    return { ast, component, isInsideRender: createRenderBoundaryChecker([component]) };
  }

  it("returns true for a node declared directly in the component body", () => {
    const { ast, isInsideRender } = setup();
    expect(isInsideRender(getDeclarator(ast, "inside"))).toBe(true);
  });

  it("returns true for a node nested inside a function within the component", () => {
    const { ast, isInsideRender } = setup();
    expect(isInsideRender(getDeclarator(ast, "deep"))).toBe(true);
  });

  it("returns false for a node inside a function that is not a collected component", () => {
    const { ast, isInsideRender } = setup();
    expect(isInsideRender(getDeclarator(ast, "outside"))).toBe(false);
  });

  it("returns false for a module-scope node", () => {
    const { ast, isInsideRender } = setup();
    expect(isInsideRender(getDeclarator(ast, "top"))).toBe(false);
  });

  it("returns false for the boundary node itself, as only ancestors are examined", () => {
    const { component, isInsideRender } = setup();
    expect(isInsideRender(component)).toBe(false);
  });

  it("returns false for every node when no components were collected", () => {
    const { ast } = setup();
    const isInsideRender = createRenderBoundaryChecker([]);
    expect(isInsideRender(getDeclarator(ast, "inside"))).toBe(false);
  });

  it("treats a collected class component as a boundary", () => {
    const { ast } = parseCode(tsx`
      class Component {
        render() {
          const inside = 1;
        }
      }
    `);
    const component = getFirstNodeOfType<TSESTree.ClassDeclaration>(ast, AST.ClassDeclaration);
    const isInsideRender = createRenderBoundaryChecker([component]);
    expect(isInsideRender(getDeclarator(ast, "inside"))).toBe(true);
    expect(isInsideRender(component)).toBe(false);
  });
});
