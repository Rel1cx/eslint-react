import type * as AST from "@eslint-react/ast";
import type { ERPhaseKind } from "@eslint-react/core";
import {
  isFunctionOfUseEffectCleanup,
  isFunctionOfComponentDidMount,
  isFunctionOfComponentWillUnmount,
  isFunctionOfUseEffectSetup,
} from "@eslint-react/core";
import { _ } from "@eslint-react/eff";
import { match } from "ts-pattern";

export function getPhaseKindOfFunction(node: AST.TSESTreeFunction) {
  return match<AST.TSESTreeFunction, ERPhaseKind | _>(node)
    .when(isFunctionOfUseEffectSetup, () => "setup")
    .when(isFunctionOfUseEffectCleanup, () => "cleanup")
    .when(isFunctionOfComponentDidMount, () => "mount")
    .when(isFunctionOfComponentWillUnmount, () => "unmount")
    .otherwise(() => _);
}
