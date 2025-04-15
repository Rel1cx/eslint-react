import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import type { RuleContext } from "./types";
import { type _, dual } from "@eslint-react/eff";

export interface Reporter {
  send: <TMessageID extends string>(descriptor: _ | null | ReportDescriptor<TMessageID>) => void;
  // dprint-ignore
  sendOrElse: <TMessageID extends string, TElse>(descriptor: _ | null | ReportDescriptor<TMessageID>, cb: () => TElse) => _ | TElse;
}

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

export function make(context: RuleContext): Reporter {
  return {
    send: (...args) => send(context, ...args),
    sendOrElse: (...args) => sendOrElse(context, ...args),
  };
}
