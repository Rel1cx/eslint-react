import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";
import { describe, expectTypeOf, it } from "vitest";

import type {
  TSESTreeClass,
  TSESTreeDirective,
  TSESTreeFunction,
  TSESTreeFunctionOrClass,
  TSESTreeJSX,
  TSESTreeJSXAttributeLike,
  TSESTreeJSXElementLike,
  TSESTreeMethodOrPropertyDefinition,
  TSESTreeTypeExpression,
  TSESTreeTypeOrChainExpression,
} from "./tree";

describe("TSESTreeDirective", () => {
  it("should be an ExpressionStatement narrowed to a directive with a string literal expression", () => {
    expectTypeOf<TSESTreeDirective>().toEqualTypeOf<
      TSESTree.ExpressionStatement & {
        directive: string;
        expression: TSESTree.StringLiteral;
      }
    >();
  });

  it("should be assignable to ExpressionStatement, but not vice versa", () => {
    expectTypeOf<TSESTreeDirective>().toMatchTypeOf<TSESTree.ExpressionStatement>();
    expectTypeOf<TSESTree.ExpressionStatement>().not.toMatchTypeOf<TSESTreeDirective>();
  });

  it("should have a required directive string and a StringLiteral expression", () => {
    expectTypeOf<TSESTreeDirective["directive"]>().toEqualTypeOf<string>();
    expectTypeOf<TSESTreeDirective["expression"]>().toMatchTypeOf<TSESTree.StringLiteral>();
    expectTypeOf<TSESTree.StringLiteral>().toMatchTypeOf<TSESTreeDirective["expression"]>();
  });
});

describe("TSESTreeClass", () => {
  it("should be the union of ClassDeclaration and ClassExpression", () => {
    expectTypeOf<TSESTreeClass>().toEqualTypeOf<TSESTree.ClassDeclaration | TSESTree.ClassExpression>();
  });

  it("should only cover the class node types", () => {
    expectTypeOf<TSESTreeClass["type"]>().toEqualTypeOf<AST.ClassDeclaration | AST.ClassExpression>();
  });

  it("should not include function-like nodes", () => {
    expectTypeOf<TSESTree.FunctionDeclaration>().not.toMatchTypeOf<TSESTreeClass>();
  });
});

describe("TSESTreeFunction", () => {
  it("should be the union of the three function-like node types", () => {
    expectTypeOf<TSESTreeFunction>().toEqualTypeOf<
      | TSESTree.ArrowFunctionExpression
      | TSESTree.FunctionDeclaration
      | TSESTree.FunctionExpression
    >();
  });

  it("should only cover the function node types", () => {
    expectTypeOf<TSESTreeFunction["type"]>().toEqualTypeOf<
      | AST.ArrowFunctionExpression
      | AST.FunctionDeclaration
      | AST.FunctionExpression
    >();
  });

  it("should not include class-like nodes", () => {
    expectTypeOf<TSESTree.ClassExpression>().not.toMatchTypeOf<TSESTreeFunction>();
  });
});

describe("TSESTreeFunctionOrClass", () => {
  it("should be the union of TSESTreeFunction and TSESTreeClass", () => {
    expectTypeOf<TSESTreeFunctionOrClass>().toEqualTypeOf<TSESTreeFunction | TSESTreeClass>();
  });

  it("should include both function-like and class-like nodes", () => {
    expectTypeOf<TSESTree.ArrowFunctionExpression>().toMatchTypeOf<TSESTreeFunctionOrClass>();
    expectTypeOf<TSESTree.ClassDeclaration>().toMatchTypeOf<TSESTreeFunctionOrClass>();
  });

  it("should not include other expression nodes", () => {
    expectTypeOf<TSESTree.CallExpression>().not.toMatchTypeOf<TSESTreeFunctionOrClass>();
  });
});

describe("TSESTreeMethodOrPropertyDefinition", () => {
  it("should be the union of MethodDefinition and PropertyDefinition", () => {
    expectTypeOf<TSESTreeMethodOrPropertyDefinition>().toEqualTypeOf<
      TSESTree.MethodDefinition | TSESTree.PropertyDefinition
    >();
  });

  it("should only cover the non-abstract, non-accessor member definition node types", () => {
    expectTypeOf<TSESTreeMethodOrPropertyDefinition["type"]>().toEqualTypeOf<
      AST.MethodDefinition | AST.PropertyDefinition
    >();
  });

  it("should not include abstract or accessor member definitions", () => {
    expectTypeOf<TSESTree.TSAbstractMethodDefinition>().not.toMatchTypeOf<TSESTreeMethodOrPropertyDefinition>();
    expectTypeOf<TSESTree.TSAbstractPropertyDefinition>().not.toMatchTypeOf<TSESTreeMethodOrPropertyDefinition>();
    expectTypeOf<TSESTree.AccessorProperty>().not.toMatchTypeOf<TSESTreeMethodOrPropertyDefinition>();
  });
});

