import { Effect } from "effect";
import { globSync } from "tinyglobby";

export const glob = (patterns: string[], exclude: ReadonlyArray<string> = ["**/node_modules/**"]) =>
  Effect.try({
    catch: (error) => error,
    try: () =>
      globSync(patterns, {
        ignore: [...exclude],
      }),
  });
