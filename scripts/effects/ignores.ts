import * as FileSystem from "@effect/platform/FileSystem";
import * as Arr from "effect/Array";
import * as Effect from "effect/Effect";
import * as Fn from "effect/Function";
import { not, or } from "effect/Predicate";
import * as Str from "effect/String";

export const ignores = Fn.pipe(
  FileSystem.FileSystem,
  Effect.flatMap((fs) => fs.readFileString(".gitignore", "utf8")),
  Effect.map(Str.split("\n")),
  Effect.map(Arr.map(Str.trim)),
  Effect.map(Arr.filter(not(or(Str.startsWith("#"), Str.startsWith("!"))))),
  Effect.map(Arr.map(Str.replace(/^\//, ""))),
  Effect.map(Arr.filter(Str.isNonEmpty)),
);
