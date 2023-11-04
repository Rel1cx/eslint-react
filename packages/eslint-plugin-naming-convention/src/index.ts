// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import { name, version } from "../package.json";
import namingConventionComponentName from "./rules/component-name";
import namingConventionFilename from "./rules/filename";
import namingConventionFilenameExtension from "./rules/filename-extension";

export const meta = {
  name,
  version,
} as const;

export const rules = {
  "component-name": namingConventionComponentName,
  filename: namingConventionFilename,
  "filename-extension": namingConventionFilenameExtension,
} as const;
