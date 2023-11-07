// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import componentName from "./rules/component-name";
import filename from "./rules/filename";
import filenameExtension from "./rules/filename-extension";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "component-name": componentName,
  filename,
  "filename-extension": filenameExtension,
} as const;
