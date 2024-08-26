/* eslint-disable perfectionist/sort-object-types */
import type { ERSemanticEntry } from "@eslint-react/core";
import type { Pretty } from "@eslint-react/tools";
import { Data } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

import type { ObserverKind } from "./ObserverKind";

export type ObserverEntry = Data.TaggedEnum<{
  Observe: Pretty<
    {
      kind: ObserverKind;
      node: TSESTree.CallExpression;
      element: TSESTree.Node;
      callee: TSESTree.Node;
      observer: TSESTree.Node;
    } & ERSemanticEntry
  >;
  Unobserve: Pretty<
    {
      kind: ObserverKind;
      node: TSESTree.CallExpression;
      element: TSESTree.Node;
      callee: TSESTree.Node;
      observer: TSESTree.Node;
    } & ERSemanticEntry
  >;
  Disconnect: Pretty<
    {
      kind: ObserverKind;
      node: TSESTree.CallExpression;
      callee: TSESTree.Node;
      observer: TSESTree.Node;
    } & ERSemanticEntry
  >;
}>;

export const ObserverEntry = Data.taggedEnum<ObserverEntry>();
