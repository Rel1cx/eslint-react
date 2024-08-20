import birecord from "birecord";

// eslint-disable-next-line perfectionist/sort-union-types
export type PhaseKind = "mount" | "unmount" | "setup" | "cleanup";

export const PHASE_RELEVANCE = birecord({
  mount: "unmount",
  setup: "cleanup",
});
