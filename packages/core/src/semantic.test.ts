import type { TSESTreeClass, TSESTreeDirective, TSESTreeFunction } from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";
import { describe, expectTypeOf, it } from "vitest";

import type { ClassComponentSemanticNode } from "./class-component";
import type { ClientFunctionSemanticNode, FunctionSemanticNode, ServerFunctionSemanticNode } from "./function";
import type { FunctionComponentSemanticNode } from "./function-component";
import type { HookSemanticNode } from "./hook";
import type { SemanticFunc, SemanticNode } from "./semantic";

describe("SemanticNode", () => {
  it("should have the base semantic node properties", () => {
    expectTypeOf<SemanticNode["id"]>().toEqualTypeOf<null | TSESTree.Node>();
    expectTypeOf<SemanticNode["key"]>().toEqualTypeOf<number>();
    expectTypeOf<SemanticNode["kind"]>().toEqualTypeOf<string>();
    expectTypeOf<SemanticNode["name"]>().toEqualTypeOf<null | string>();
    expectTypeOf<SemanticNode["flag"]>().toEqualTypeOf<bigint>();
    expectTypeOf<SemanticNode["hint"]>().toEqualTypeOf<bigint>();
    expectTypeOf<SemanticNode["node"]>().toEqualTypeOf<TSESTree.Node>();
  });

  it("should be the base type of the hook, component, and class component nodes", () => {
    expectTypeOf<HookSemanticNode>().toMatchTypeOf<SemanticNode>();
    expectTypeOf<FunctionComponentSemanticNode>().toMatchTypeOf<SemanticNode>();
    expectTypeOf<ClassComponentSemanticNode>().toMatchTypeOf<SemanticNode>();
  });

  it("should not be assignable to its subtypes", () => {
    expectTypeOf<SemanticNode>().not.toMatchTypeOf<HookSemanticNode>();
    expectTypeOf<SemanticNode>().not.toMatchTypeOf<FunctionComponentSemanticNode>();
    expectTypeOf<SemanticNode>().not.toMatchTypeOf<ClassComponentSemanticNode>();
  });

  it("should let subtypes narrow kind to a string literal", () => {
    expectTypeOf<HookSemanticNode["kind"]>().toEqualTypeOf<"hook">();
    expectTypeOf<FunctionComponentSemanticNode["kind"]>().toEqualTypeOf<"component">();
    expectTypeOf<ClassComponentSemanticNode["kind"]>().toEqualTypeOf<"class-component">();
  });

  it("should let subtypes narrow node to a specific AST node type", () => {
    expectTypeOf<HookSemanticNode["node"]>().toEqualTypeOf<TSESTreeFunction>();
    expectTypeOf<FunctionComponentSemanticNode["node"]>().toEqualTypeOf<TSESTreeFunction>();
    expectTypeOf<ClassComponentSemanticNode["node"]>().toEqualTypeOf<TSESTreeClass>();
  });
});

describe("SemanticFunc", () => {
  it("should extend SemanticNode", () => {
    expectTypeOf<SemanticFunc>().toMatchTypeOf<SemanticNode>();
    expectTypeOf<SemanticNode>().not.toMatchTypeOf<SemanticFunc>();
  });

  it("should narrow node to a function-like AST node", () => {
    expectTypeOf<SemanticFunc["node"]>().toEqualTypeOf<TSESTreeFunction>();
  });

  it("should have the function analysis properties", () => {
    expectTypeOf<SemanticFunc["type"]>().toEqualTypeOf<null | TSESTree.TSTypeAnnotation>();
    expectTypeOf<SemanticFunc["body"]>().toEqualTypeOf<TSESTree.BlockStatement | TSESTree.Expression>();
    expectTypeOf<SemanticFunc["directives"]>().toEqualTypeOf<TSESTreeDirective[]>();
    expectTypeOf<SemanticFunc["parameters"]>().toEqualTypeOf<TSESTree.Parameter[]>();
    expectTypeOf<SemanticFunc["typeParameters"]>().toEqualTypeOf<null | TSESTree.TSTypeParameterDeclaration>();
  });

  it("should be the base type of the client and server function nodes", () => {
    expectTypeOf<ClientFunctionSemanticNode>().toMatchTypeOf<SemanticFunc>();
    expectTypeOf<ServerFunctionSemanticNode>().toMatchTypeOf<SemanticFunc>();
    expectTypeOf<SemanticFunc>().not.toMatchTypeOf<FunctionSemanticNode>();
  });

  it("should let function subtypes narrow kind to a string literal", () => {
    expectTypeOf<ClientFunctionSemanticNode["kind"]>().toEqualTypeOf<"client-function">();
    expectTypeOf<ServerFunctionSemanticNode["kind"]>().toEqualTypeOf<"server-function">();
  });

  it("should make FunctionSemanticNode the union of client and server function nodes", () => {
    expectTypeOf<FunctionSemanticNode>().toEqualTypeOf<ClientFunctionSemanticNode | ServerFunctionSemanticNode>();
  });

  it("should be structurally compatible with the hook and component node properties", () => {
    expectTypeOf<HookSemanticNode["directives"]>().toEqualTypeOf<SemanticFunc["directives"]>();
    expectTypeOf<HookSemanticNode["node"]>().toEqualTypeOf<SemanticFunc["node"]>();
    expectTypeOf<FunctionComponentSemanticNode["directives"]>().toEqualTypeOf<SemanticFunc["directives"]>();
    expectTypeOf<FunctionComponentSemanticNode["node"]>().toEqualTypeOf<SemanticFunc["node"]>();
  });
});
