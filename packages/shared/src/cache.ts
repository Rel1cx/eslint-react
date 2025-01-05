import type { ESLintReactSettings, ESLintReactSettingsNormalized } from "./schemas";

export const normalizedSettingsCache = new WeakMap<ESLintReactSettings, ESLintReactSettingsNormalized>();
