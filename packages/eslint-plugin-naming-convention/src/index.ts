// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import namingConventionFilename from "./rules/filename";
import namingConventionFilenameExtension from "./rules/filename-extension";

export { name } from "../package.json";

export const rules = {
    "naming-convention/filename": namingConventionFilename,
    "naming-convention/filename-extension": namingConventionFilenameExtension,
} as const;
