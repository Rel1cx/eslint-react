import { type ESLintReactSettings, ESLintSettingsSchema, parseSchema } from "@eslint-react/shared";
import { Effect } from "@eslint-react/tools";
import { Context, Layer } from "@eslint-react/tools";

import { ESLint } from "./eslint";

export interface Config {
  readonly settings: Effect.Effect<never, never, ESLintReactSettings>;
}

export const Config = Context.Tag<Config>();

export const ConfigLive = Layer.effect(
  Config,
  Effect.gen(function* gen(_) {
    const { ruleContext } = yield* _(ESLint);

    return Config.of({
      settings: Effect.sync(() => parseSchema(ESLintSettingsSchema, ruleContext.settings).eslintReact ?? {}),
    });
  }),
);
