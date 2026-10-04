/* eslint-disable no-console */
/// <reference types="node" />
import type { RuleContext } from "@eslint-react/eslint";
import { Bench } from "tinybench";
import { type ESLintReactSettings, getSettingsFromContext } from "../src/settings";

const makeContext = (settings: unknown) =>
  ({
    settings: {
      "react-x": settings,
    },
  }) as unknown as RuleContext;

const settings = {
  additionalEffectHooks: "useMyEffect",
  additionalRefHooks: "useMyRef",
  additionalStateHooks: "useMyState",
  importSource: "react",
  polymorphicPropName: "as",
  version: "19.3.0",
} satisfies ESLintReactSettings;

const cachedContext = makeContext(settings);
const emptyContext = makeContext(undefined);

const bench = new Bench({ time: 1000 });

bench
  .add("cache hit (same settings object)", () => {
    getSettingsFromContext(cachedContext);
  })
  .add("cache hit (missing settings, defaults)", () => {
    getSettingsFromContext(emptyContext);
  })
  .add("cache miss (fresh settings object)", () => {
    getSettingsFromContext(makeContext({ ...settings }));
  })
  .add("cache miss (fresh settings object, version: 'detect')", () => {
    getSettingsFromContext(makeContext({ ...settings, version: "detect" }));
  });

await bench.run();

console.table(bench.table());
