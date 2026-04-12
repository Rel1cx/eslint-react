import type * as ast from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import type { FunctionID } from "./function";

/**
 * Represents a semantic node in the AST
 * This is the base interface for all semantic nodes in the React semantic analysis
 */
export interface SemanticNode {
  /** The identifier of the node */
  id: null | TSESTree.Node;
  /** The unique key of the node */
  key: string;
  /** The kind of the node */
  kind: string;
  /** The name of the node */
  name: null | string;
  /** The flag of the node */
  flag: bigint;
  /** The hint of the node */
  hint: bigint;
  /** The AST node */
  node: TSESTree.Node;
}

/* eslint-disable perfectionist/sort-interfaces */
/**
 * Represents a semantic function node in the AST
 * This interface extends SemanticNode and provides additional properties for function analysis
 */
export interface SemanticFunc extends SemanticNode {
  /** The identifier of the function */
  id: FunctionID;
  /** The AST node of the function */
  node: ast.TSESTreeFunction;
  /** The name of the function */
  name: string | null;
  /** The return type annotation of the function */
  type: TSESTree.TSTypeAnnotation | null;
  /** The body of the function */
  body: TSESTree.BlockStatement | TSESTree.Expression;
  /** The directives of the function (ex: "use strict", "use client", "use server", etc.) */
  directives: ast.TSESTreeDirective[];
  /** The parameters of the function */
  parameters: TSESTree.Parameter[];
  /** The type parameters of the function */
  typeParameters: TSESTree.TSTypeParameterDeclaration | null;
}
/* eslint-enable perfectionist/sort-interfaces */
