// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import namingConventionFilename from "./rules/filename";
import namingConventionFilenameExtension from "./rules/filename-extension";

export { name } from "../package.json";

export const rules = {
    filename: namingConventionFilename,
    "filename-extension": namingConventionFilenameExtension,
} as const;
