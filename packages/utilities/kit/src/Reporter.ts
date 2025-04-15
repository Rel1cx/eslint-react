import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { RuleContext } from "./types";
import { type _, dual } from "@eslint-react/eff";

export const send: {
  <TMessageID extends string>(context: RuleContext, descriptor: _ | null | ReportDescriptor<TMessageID>): void;
  <TMessageID extends string>(context: RuleContext): (descriptor: _ | null | ReportDescriptor<TMessageID>) => void;
} = dual(2, (context: RuleContext, descriptor: _ | null | ReportDescriptor<string>) => {
  if (descriptor == null) return;
  return context.report(descriptor);
});

export const sendOrElse: {
  // dprint-ignore
  <TMessageID extends string, TElse>(context: RuleContext, descriptor: _ | null | ReportDescriptor<TMessageID>, cb: () => TElse): _ | TElse;
  // dprint-ignore
  <TMessageID extends string, TElse>(context: RuleContext): (descriptor: _ | null | ReportDescriptor<TMessageID>) => (cb: () => TElse) => _ | TElse;
} = dual(3, (context: RuleContext, descriptor: _ | null | ReportDescriptor<string>, cb: () => unknown) => {
  if (descriptor == null) return cb();
  return context.report(descriptor);
});

export const make = (context: RuleContext) => {
  return {
    send: (descriptor: _ | null | ReportDescriptor<string>) => send(context, descriptor),
    // dprint-ignore
    sendOrElse: (descriptor: _ | null | ReportDescriptor<string>, cb: () => unknown) => sendOrElse(context, descriptor, cb),
  } as const;
};