describe("TSESTreeJSX", () => {
  it("should cover exactly the JSX node types", () => {
    expectTypeOf<TSESTreeJSX["type"]>().toEqualTypeOf<
      | AST.JSXAttribute
      | AST.JSXClosingElement
      | AST.JSXClosingFragment
      | AST.JSXElement
      | AST.JSXEmptyExpression
      | AST.JSXExpressionContainer
      | AST.JSXFragment
      | AST.JSXIdentifier
      | AST.JSXMemberExpression
      | AST.JSXNamespacedName
      | AST.JSXOpeningElement
      | AST.JSXOpeningFragment
      | AST.JSXSpreadAttribute
      | AST.JSXSpreadChild
      | AST.JSXText
    >();
  });

  it("should include JSX elements and attributes", () => {
    expectTypeOf<TSESTree.JSXElement>().toMatchTypeOf<TSESTreeJSX>();
    expectTypeOf<TSESTree.JSXAttribute>().toMatchTypeOf<TSESTreeJSX>();
  });

  it("should not include non-JSX nodes", () => {
    expectTypeOf<TSESTree.Identifier>().not.toMatchTypeOf<TSESTreeJSX>();
    expectTypeOf<TSESTree.CallExpression>().not.toMatchTypeOf<TSESTreeJSX>();
  });
});

describe("TSESTreeJSXAttributeLike", () => {
  it("should be the union of JSXAttribute and JSXSpreadAttribute", () => {
    expectTypeOf<TSESTreeJSXAttributeLike>().toEqualTypeOf<TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute>();
  });

  it("should not include other JSX nodes", () => {
    expectTypeOf<TSESTree.JSXElement>().not.toMatchTypeOf<TSESTreeJSXAttributeLike>();
  });
});

describe("TSESTreeJSXElementLike", () => {
  it("should be the union of JSXElement and JSXFragment", () => {
    expectTypeOf<TSESTreeJSXElementLike>().toEqualTypeOf<TSESTree.JSXElement | TSESTree.JSXFragment>();
  });

  it("should not include other JSX nodes", () => {
    expectTypeOf<TSESTree.JSXText>().not.toMatchTypeOf<TSESTreeJSXElementLike>();
  });
});

describe("TSESTreeTypeExpression", () => {
  it("should be the union of the TypeScript type expression node types", () => {
    expectTypeOf<TSESTreeTypeExpression>().toEqualTypeOf<
      | TSESTree.TSAsExpression
      | TSESTree.TSInstantiationExpression
      | TSESTree.TSNonNullExpression
      | TSESTree.TSSatisfiesExpression
      | TSESTree.TSTypeAssertion
    >();
  });

  it("should only cover the TypeScript type expression node types", () => {
    expectTypeOf<TSESTreeTypeExpression["type"]>().toEqualTypeOf<
      | AST.TSAsExpression
      | AST.TSInstantiationExpression
      | AST.TSNonNullExpression
      | AST.TSSatisfiesExpression
      | AST.TSTypeAssertion
    >();
  });

  it("should not include chain expressions", () => {
    expectTypeOf<TSESTree.ChainExpression>().not.toMatchTypeOf<TSESTreeTypeExpression>();
  });
});

describe("TSESTreeTypeOrChainExpression", () => {
  it("should be the union of ChainExpression and TSESTreeTypeExpression", () => {
    expectTypeOf<TSESTreeTypeOrChainExpression>().toEqualTypeOf<TSESTree.ChainExpression | TSESTreeTypeExpression>();
  });

  it("should include both type expressions and chain expressions", () => {
    expectTypeOf<TSESTree.TSAsExpression>().toMatchTypeOf<TSESTreeTypeOrChainExpression>();
    expectTypeOf<TSESTree.ChainExpression>().toMatchTypeOf<TSESTreeTypeOrChainExpression>();
  });

  it("should not include plain expressions", () => {
    expectTypeOf<TSESTree.Identifier>().not.toMatchTypeOf<TSESTreeTypeOrChainExpression>();
  });
});
