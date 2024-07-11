import { parse } from "valibot";

import type { ESLintReactSettings } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

export function getESLintReactSettings(data: unknown): ESLintReactSettings {
  const settings = parse(ESLintSettingsSchema, data);
  return settings["react-x"] ?? settings.reactOptions ?? {};
}
