import type * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "../semantic";

/* eslint-disable perfectionist/sort-interfaces */
export interface ReactFunction extends SemanticNode {
  // The identifier of the function
  id: AST.FunctionID | unit;
  // The AST node of the function
  node: AST.TSESTreeFunction;
  // The name of the function
  name: string | unit;
  // The return type of the function
  type: TSESTree.TSTypeAnnotation | unit;
  // The body of the function
  body: TSESTree.BlockStatement | TSESTree.Expression;
  // The directives of the function (e.g., "use strict", "use client", "use server", etc.)
  directives: TSESTree.StringLiteral[];
  // The parameters of the function
  parameters: TSESTree.Parameter[];
  // The type parameters of the function
  typeParameters: TSESTree.TSTypeParameterDeclaration | unit;
}
/* eslint-enable perfectionist/sort-interfaces */
