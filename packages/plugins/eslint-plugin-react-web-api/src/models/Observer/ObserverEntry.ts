import type { ERSemanticEntry } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";

import type { ObserverKind } from "./ObserverKind";

export interface ObserverEntry extends ERSemanticEntry {
  kind: ObserverKind;
  node: TSESTree.CallExpression;
  callee: TSESTree.Node;
  observer: TSESTree.Node;
}
