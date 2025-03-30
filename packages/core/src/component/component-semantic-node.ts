import type * as AST from "@eslint-react/ast";
import type { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "../semantic-node";
import type { ComponentCollectorHint } from "./component-collector-hint";
import type { ComponentFlag } from "./component-flag";

/* eslint-disable perfectionist/sort-interfaces */
export interface FunctionComponent extends SemanticNode {
  id:
    | _
    | TSESTree.Identifier
    | TSESTree.Identifier[];
  kind: "function";
  node: AST.TSESTreeFunction;
  flag: ComponentFlag;
  hint: ComponentCollectorHint;
  initPath:
    | _
    | AST.FunctionInitPath;
  hookCalls: TSESTree.CallExpression[];
  displayName:
    | _
    | TSESTree.Expression;
}

export interface ClassComponent extends SemanticNode {
  id:
    | _
    | TSESTree.Identifier;
  kind: "class";
  node: AST.TSESTreeClass;
  flag: ComponentFlag;
  hint: ComponentCollectorHint;
  methods: AST.TSESTreeMethodOrProperty[];
  displayName:
    | _
    | TSESTree.Expression;
}
/* eslint-enable perfectionist/sort-interfaces */

export type Component = ClassComponent | FunctionComponent;
