import type * as AST from "@eslint-react/ast";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import type { ERSemanticNode } from "../semantic-node";

/* eslint-disable perfectionist/sort-interfaces */
export interface ERHook extends ERSemanticNode {
  // The identifier of the hook
  id: O.Some<TSESTree.Identifier>;
  // The AST node of the hook
  node: AST.TSESTreeFunction;
  // The name of the hook
  name: O.Some<string>;
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
