import { FileSystem } from "@effect/platform";
import { Effect, Function as F, String as Str } from "effect";

export const version = F.pipe(
  FileSystem.FileSystem,
  Effect.flatMap(fs => Effect.orDie(fs.readFileString("VERSION"))),
  Effect.map(Str.trim),
  Effect.map(Str.replace("v", "")),
);
