import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { RuleContext } from "./types";
import { type _ } from "@eslint-react/eff";

export function make<TMessageID extends string>(context: RuleContext<TMessageID>) {
  return {
    send(descriptor: _ | null | ReportDescriptor<TMessageID>) {
      if (descriptor == null) return;
      return context.report(descriptor);
    },
    sendOrElse<TElse>(descriptor: _ | null | ReportDescriptor<TMessageID>, fallback: () => TElse) {
      if (descriptor == null) return fallback();
      return context.report(descriptor);
    },
  } as const;
}
