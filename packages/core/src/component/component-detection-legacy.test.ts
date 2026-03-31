/// <reference types="node" />

import { parseForESLint } from "@typescript-eslint/parser";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import { simpleTraverse } from "@typescript-eslint/typescript-estree";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getFixturesRootDir } from "../../../../test";
import { isClassComponent, isRenderMethodLike, isThisSetStateCall } from "./component-detection-legacy";

function parse(code: string) {
  return parseForESLint(code, {
    disallowAutomaticSingleRunInference: true,
    filePath: path.join(getFixturesRootDir(), "estree.tsx"),
    sourceType: "module",
  });
}

describe("isRenderMethodLike", () => {
  it("should detect render method in ClassDeclaration", () => {
    const code = `class Foo extends Component { renderHeader() { return null; } }`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.MethodDefinition || node.type === AST.PropertyDefinition) {
          if (isRenderMethodLike(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should detect render method in ClassExpression", () => {
    const code = `const Foo = class extends Component { renderHeader() { return null; } };`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.MethodDefinition || node.type === AST.PropertyDefinition) {
          if (isRenderMethodLike(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should NOT detect non-render method as render-method-like", () => {
    const code = `class Foo extends Component { getData() { return null; } }`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.MethodDefinition || node.type === AST.PropertyDefinition) {
          if (isRenderMethodLike(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(false);
  });
});

describe("isClassComponent (without context)", () => {
  it("should detect class extending Component", () => {
    const code = `class Foo extends Component {}`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ClassDeclaration) {
          if (isClassComponent(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should detect class extending PureComponent", () => {
    const code = `class Foo extends PureComponent {}`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ClassDeclaration) {
          if (isClassComponent(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should detect class extending React.Component", () => {
    const code = `class Foo extends React.Component {}`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ClassDeclaration) {
          if (isClassComponent(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should detect class extending React.PureComponent", () => {
    const code = `class Foo extends React.PureComponent {}`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ClassDeclaration) {
          if (isClassComponent(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should NOT detect class extending SomeOtherClass", () => {
    const code = `class Foo extends SomeOtherClass {}`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ClassDeclaration) {
          if (isClassComponent(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(false);
  });

  it("should NOT detect class without superclass", () => {
    const code = `class Foo {}`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ClassDeclaration) {
          if (isClassComponent(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(false);
  });

  it("should detect ClassExpression extending Component", () => {
    const code = `const Foo = class extends Component {};`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.ClassExpression) {
          if (isClassComponent(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });
});

describe("isThisSetStateCall", () => {
  it("should detect this.setState() call", () => {
    const code = `this.setState({})`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          if (isThisSetStateCall(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(true);
  });

  it("should NOT detect this.foo() as setState call", () => {
    const code = `this.foo({})`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          if (isThisSetStateCall(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(false);
  });

  it("should NOT detect something.setState() when callee object is not this", () => {
    const code = `something.setState({})`;
    let found = false;
    simpleTraverse(parse(code).ast, {
      enter(node) {
        if (node.type === AST.CallExpression) {
          if (isThisSetStateCall(node)) found = true;
        }
      },
    }, true);
    expect(found).toBe(false);
  });
});
