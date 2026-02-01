import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { RuleContext } from "./types";

/**
 * Creates a report function for the given rule context.
 * @param context The ESLint rule context.
 * @returns A function that can be used to report violations.
 */
export function report(context: RuleContext) {
  return (descriptor?: null | ReportDescriptor<string>) => {
    if (descriptor == null) return;
    return context.report(descriptor);
  };
}
