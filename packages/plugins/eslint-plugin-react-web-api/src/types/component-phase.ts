import type * as AST from "@eslint-react/ast";
import {
  isComponentDidMountCallback,
  isComponentWillUnmountCallback,
  isUseEffectCleanupCallback,
  isUseEffectSetupCallback,
} from "@eslint-react/core";
import { dual } from "@eslint-react/eff";
import birecord from "birecord";
import { match } from "ts-pattern";

export type ComponentEffectPhaseKind = "cleanup" | "setup";
export type ComponentLifecyclePhaseKind = "mount" | "unmount";
export type ComponentPhaseKind = ComponentEffectPhaseKind | ComponentLifecyclePhaseKind;

export const ComponentPhaseRelevance = birecord({
  mount: "unmount",
  setup: "cleanup",
});

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
