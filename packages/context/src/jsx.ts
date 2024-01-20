import { getFragmentFromContext, getPragmaFromContext } from "@eslint-react/jsx";
import { Context, Effect, Layer } from "@eslint-react/tools";

import { ESLint } from "./eslint";

export interface JSX {
  readonly fragment: Effect.Effect<never, never, string>;
  readonly pragma: Effect.Effect<never, never, string>;
}

export const JSX = Context.Tag<JSX>();

export const JSXLive = Layer.effect(
  JSX,
  Effect.gen(function* gen(_) {
    const { ruleContext } = yield* _(ESLint);

    return JSX.of({
      fragment: Effect.sync(() => getFragmentFromContext(ruleContext)),
      pragma: Effect.sync(() => getPragmaFromContext(ruleContext)),
    });
  }),
);
