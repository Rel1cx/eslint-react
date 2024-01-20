import { Context, Effect, Layer } from "@eslint-react/tools";

import { getFragmentFromContext, getPragmaFromContext } from "../../../utilities/jsx/src/pragma/get-pragma";
import { Rule } from "./rule";

export interface JSX {
  readonly fragment: Effect.Effect<never, never, string>;
  readonly pragma: Effect.Effect<never, never, string>;
}

export const JSX = Context.Tag<JSX>();

export const JSXLive = Layer.effect(
  JSX,
  Effect.gen(function* gen(_) {
    const { context } = yield* _(Rule);

    return JSX.of({
      fragment: Effect.sync(() => getFragmentFromContext(context)),
      pragma: Effect.sync(() => getPragmaFromContext(context)),
    });
  }),
);
