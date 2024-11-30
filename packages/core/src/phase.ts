import { F } from "@eslint-react/tools";
import birecord from "birecord";

export type EREffectPhaseKind = "cleanup" | "setup";
export type ERLifecyclePhaseKind = "mount" | "unmount";

export type ERPhaseKind = EREffectPhaseKind | ERLifecyclePhaseKind;

export const PHASE_RELEVANCE = birecord({
  mount: "unmount",
  setup: "cleanup",
});

export const isInversePhase: {
  (a: ERPhaseKind): (b: ERPhaseKind) => boolean;
  (a: ERPhaseKind, b: ERPhaseKind): boolean;
} = F.dual(2, (a: ERPhaseKind, b: ERPhaseKind) => PHASE_RELEVANCE.get(a) === b);
