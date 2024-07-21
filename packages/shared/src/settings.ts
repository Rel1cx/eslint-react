import { parse } from "valibot";

import type { ESLintSettings } from "./schemas";
import { ESLintSettingsSchema } from "./schemas";

export function parseESLintSettings(data: unknown): ESLintSettings {
  return parse(ESLintSettingsSchema, data);
}
