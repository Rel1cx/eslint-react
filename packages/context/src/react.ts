import { Effect } from "@eslint-react/tools";
import { Context, Layer } from "@eslint-react/tools";
import { getPackageInfoSync } from "local-pkg";
import { match, P } from "ts-pattern";

import { Config } from "./config";

export interface React {
  readonly version: Effect.Effect<never, never, string>;
}

export const React = Context.Tag<React>();

export const ReactLive = Layer.effect(
  React,
  Effect.gen(function* gen(_) {
    const config = yield* _(Config);
    const settings = yield* _(config.settings);

    return React.of({
      version: match(settings.react?.version)
        .with(P.nullish, () => Effect.succeed("18.2.0"))
        .with("detect", () => Effect.sync(() => getPackageInfoSync("react")?.version ?? "18.2.0"))
        .with(P.string, Effect.succeed)
        .exhaustive(),
    });
  }),
);
