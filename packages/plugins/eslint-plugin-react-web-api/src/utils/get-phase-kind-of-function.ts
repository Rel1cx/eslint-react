import type * as AST from "@eslint-react/ast";
import * as ER from "@eslint-react/core";
import { match } from "ts-pattern";

export function getPhaseKindOfFunction(node: AST.TSESTreeFunction) {
  return match<AST.TSESTreeFunction, ER.ComponentPhaseKind | null>(node)
    .when(ER.isFunctionOfUseEffectSetup, () => "setup")
    .when(ER.isFunctionOfUseEffectCleanup, () => "cleanup")
    .when(ER.isFunctionOfComponentDidMount, () => "mount")
    .when(ER.isFunctionOfComponentWillUnmount, () => "unmount")
    .otherwise(() => null);
}
