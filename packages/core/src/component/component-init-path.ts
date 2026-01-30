import * as ast from "@eslint-react/ast";

import { ComponentFlag } from "./component-flag";
import type { FunctionComponentSemanticNode } from "./component-semantic-node";

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
