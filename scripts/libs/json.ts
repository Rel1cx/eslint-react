import { FileSystem } from "@effect/platform";
import { Effect } from "effect";

export const readJsonFile = (path: string): Effect.Effect<unknown, never, FileSystem.FileSystem> =>
  Effect.gen(function*() {
    const fs = yield* FileSystem.FileSystem;
    const content = yield* Effect.orDie(fs.readFileString(path));
    return yield* Effect.orDie(Effect.try({
      catch: (error) => `[FileSystem] Unable to read and parse JSON file from '${path}': ${String(error)}`,
      try: () => JSON.parse(content) as unknown,
    }));
  });

export const writeJsonFile = (
  path: string,
  data: unknown,
  indent = 2,
  insertFinalNewline = true,
): Effect.Effect<unknown, never, FileSystem.FileSystem> =>
  Effect.gen(function*() {
    const fs = yield* FileSystem.FileSystem;
    const content = yield* Effect.orDie(Effect.try({
      catch: (error) => `[FileSystem] Unable to stringify JSON data: ${String(error)}`,
      try: () => JSON.stringify(data, null, indent),
    }));
    const finalContent = insertFinalNewline ? `${content}\n` : content;
    yield* Effect.orDie(fs.writeFileString(path, finalContent));
  });
