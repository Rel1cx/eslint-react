import type * as ast from "@eslint-react/ast";
import * as core from "@eslint-react/core";
import birecord from "birecord";
import { match } from "ts-pattern";

export type ComponentPhaseKind = "cleanup" | "setup";

export const ComponentPhaseRelevance = birecord({
  setup: "cleanup",
});

export function getPhaseKindOfFunction(node: ast.TSESTreeFunction) {
  return match<ast.TSESTreeFunction, ComponentPhaseKind | null>(node)
    .when(core.isUseEffectSetupCallback, () => "setup")
    .when(core.isUseEffectCleanupCallback, () => "cleanup")
    .otherwise(() => null);
}
