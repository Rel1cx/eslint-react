import { FileSystem } from "@effect/platform";
import { Array, Effect, Function as F, String as Str } from "effect";
import { not, or } from "effect/Predicate";

export const ignores = F.pipe(
  FileSystem.FileSystem,
  Effect.flatMap(fs => fs.readFileString(".gitignore")),
  Effect.map(Str.split("\n")),
  Effect.map(Array.map(Str.trim)),
  Effect.map(Array.filter(not(or(Str.startsWith("#"), Str.startsWith("!"))))),
  Effect.map(Array.map(Str.replace(/^\//, ""))),
  Effect.map(Array.filter(Str.isNonEmpty)),
);