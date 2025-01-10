import { birecord } from "@eslint-react/eff";

export const ERPhaseRelevance = birecord({
  mount: "unmount",
  setup: "cleanup",
});
