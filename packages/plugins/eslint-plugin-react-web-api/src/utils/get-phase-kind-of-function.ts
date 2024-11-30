import type * as AST from "@eslint-react/ast";
import type { ERPhaseKind } from "@eslint-react/core";
import {
  isCleanupFunction,
  isComponentDidMountFunction,
  isComponentWillUnmountFunction,
  isSetupFunction,
} from "@eslint-react/core";
import { O } from "@eslint-react/tools";
import { match } from "ts-pattern";

export function getPhaseKindOfFunction(node: AST.TSESTreeFunction) {
  return match<AST.TSESTreeFunction, O.Option<ERPhaseKind>>(node)
    .when(isSetupFunction, () => O.some("setup"))
    .when(isCleanupFunction, () => O.some("cleanup"))
    .when(isComponentDidMountFunction, () => O.some("mount"))
    .when(isComponentWillUnmountFunction, () => O.some("unmount"))
    .otherwise(O.none);
}
