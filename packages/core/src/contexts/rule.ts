import { Context } from "@eslint-react/tools";
import type { RuleContext } from "@eslint-react/types";

export interface Rule {
  readonly context: RuleContext;
}

export const Rule = Context.Tag<Rule>();
