import type * as AST from "@eslint-react/ast";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

import type { SemanticNode } from "../semantic";
import type { ComponentDetectionHint } from "./component-detection-hint";
import type { ComponentFlag } from "./component-flag";

/* eslint-disable perfectionist/sort-interfaces */
export interface FunctionComponent extends SemanticNode {
  id:
    | unit
    | TSESTree.Identifier
    | TSESTree.Identifier[];
  kind: "function";
  node: AST.TSESTreeFunction;
  flag: ComponentFlag;
  hint: ComponentDetectionHint;
  initPath:
    | unit
    | AST.FunctionInitPath;
  hookCalls: TSESTree.CallExpression[];
  displayName:
    | unit
    | TSESTree.Expression;
}

export interface ClassComponent extends SemanticNode {
  id:
    | unit
    | TSESTree.Identifier;
  kind: "class";
  node: AST.TSESTreeClass;
  flag: ComponentFlag;
  hint: ComponentDetectionHint;
  methods: AST.TSESTreeMethodOrProperty[];
  displayName:
    | unit
    | TSESTree.Expression;
}
/* eslint-enable perfectionist/sort-interfaces */

export type Component = ClassComponent | FunctionComponent;
