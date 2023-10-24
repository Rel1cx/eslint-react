// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

export { name } from "../package.json";

export const rules = {
    // TODO: no implemented rules yet.
} as const;
