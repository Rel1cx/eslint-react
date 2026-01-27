import * as AST from "@eslint-react/ast";

import { ComponentFlag } from "./component-flag";
import type { FunctionComponentSemanticNode } from "./component-semantic-node";

export function getComponentFlagFromInitPath(initPath: FunctionComponentSemanticNode["initPath"]) {
  let flag = ComponentFlag.None;
  if (initPath != null && AST.hasCallInFunctionInitPath("memo", initPath)) {
    flag |= ComponentFlag.Memo;
  }
  if (initPath != null && AST.hasCallInFunctionInitPath("forwardRef", initPath)) {
    flag |= ComponentFlag.ForwardRef;
  }
  return flag;
}
