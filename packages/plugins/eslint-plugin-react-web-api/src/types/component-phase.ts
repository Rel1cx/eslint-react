import type * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
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

export function getPhaseKindOfFunction(node: ast.TSESTreeFunction) {
  return match<ast.TSESTreeFunction, ComponentPhaseKind | null>(node)
    .when(core.isUseEffectSetupCallback, () => "setup")
    .when(core.isUseEffectCleanupCallback, () => "cleanup")
    .when(core.isComponentDidMountCallback, () => "mount")
    .when(core.isComponentWillUnmountCallback, () => "unmount")
    .otherwise(() => null);
}
