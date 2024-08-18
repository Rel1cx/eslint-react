import type { ESLintReactSettings } from "@eslint-react/shared";

import { name, version } from "../package.json";
import noLeakedEventListener from "./rules/no-leaked-event-listener";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "no-leaked-event-listener": noLeakedEventListener,
} as const;

export const DEFAULT_ESLINT_REACT_SETTINGS = {
  skipImportCheck: true,
} as const satisfies ESLintReactSettings;
