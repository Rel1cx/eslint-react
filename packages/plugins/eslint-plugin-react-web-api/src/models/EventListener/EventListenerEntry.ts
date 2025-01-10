import type { ERSemanticEntry } from "@eslint-react/core";
import type { _ } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

export type EventListenerEntry =
  | {
    kind: "addEventListener";
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: boolean | _;
    listener: TSESTree.Node;
    signal: TSESTree.Node | _;
  } & ERSemanticEntry
  | {
    kind: "removeEventListener";
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: boolean | _;
    listener: TSESTree.Node;
  } & ERSemanticEntry;
