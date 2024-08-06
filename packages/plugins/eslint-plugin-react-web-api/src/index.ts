import type { ESLintReactSettings } from "@eslint-react/shared";

import { name, version } from "../package.json";
import symmetricEventListener from "./rules/symmetric-event-listener";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "symmetric-event-listener": symmetricEventListener,
} as const;

export const DEFAULT_ESLINT_REACT_SETTINGS = {
  skipImportCheck: true,
} as const satisfies ESLintReactSettings;
