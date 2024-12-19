import type { ERSemanticEntry } from "@eslint-react/core";
import type { O } from "@eslint-react/eff";
import { Data } from "@eslint-react/eff";
import type { Pretty } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

export type EventListenerEntry = Data.TaggedEnum<{
  AddEventListener: Pretty<
    {
      type: TSESTree.Node;
      node: TSESTree.CallExpression | TSESTree.Identifier;
      callee: TSESTree.Node;
      capture: O.Option<boolean>;
      listener: TSESTree.Node;
      signal: O.Option<TSESTree.Node>;
    } & ERSemanticEntry
  >;
  RemoveEventListener: Pretty<
    {
      type: TSESTree.Node;
      node: TSESTree.CallExpression | TSESTree.Identifier;
      callee: TSESTree.Node;
      capture: O.Option<boolean>;
      listener: TSESTree.Node;
    } & ERSemanticEntry
  >;
}>;

export const EventListenerEntry = Data.taggedEnum<EventListenerEntry>();
