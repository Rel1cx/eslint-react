import { dual } from "@eslint-react/eff";
import birecord from "birecord";

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
