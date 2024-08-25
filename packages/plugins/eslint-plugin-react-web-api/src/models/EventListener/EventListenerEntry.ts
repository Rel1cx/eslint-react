import type { ERSemanticEntry } from "@eslint-react/core";
import type { O } from "@eslint-react/tools";
import { Data } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export type EventListenerEntry = Data.TaggedEnum<{
  addEventListener: ERSemanticEntry & {
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: O.Option<boolean>;
    listener: TSESTree.Node;
    signal: O.Option<unknown>;
  };
  removeEventListener: ERSemanticEntry & {
    type: TSESTree.Node;
    node: TSESTree.CallExpression | TSESTree.Identifier;
    callee: TSESTree.Node;
    capture: O.Option<boolean>;
    listener: TSESTree.Node;
  };
}>;

export const EventListenerEntry = Data.taggedEnum<EventListenerEntry>();
