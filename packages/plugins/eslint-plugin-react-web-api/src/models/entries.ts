import type { ERSemanticEntry } from "@eslint-react/core";
import type { O } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export interface TimerEntry extends ERSemanticEntry {
  node: TSESTree.CallExpression;
  callee: TSESTree.Node;
  timerID: TSESTree.Node;
}

export interface AddEventListenerEntry extends ERSemanticEntry {
  type: TSESTree.Node;
  node: TSESTree.CallExpression | TSESTree.Identifier;
  callee: TSESTree.Node;
  capture: O.Option<boolean>;
  listener: TSESTree.Node;
  signal: O.Option<unknown>;
}

export interface RemoveEventListenerEntry extends ERSemanticEntry {
  type: TSESTree.Node;
  node: TSESTree.CallExpression | TSESTree.Identifier;
  callee: TSESTree.Node;
  capture: O.Option<boolean>;
  listener: TSESTree.Node;
}
