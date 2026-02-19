import * as ast from "@eslint-react/ast";

import type { FunctionComponentSemanticNode } from "./component-semantic-node";

/**
 * Component flag constants
 */
export const ComponentFlag = {
  /** No flags set */
  None: 0n,
  /** Indicates the component is a pure component (e.g., extends PureComponent) */
  PureComponent: 1n << 0n,
  /** Indicates the component creates elements using `createElement` instead of JSX */
  CreateElement: 1n << 1n,
  /** Indicates the component is memoized (e.g., React.memo) */
  Memo: 1n << 2n,
  /** Indicates the component forwards a ref (e.g., React.forwardRef) */
  ForwardRef: 1n << 3n,
};

/**
 * Get component flag from init path
 * @param initPath The init path of the function component
 * @returns The component flag
 */
export function getComponentFlagFromInitPath(initPath: FunctionComponentSemanticNode["initPath"]) {
  let flag = ComponentFlag.None;
  if (initPath != null && ast.hasCallInFunctionInitPath("memo", initPath)) {
    flag |= ComponentFlag.Memo;
  }
  if (initPath != null && ast.hasCallInFunctionInitPath("forwardRef", initPath)) {
    flag |= ComponentFlag.ForwardRef;
  }
  return flag;
}
