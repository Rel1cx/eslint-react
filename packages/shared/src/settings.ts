import { decodeUnknownSync } from "@effect/schema/Schema";

import type { ESLintReactSettings } from "./schemas";
import { ESLintSettings } from "./schemas";

export function getESLintReactSettings(data: unknown): ESLintReactSettings {
  const settings = decodeUnknownSync(ESLintSettings)(data);
  return settings["react-x"] ?? settings.reactOptions ?? {};
}
