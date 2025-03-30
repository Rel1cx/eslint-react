import type * as AST from "@eslint-react/ast";
import type { ComponentPhaseKind } from "@eslint-react/core";
import {
  isFunctionOfComponentDidMount,
  isFunctionOfComponentWillUnmount,
  isFunctionOfUseEffectCleanup,
  isFunctionOfUseEffectSetup,
} from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import { match } from "ts-pattern";

export function getPhaseKindOfFunction(node: AST.TSESTreeFunction) {
  return match<AST.TSESTreeFunction, ComponentPhaseKind | _>(node)
    .when(isFunctionOfUseEffectSetup, () => "setup")
    .when(isFunctionOfUseEffectCleanup, () => "cleanup")
    .when(isFunctionOfComponentDidMount, () => "mount")
    .when(isFunctionOfComponentWillUnmount, () => "unmount")
    .otherwise(() => _);
}
