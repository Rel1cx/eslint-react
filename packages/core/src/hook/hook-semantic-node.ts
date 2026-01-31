import type * as ast from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "../semantic";

/* eslint-disable perfectionist/sort-interfaces */
/**
 * Represents a semantic hook node in the AST
 * This interface extends SemanticNode and provides additional properties for React hook analysis
 */
export interface HookSemanticNode extends SemanticNode {
  /** The identifier of the hook */
  id: ast.FunctionID | unit;
  /** The AST node of the hook */
  node: ast.TSESTreeFunction;
  /** The name of the hook */
  name: string;
  /** The other hooks called by the hook */
  hookCalls: TSESTree.CallExpression[];
  /** The directives used in the function (e.g., "use strict", "use client", etc.) */
  directives: TSESTree.StringLiteral[];
}
/* eslint-enable perfectionist/sort-interfaces */
