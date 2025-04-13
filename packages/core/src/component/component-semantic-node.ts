import type * as AST from "@eslint-react/ast";
import type { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "../semantic";
import type { ComponentDetectionHint } from "./component-detection-hint";
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
  hint: ComponentDetectionHint;
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
  hint: ComponentDetectionHint;
  methods: AST.TSESTreeMethodOrProperty[];
  displayName:
    | _
    | TSESTree.Expression;
}
/* eslint-enable perfectionist/sort-interfaces */

export type Component = ClassComponent | FunctionComponent;
