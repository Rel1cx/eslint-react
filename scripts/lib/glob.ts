import { Effect } from "effect";
import { globSync } from "tinyglobby";

export const glob = (pattern: string, exclude: ReadonlyArray<string> = []) =>
  Effect.try({
    catch: (error) => `[Glob] Unable to scan files with pattern '${pattern}': ${String(error)}`,
    try: () =>
      globSync([pattern], {
        ignore: exclude.slice(),
      }),
  });
