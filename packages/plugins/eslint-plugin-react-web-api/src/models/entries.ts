/* eslint-disable perfectionist/sort-union-types */
import type { ERSemanticEntry } from "@eslint-react/core";
import type { O } from "@eslint-react/tools";
import { Data } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";

export type TimerKind = "timeout" | "interval" | "immediate" | "animationFrame" | "idleCallback";

export interface TimerEntry extends ERSemanticEntry {
  kind: TimerKind;
  node: TSESTree.CallExpression;
  callee: TSESTree.Node;
  timerID: TSESTree.Node;
}

export type ObserverKind = "IntersectionObserver" | "ResizeObserver" | "MutationObserver" | "PerformanceObserver";

export interface ObserverEntry extends ERSemanticEntry {
  kind: ObserverKind;
  node: TSESTree.CallExpression;
  callee: TSESTree.Node;
  observer: TSESTree.Node;
}

export type EventListenerMethod = "addEventListener" | "removeEventListener";

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
