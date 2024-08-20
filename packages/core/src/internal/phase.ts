import { F } from "@eslint-react/tools";
import birecord from "birecord";

// eslint-disable-next-line perfectionist/sort-union-types
export type PhaseKind = "mount" | "unmount" | "setup" | "cleanup";

export const PHASE_RELEVANCE = birecord({
  mount: "unmount",
  setup: "cleanup",
});

export const isInversePhase: {
  (a: PhaseKind): (b: PhaseKind) => boolean;
  (a: PhaseKind, b: PhaseKind): boolean;
} = F.dual(2, (a: PhaseKind, b: PhaseKind) => PHASE_RELEVANCE.get(a) === b);
