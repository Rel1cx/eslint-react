/* eslint-disable perfectionist/sort-object-types */
import type { SemanticEntry } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";

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
  } & SemanticEntry
  | {
    kind: ObserverKind;
    node: TSESTree.CallExpression;
    element: TSESTree.Node;
    callee: TSESTree.Node;
    observer: TSESTree.Node;
    method: "observe" | "unobserve";
  } & SemanticEntry;
