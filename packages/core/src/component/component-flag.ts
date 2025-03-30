import type { FunctionComponent } from "./component-semantic-node";
import * as AST from "@eslint-react/ast";

/* eslint-disable perfectionist/sort-objects */
export type ComponentFlag = bigint;

export const ComponentFlag = {
  None: 0n,
  PureComponent: 1n << 0n,
  CreateElement: 1n << 1n,
  Memo: 1n << 2n,
  ForwardRef: 1n << 3n,
  Async: 1n << 4n,
};

export function getComponentFlagFromInitPath(initPath: FunctionComponent["initPath"]) {
  let flag = ComponentFlag.None;
  if (initPath != null && AST.hasCallInFunctionInitPath("memo", initPath)) {
    flag |= ComponentFlag.Memo;
  }
  if (initPath != null && AST.hasCallInFunctionInitPath("forwardRef", initPath)) {
    flag |= ComponentFlag.ForwardRef;
  }
  return flag;
}
