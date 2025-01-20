import type * as AST from "@eslint-react/ast";
import type { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { ERSemanticNode } from "../semantic-node";
import type { ERComponentHint } from "./component-collector-hint";
import type { ERComponentFlag } from "./component-flag";

/* eslint-disable perfectionist/sort-interfaces */
export interface ERFunctionComponent extends ERSemanticNode {
  id:
    | _
    | TSESTree.Identifier
    | TSESTree.Identifier[];
  kind: "function";
  node: AST.TSESTreeFunction;
  flag: ERComponentFlag;
  hint: ERComponentHint;
  initPath:
    | _
    | AST.FunctionInitPath;
  hookCalls: TSESTree.CallExpression[];
  displayName:
    | _
    | TSESTree.Expression;
}

export interface ERClassComponent extends ERSemanticNode {
  id:
    | _
    | TSESTree.Identifier;
  kind: "class";
  node: AST.TSESTreeClass;
  flag: ERComponentFlag;
  hint: ERComponentHint;
  methods: AST.TSESTreeMethodOrProperty[];
  displayName:
    | _
    | TSESTree.Expression;
}
/* eslint-enable perfectionist/sort-interfaces */

export type ERComponent = ERClassComponent | ERFunctionComponent;
