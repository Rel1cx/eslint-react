import type { FunctionComponent } from "./component-semantic-node";
import * as AST from "@eslint-react/ast";
import { ComponentFlag } from "./component-flag";

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
