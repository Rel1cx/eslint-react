import base from "@local/configs/tsdown";
import type { UserConfig } from "tsdown";

export default {
  ...base,
  deps: {
    ...base.deps,
    alwaysBundle: [
      "@eslint-react/eslint",
      ...(base.deps?.alwaysBundle ?? []),
    ],
  },
} satisfies UserConfig;
