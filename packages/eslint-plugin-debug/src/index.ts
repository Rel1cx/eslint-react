// workaround for @typescript-eslint/utils's TS2742 error.
import type { ESLintUtils } from "@typescript-eslint/utils";

import debugClassComponent from "./rules/class-component";
import debugFunctionComponent from "./rules/function-component";

export { name } from "../package.json";

export const rules = {
    "class-component": debugClassComponent,
    "function-component": debugFunctionComponent,
} as const;
