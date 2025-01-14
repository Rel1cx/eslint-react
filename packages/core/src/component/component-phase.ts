import { dual } from "@eslint-react/eff";
import birecord from "birecord";

export type EREffectPhaseKind = "cleanup" | "setup";
export type ERLifecyclePhaseKind = "mount" | "unmount";
export type ERPhaseKind = EREffectPhaseKind | ERLifecyclePhaseKind;

export const ERPhaseRelevance = birecord({
  mount: "unmount",
  setup: "cleanup",
});

export const isInversePhase: {
  (a: ERPhaseKind): (b: ERPhaseKind) => boolean;
  (a: ERPhaseKind, b: ERPhaseKind): boolean;
} = dual(2, (a: ERPhaseKind, b: ERPhaseKind) => ERPhaseRelevance.get(a) === b);
