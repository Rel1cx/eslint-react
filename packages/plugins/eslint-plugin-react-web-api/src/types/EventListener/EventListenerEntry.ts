import type { SemanticEntry } from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

export type EventListenerEntry =
  | {
    kind: "addEventListener";
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: boolean | unit;
    listener: TSESTree.Node;
    signal: TSESTree.Node | unit;
  } & SemanticEntry
  | {
    kind: "removeEventListener";
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: boolean | unit;
    listener: TSESTree.Node;
  } & SemanticEntry;
