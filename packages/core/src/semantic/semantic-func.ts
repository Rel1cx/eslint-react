import type * as ast from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "./semantic-node";

/* eslint-disable perfectionist/sort-interfaces */
/**
 * Represents a semantic function node in the AST
 * This interface extends SemanticNode and provides additional properties for function analysis
 */
export interface SemanticFunc extends SemanticNode {
  /** The identifier of the function */
  id: ast.FunctionID;
  /** The AST node of the function */
  node: ast.TSESTreeFunction;
  /** The name of the function */
  name: string | null;
  /** The return type annotation of the function */
  type: TSESTree.TSTypeAnnotation | null;
  /** The body of the function */
  body: TSESTree.BlockStatement | TSESTree.Expression;
  /** The directives of the function (e.g., "use strict", "use client", "use server", etc.) */
  directives: ast.TSESTreeDirective[];
  /** The parameters of the function */
  parameters: TSESTree.Parameter[];
  /** The type parameters of the function */
  typeParameters: TSESTree.TSTypeParameterDeclaration | null;
}
/* eslint-enable perfectionist/sort-interfaces */
