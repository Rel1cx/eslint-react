import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export type ESLRComponentKind = "class" | "function";

export type ESLRFunctionComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier>;
  kind: "function";
  node: TSESTreeFunction;
  name: O.Option<string>;
  flag: bigint;
  hint: bigint;
  initPath: O.Option<TSESTree.Node[]>;
  displayName: O.Option<string>;
};

export type ESLRClassComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier>;
  kind: "class";
  node: TSESTreeClass;
  name: O.Option<string>;
  displayName: O.Option<string>;
};

export type ESLRComponent = ESLRClassComponent | ESLRFunctionComponent;
