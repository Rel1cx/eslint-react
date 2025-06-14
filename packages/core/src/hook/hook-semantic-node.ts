import type * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "../semantic";

/* eslint-disable perfectionist/sort-interfaces */
export interface Hook extends SemanticNode {
  // The identifier of the hook
  id: TSESTree.Identifier | unit;
  // The AST node of the hook
  node: AST.TSESTreeFunction;
  // The name of the hook
  name: string;
  // The `HookFlag` of the hook, reserved for future use
  // flag: bigint;
  // The type of the hook, reserved for future use
  // type: number;
  // The number of hooks defined in the hook, reserved for future use
  // size: number;
  // The number of slots the hook takes, (1 + the number of other hooks it calls)
  // cost: number;
  // The other hooks called by the hook
  hookCalls: TSESTree.CallExpression[];
}
/* eslint-enable perfectionist/sort-interfaces */
