import type { _ } from "@eslint-react/eff";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";

import type { RuleContext } from "./rule";

/**
 * Creates a report function that can conditionally report a descriptor.
 * @param context - The context of the rule
 * @returns A function that takes a descriptor and reports it if it's not null or undefined
 */
export function createReport<MessageID extends string>(context: RuleContext) {
  return (descriptor: _ | null | ReportDescriptor<MessageID>) => {
    if (descriptor != null) context.report(descriptor);
  };
}
