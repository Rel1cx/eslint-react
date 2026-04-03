import type * as ast from "@eslint-react/ast";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "../semantic";

/* eslint-disable perfectionist/sort-interfaces */
/**
 * Represents a semantic hook node in the AST
 * This interface extends SemanticNode and provides additional properties for React hook analysis
 */
export interface HookSemanticNode extends SemanticNode {
  /** The identifier of the hook */
  id: ast.FunctionID;
  /** The AST node of the hook */
  node: ast.TSESTreeFunction;
  /** The kind of hook */
  kind: "hook";
  /** List of expressions returned by the hook */
  rets: TSESTree.ReturnStatement["argument"][];
  /** The other hooks called by the hook */
  hookCalls: TSESTree.CallExpression[];
  /** The directives used in the function (ex: "use strict", "use client", etc.) */
  directives: ast.TSESTreeDirective[];
}
/* eslint-enable perfectionist/sort-interfaces */
