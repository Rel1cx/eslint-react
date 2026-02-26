import type { ESLint } from "eslint";

import { name, version } from "../package.json";

import noLeakedEventListener from "./rules/no-leaked-event-listener/no-leaked-event-listener";
import noLeakedInterval from "./rules/no-leaked-interval/no-leaked-interval";
import noLeakedResizeObserver from "./rules/no-leaked-resize-observer/no-leaked-resize-observer";
import noLeakedTimeout from "./rules/no-leaked-timeout/no-leaked-timeout";

export const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "no-leaked-event-listener": noLeakedEventListener,
    "no-leaked-interval": noLeakedInterval,
    "no-leaked-resize-observer": noLeakedResizeObserver,
    "no-leaked-timeout": noLeakedTimeout,
  },
} as unknown as ESLint.Plugin;
