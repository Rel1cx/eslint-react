import type * as AST from "@eslint-react/ast";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import type { ERSemanticNode } from "../internal";
import type { ERComponentHint } from "./component-collector-hint";
import type { ERClassComponentFlag, ERFunctionComponentFlag } from "./component-flag";

/* eslint-disable perfectionist/sort-interfaces */
export interface ERFunctionComponent extends ERSemanticNode {
  id: O.Option<TSESTree.Identifier | TSESTree.Identifier[]>;
  kind: "function";
  node: AST.TSESTreeFunction;
  flag: ERFunctionComponentFlag;
  hint: ERComponentHint;
  initPath: O.Option<AST.FunctionInitPath>;
  hookCalls: TSESTree.CallExpression[];
  displayName: O.Option<TSESTree.Expression>;
}

export interface ERClassComponent extends ERSemanticNode {
  id: O.Option<TSESTree.Identifier>;
  kind: "class";
  node: AST.TSESTreeClass;
  flag: ERClassComponentFlag;
  hint: ERComponentHint;
  methods: (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)[];
  displayName: O.Option<TSESTree.Expression>;
}
/* eslint-enable perfectionist/sort-interfaces */

export type ERComponent = ERClassComponent | ERFunctionComponent;
