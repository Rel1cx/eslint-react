import { FileSystem } from "@effect/platform";
import { Effect } from "effect";

export const readJsonFile = (path: string): Effect.Effect<unknown, never, FileSystem.FileSystem> =>
  Effect.gen(function*(_) {
    const fs = yield* _(FileSystem.FileSystem);
    const content = yield* _(Effect.orDie(fs.readFileString(path)));
    return yield* _(
      Effect.try({
        catch: (error) => `[FileSystem] Unable to read and parse JSON file from '${path}': ${String(error)}`,
        try: () => JSON.parse(content),
      }),
      Effect.orDie,
    );
  });

export const writeJsonFile = (
  path: string,
  data: unknown,
  indent = 2,
): Effect.Effect<unknown, never, FileSystem.FileSystem> =>
  Effect.gen(function*(_) {
    const fs = yield* _(FileSystem.FileSystem);
    const content = yield* _(
      Effect.try({
        catch: (error) => `[FileSystem] Unable to stringify JSON data: ${String(error)}`,
        try: () => JSON.stringify(data, null, indent),
      }),
      Effect.orDie,
    );
    yield* _(Effect.orDie(fs.writeFileString(path, content)));
  });
