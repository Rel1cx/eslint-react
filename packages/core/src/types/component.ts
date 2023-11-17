import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import type { O } from "@eslint-react/tools";

export type ESLRFunctionComponent = {
  id: string;
  node: TSESTreeFunction;
  name: O.Option<string>;
  type: number;
  hint: bigint;
  displayName: O.Option<string>;
};

export type ESLRClassComponent = {
  id: string;
  node: TSESTreeClass;
  name: O.Option<string>;
  type: number;
  hint: bigint;
  displayName: O.Option<string>;
};

export type ESLRComponent = ESLRClassComponent | ESLRFunctionComponent;
