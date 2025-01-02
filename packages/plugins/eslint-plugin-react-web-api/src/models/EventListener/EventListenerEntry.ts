import type { ERSemanticEntry } from "@eslint-react/core";
import type { O } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

export type EventListenerEntry =
  | {
    kind: "addEventListener";
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: O.Option<boolean>;
    listener: TSESTree.Node;
    signal: O.Option<TSESTree.Node>;
  } & ERSemanticEntry
  | {
    kind: "removeEventListener";
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: O.Option<boolean>;
    listener: TSESTree.Node;
  } & ERSemanticEntry;
