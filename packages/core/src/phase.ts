import type * as AST from "@eslint-react/ast";
import { F, O } from "@eslint-react/tools";
import birecord from "birecord";
import { match } from "ts-pattern";

import { isComponentDidMountFunction, isComponentWillUnmountFunction } from "./component";
import { isCleanupFunction, isSetupFunction } from "./effect";
import type { ERPhaseKind } from "./internal";

export const PHASE_RELEVANCE = birecord({
  mount: "unmount",
  setup: "cleanup",
});

export const isInversePhase: {
  (a: ERPhaseKind): (b: ERPhaseKind) => boolean;
  (a: ERPhaseKind, b: ERPhaseKind): boolean;
} = F.dual(2, (a: ERPhaseKind, b: ERPhaseKind) => PHASE_RELEVANCE.get(a) === b);

export function getPhaseKindOfFunction(node: AST.TSESTreeFunction) {
  return match<AST.TSESTreeFunction, O.Option<ERPhaseKind>>(node)
    .when(isSetupFunction, () => O.some("setup"))
    .when(isCleanupFunction, () => O.some("cleanup"))
    .when(isComponentDidMountFunction, () => O.some("mount"))
    .when(isComponentWillUnmountFunction, () => O.some("unmount"))
    .otherwise(O.none);
}
