import type * as AST from "@eslint-react/ast";
import { dual } from "@eslint-react/eff";
import { match } from "ts-pattern";

import { isFunctionOfUseEffectCleanup, isFunctionOfUseEffectSetup } from "../hook/hook-parts";
import { isFunctionOfComponentDidMount, isFunctionOfComponentWillUnmount } from "./component-method-parts";
import { type ComponentPhaseKind, ComponentPhaseRelevance } from "./component-phase";

export const isInversePhase: {
  (a: ComponentPhaseKind): (b: ComponentPhaseKind) => boolean;
  (a: ComponentPhaseKind, b: ComponentPhaseKind): boolean;
} = dual(2, (a: ComponentPhaseKind, b: ComponentPhaseKind) => ComponentPhaseRelevance.get(a) === b);

export function getPhaseKindOfFunction(node: AST.TSESTreeFunction) {
  return match<AST.TSESTreeFunction, ComponentPhaseKind | null>(node)
    .when(isFunctionOfUseEffectSetup, () => "setup")
    .when(isFunctionOfUseEffectCleanup, () => "cleanup")
    .when(isFunctionOfComponentDidMount, () => "mount")
    .when(isFunctionOfComponentWillUnmount, () => "unmount")
    .otherwise(() => null);
}
