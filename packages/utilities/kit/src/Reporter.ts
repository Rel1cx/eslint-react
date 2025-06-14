import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { RuleContext } from "./types";
import { dual, type unit } from "@eslint-react/eff";

export interface Reporter<TMessageID extends string> {
  send: (descriptor: unit | null | ReportDescriptor<TMessageID>) => void;
  // dprint-ignore
  sendOrElse: <TElse>(descriptor: unit | null | ReportDescriptor<TMessageID>, cb: () => TElse) => unit | TElse;
}

export const send: {
  <TMessageID extends string>(context: RuleContext, descriptor: unit | null | ReportDescriptor<TMessageID>): void;
  <TMessageID extends string>(context: RuleContext): (descriptor: unit | null | ReportDescriptor<TMessageID>) => void;
} = dual(2, (context: RuleContext, descriptor: unit | null | ReportDescriptor<string>) => {
  if (descriptor == null) return;
  return context.report(descriptor);
});

export const sendOrElse: {
  // dprint-ignore
  <TMessageID extends string, TElse>(context: RuleContext, descriptor: unit | null | ReportDescriptor<TMessageID>, cb: () => TElse): unit| TElse;
  // dprint-ignore
  <TMessageID extends string, TElse>(context: RuleContext): (descriptor: unit | null | ReportDescriptor<TMessageID>) => (cb: () => TElse) => unit | TElse;
} = dual(3, (context: RuleContext, descriptor: unit | null | ReportDescriptor<string>, cb: () => unknown) => {
  if (descriptor == null) return cb();
  return context.report(descriptor);
});

export function make<TMessageID extends string>(context: RuleContext): Reporter<TMessageID> {
  return {
    send: (...args) => send(context, ...args),
    sendOrElse: (...args) => sendOrElse(context, ...args),
  };
}
