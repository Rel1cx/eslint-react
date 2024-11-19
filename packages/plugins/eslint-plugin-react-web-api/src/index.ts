import type { ESLintReactSettings } from "@eslint-react/shared";

import { name, version } from "../package.json";
import noLeakedEventListener from "./rules/no-leaked-event-listener";
import noLeakedInterval from "./rules/no-leaked-interval";
import noLeakedResizeObserver from "./rules/no-leaked-resize-observer";
import noLeakedTimeout from "./rules/no-leaked-timeout";

const DEFAULT_ESLINT_REACT_SETTINGS = {} as const satisfies ESLintReactSettings;

export default {
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
  // eslint-disable-next-line perfectionist/sort-objects
  DEFAULT_ESLINT_REACT_SETTINGS,
};
