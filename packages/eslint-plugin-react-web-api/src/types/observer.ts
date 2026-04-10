/* eslint-disable perfectionist/sort-object-types */
import type { TSESTree } from "@typescript-eslint/types";

import type { ComponentPhaseKind } from "./component-phase";

export type ObserverKind =
  | "IntersectionObserver"
  | "ResizeObserver"
  | "MutationObserver"
  | "PerformanceObserver";

export type ObserverEntry =
  | {
    kind: ObserverKind;
    node: TSESTree.CallExpression;
    callee: TSESTree.Node;
    observer: TSESTree.Node;
    method: "disconnect";
    phase: ComponentPhaseKind;
  }
  | {
    kind: ObserverKind;
    node: TSESTree.CallExpression;
    element: TSESTree.Node;
    callee: TSESTree.Node;
    observer: TSESTree.Node;
    method: "observe" | "unobserve";
    phase: ComponentPhaseKind;
  };
