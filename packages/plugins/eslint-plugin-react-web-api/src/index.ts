import type { ESLintReactSettings } from "@eslint-react/shared";

import { name, version } from "../package.json";
import noLeakedEventListener from "./rules/no-leaked-event-listener";
import noLeakedInterval from "./rules/no-leaked-interval";
import noLeakedResizeObserver from "./rules/no-leaked-resize-observer";
import noLeakedTimeout from "./rules/no-leaked-timeout";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "no-leaked-event-listener": noLeakedEventListener,
  "no-leaked-interval": noLeakedInterval,
  "no-leaked-resize-observer": noLeakedResizeObserver,
  "no-leaked-timeout": noLeakedTimeout,
} as const;

export const DEFAULT_ESLINT_REACT_SETTINGS = {
  skipImportCheck: true,
} as const satisfies ESLintReactSettings;
