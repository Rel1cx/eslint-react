import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import { JSXValueCheckHint } from "@eslint-react/jsx";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export type ESLRComponentFlag = bigint;

export const ESLRComponentFlag = {
  None: 0n,
  // eslint-disable-next-line perfectionist/sort-objects
  InsideForwardRef: 1n << 1n,
  InsideMemo: 1n << 0n,
};

export type ESLRComponentKind = "class" | "function";

export type ESLRComponentCollectorHint = bigint;

/* eslint-disable perfectionist/sort-objects */
export const ESLRComponentCollectorHint = {
  ...JSXValueCheckHint,
  // 1n << 0n - 1n << 63n are reserved for JSXValueCheckHint
  // Skip function component created by React.memo
  SkipMemo: 1n << 64n,
  // Skip function component created by React.forwardRef
  SkipForwardRef: 1n << 65n,
  // Skip function component defined in map function callback
  SkipMapCallback: 1n << 66n,
  // Skip function component defined on object method
  SkipObjectMethod: 1n << 67n,
  // Skip function component defined on class method
  SkipClassMethod: 1n << 68n,
  // Skip function component defined on class property
  SkipClassProperty: 1n << 69n,
} as const;
/* eslint-enable perfectionist/sort-objects */

export const defaultComponentCollectorHint = ESLRComponentCollectorHint.SkipMemo
  | ESLRComponentCollectorHint.SkipForwardRef
  | ESLRComponentCollectorHint.SkipStringLiteral
  | ESLRComponentCollectorHint.SkipNumberLiteral;

export type ESLRFunctionComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier>;
  kind: "function";
  node: TSESTreeFunction;
  name: O.Option<string>;
  flag: ESLRComponentFlag;
  hint: ESLRComponentCollectorHint;
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
