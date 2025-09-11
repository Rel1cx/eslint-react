import { type unit } from "@eslint-react/eff";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { RuleContext } from "../types";

export function report(context: RuleContext) {
  return (descriptor: unit | null | ReportDescriptor<string>) => {
    if (descriptor == null) return;
    return context.report(descriptor);
  };
}
