import type { SemanticEntry } from "@eslint-react/core";
import type { unit } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";

export type EventListenerEntry =
  | {
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: boolean | unit;
    listener: TSESTree.Node;
    method: "addEventListener";
    signal: TSESTree.Node | unit;
  } & SemanticEntry
  | {
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: boolean | unit;
    listener: TSESTree.Node;
    method: "removeEventListener";
  } & SemanticEntry;
