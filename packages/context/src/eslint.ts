import { Context } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";

export interface ESLint {
  readonly ruleContext: RuleContext;
}

export const ESLint = Context.Tag<ESLint>();
