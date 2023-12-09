import type { ReadonlyDeep } from "type-fest";

export type ReactSettings = ReadonlyDeep<{
  fragment: string;
  pragma: string;
  version: string;
}>;

// The `settings` object in eslint config for all plugins.
// We only care about the `react` field at the moment.
export type ERSettings = ReadonlyDeep<{
  [key: string]: unknown;
  react: ReactSettings;
}>;
