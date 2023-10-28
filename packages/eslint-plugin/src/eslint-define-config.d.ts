import type { Pretty } from "@eslint-react/tools";

import type eslintPlugin from "./index";

type Rules = typeof eslintPlugin.rules;
type RulesWithOptions = Pretty<
  {
    [ruleName in keyof Rules as `@eslint-react/${ruleName}`]: Parameters<Rules[ruleName]["create"]>[0]["options"];
  }
>;

declare module "eslint-define-config" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomRuleOptions extends RulesWithOptions {}
}
