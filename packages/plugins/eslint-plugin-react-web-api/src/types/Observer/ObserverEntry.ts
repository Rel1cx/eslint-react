/* eslint-disable perfectionist/sort-object-types */
import type { SemanticEntry } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";

import type { ObserverKind } from "./ObserverKind";

export type ObserverEntry =
  | {
    kind: "disconnect";
    node: TSESTree.CallExpression;
    callee: TSESTree.Node;
    observer: TSESTree.Node;
    observerKind: ObserverKind;
  } & SemanticEntry
  | {
    kind: "observe";
    node: TSESTree.CallExpression;
    element: TSESTree.Node;
    callee: TSESTree.Node;
    observer: TSESTree.Node;
    observerKind: ObserverKind;
  } & SemanticEntry
  | {
    kind: "unobserve";
    node: TSESTree.CallExpression;
    element: TSESTree.Node;
    callee: TSESTree.Node;
    observer: TSESTree.Node;
    observerKind: ObserverKind;
  } & SemanticEntry;
