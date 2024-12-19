import { FileSystem } from "@effect/platform";
import { Effect, Function as F, String as Str } from "effect";

import { isVersion } from "./libs";

export const version = F.pipe(
  FileSystem.FileSystem,
  Effect.flatMap(fs => fs.readFileString("VERSION")),
  Effect.map(Str.trim),
  Effect.map(Str.replace("v", "")),
  Effect.filterOrDieMessage(isVersion, "Invalid version format"),
);
