import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import type { O } from "@eslint-react/tools";

import type { ComponentType } from "./component-type";

export type ERFunctionComponent = {
  node: TSESTreeFunction;
  name: O.Option<string>;
  type: ComponentType;
  hint: bigint;
  displayName: O.Option<string>;
};

export type ERClassComponent = {
  node: TSESTreeClass;
  name: O.Option<string>;
  type: ComponentType;
  hint: bigint;
  displayName: O.Option<string>;
};

export type ERComponent = ERClassComponent | ERFunctionComponent;
