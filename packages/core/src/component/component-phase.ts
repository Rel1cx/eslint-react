import birecord from "birecord";

export type ComponentEffectPhaseKind = "cleanup" | "setup";
export type ComponentLifecyclePhaseKind = "mount" | "unmount";
export type ComponentPhaseKind = ComponentEffectPhaseKind | ComponentLifecyclePhaseKind;

export const ComponentPhaseRelevance = birecord({
  mount: "unmount",
  setup: "cleanup",
});
