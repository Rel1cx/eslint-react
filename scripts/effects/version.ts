import * as FileSystem from "@effect/platform/FileSystem";
import * as Effect from "effect/Effect";
import * as Fn from "effect/Function";
import * as Str from "effect/String";

export const version = Fn.pipe(
  FileSystem.FileSystem,
  Effect.flatMap((fs) => fs.readFileString("VERSION", "utf8")),
  Effect.map(Str.trim),
  Effect.map(Str.replace(/^v/, "")),
);
