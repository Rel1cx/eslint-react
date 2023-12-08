import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import type { ExRComponentCollectorHint } from "./component-collector-hint";
import type { ExRClassComponentFlag, ExRFunctionComponentFlag } from "./component-flag";
import type { ExRComponentInitPath } from "./component-init-path";

export type ExRFunctionComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier | TSESTree.Identifier[]>;
  kind: "function";
  node: TSESTreeFunction;
  name: O.Option<string>;
  flag: ExRFunctionComponentFlag;
  hint: ExRComponentCollectorHint;
  initPath: O.Option<ExRComponentInitPath>;
  hookCalls: TSESTree.CallExpression[];
  displayName: O.Option<TSESTree.Expression>;
};

export type ExRClassComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier>;
  kind: "class";
  node: TSESTreeClass;
  name: O.Option<string>;
  flag: ExRClassComponentFlag;
  methods: (TSESTree.MethodDefinition | TSESTree.PropertyDefinition)[];
  displayName: O.Option<TSESTree.Expression>;
};

export type ExRComponent = ExRClassComponent | ExRFunctionComponent;
