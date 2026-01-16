import type * as AST from "@eslint-react/ast";
import { dual } from "@eslint-react/eff";
import { match } from "ts-pattern";

import { isUseEffectCleanupCallback, isUseEffectSetupCallback } from "../hook/hook-callback";
import { isComponentDidMountCallback, isComponentWillUnmountCallback } from "./component-method-callback";
import { type ComponentPhaseKind, ComponentPhaseRelevance } from "./component-phase";

export const isInversePhase: {
  (a: ComponentPhaseKind): (b: ComponentPhaseKind) => boolean;
  (a: ComponentPhaseKind, b: ComponentPhaseKind): boolean;
} = dual(2, (a: ComponentPhaseKind, b: ComponentPhaseKind) => ComponentPhaseRelevance.get(a) === b);

export function getPhaseKindOfFunction(node: AST.TSESTreeFunction) {
  return match<AST.TSESTreeFunction, ComponentPhaseKind | null>(node)
    .when(isUseEffectSetupCallback, () => "setup")
    .when(isUseEffectCleanupCallback, () => "cleanup")
    .when(isComponentDidMountCallback, () => "mount")
    .when(isComponentWillUnmountCallback, () => "unmount")
    .otherwise(() => null);
}
