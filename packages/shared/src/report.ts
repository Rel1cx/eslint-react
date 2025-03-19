import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";

import type { RuleContext } from "./types";

export function report<MessageID extends string>(context: RuleContext) {
  return (descriptor: undefined | null | ReportDescriptor<MessageID>) => {
    if (descriptor != null) context.report(descriptor);
  };
}
