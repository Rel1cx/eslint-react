import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import type { ERComponentCollectorHint } from "./component-collector-hint";
import type { ERClassComponentFlag, ERFunctionComponentFlag } from "./component-flag";
import type { ERComponentInitPath } from "./component-init-path";

export type ERFunctionComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier | TSESTree.Identifier[]>;
  kind: "function";
  node: TSESTreeFunction;
  name: O.Option<string>;
  flag: ERFunctionComponentFlag;
  hint: ERComponentCollectorHint;
  initPath: O.Option<ERComponentInitPath>;
  hookCalls: TSESTree.CallExpression[];
  displayName: O.Option<TSESTree.Expression>;
};

export type ERClassComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier>;
  kind: "class";
  node: TSESTreeClass;
  name: O.Option<string>;
  flag: ERClassComponentFlag;
  methods: (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)[];
  displayName: O.Option<TSESTree.Expression>;
};

export type ERComponent = ERClassComponent | ERFunctionComponent;
