import type { Effect } from "@eslint-react/tools";
import { Context } from "@eslint-react/tools";

export interface React {
  readonly version: () => Effect.Effect<never, never, string>;
}

export const React = Context.Tag<React>();
