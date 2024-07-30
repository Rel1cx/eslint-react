import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import type { ERSemanticNode } from "../internal";
import type { ERComponentHint } from "./component-collector-hint";
import type { ERClassComponentFlag, ERFunctionComponentFlag } from "./component-flag";
import type { ERComponentInitPath } from "./component-init-path";

/* eslint-disable perfectionist/sort-interfaces */
export interface ERFunctionComponent extends ERSemanticNode {
  id: O.Option<TSESTree.Identifier | TSESTree.Identifier[]>;
  kind: "function";
  node: TSESTreeFunction;
  flag: ERFunctionComponentFlag;
  hint: ERComponentHint;
  initPath: O.Option<ERComponentInitPath>;
  hookCalls: TSESTree.CallExpression[];
  displayName: O.Option<TSESTree.Expression>;
}

export interface ERClassComponent extends ERSemanticNode {
  id: O.Option<TSESTree.Identifier>;
  kind: "class";
  node: TSESTreeClass;
  flag: ERClassComponentFlag;
  hint: ERComponentHint;
  methods: (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)[];
  displayName: O.Option<TSESTree.Expression>;
}
/* eslint-enable perfectionist/sort-interfaces */

export type ERComponent = ERClassComponent | ERFunctionComponent;
