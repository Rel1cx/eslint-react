import type { TSESTreeClass, TSESTreeFunction } from "@eslint-react/ast";
import { JSXValueCheckHint } from "@eslint-react/jsx";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export type ExRComponentFlag = bigint;

/* eslint-disable perfectionist/sort-objects */
export const ExRComponentFlag = {
  None: 0n,
  Memo: 1n << 0n,
  ForwardRef: 1n << 1n,
};
/* eslint-enable perfectionist/sort-objects */

export type ExRComponentKind = "class" | "function";

export type ExRComponentCollectorHint = bigint;

/* eslint-disable perfectionist/sort-objects */
/**
 * hints for component collector
 */
export const ExRComponentCollectorHint = {
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

export const defaultComponentCollectorHint = ExRComponentCollectorHint.SkipMemo
  | ExRComponentCollectorHint.SkipForwardRef
  | ExRComponentCollectorHint.SkipStringLiteral
  | ExRComponentCollectorHint.SkipNumberLiteral;

export type ExRFunctionComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier>;
  kind: "function";
  node: TSESTreeFunction;
  name: O.Option<string>;
  flag: ExRComponentFlag;
  hint: ExRComponentCollectorHint;
  initPath: O.Option<TSESTree.Node[]>;
  displayName: O.Option<string>;
};

export type ExRClassComponent = {
  _: string;
  id: O.Option<TSESTree.Identifier>;
  kind: "class";
  node: TSESTreeClass;
  name: O.Option<string>;
  displayName: O.Option<string>;
};

export type ExRComponent = ExRClassComponent | ExRFunctionComponent;
