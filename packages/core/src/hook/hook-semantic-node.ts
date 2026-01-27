import type * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "../semantic";

/* eslint-disable perfectionist/sort-interfaces */
export interface HookSemanticNode extends SemanticNode {
  // The identifier of the hook
  id: AST.FunctionID | unit;
  // The AST node of the hook
  node: AST.TSESTreeFunction;
  // The name of the hook
  name: string;
  // The other hooks called by the hook
  hookCalls: TSESTree.CallExpression[];
}
/* eslint-enable perfectionist/sort-interfaces */
