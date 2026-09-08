/* eslint-disable perfectionist/sort-object-types */
/* eslint-disable perfectionist/sort-objects */
import type { RuleContext } from "@eslint-react/eslint";
import { type ESLintReactSettingsNormalized, getSettingsFromContext } from "@eslint-react/shared";
import type { ReportDescriptor } from "@typescript-eslint/utils/ts-eslint";
import { type EnvConfig, getEnvConfig } from "./env-config";
import { type JsxConfig, getJsxConfig } from "./jsx-config";

export type RichContext<M extends string = string, O extends readonly unknown[] = readonly unknown[]> = {
  _: RuleContext<M, O>;
  ast: RuleContext["sourceCode"]["ast"];
  src: RuleContext["sourceCode"];
  report(desc: ReportDescriptor<M> | null | undefined): void;
  hasText: (expr: RegExp | string) => boolean;
  getText: RuleContext["sourceCode"]["getText"];
  getEnvConfig: () => EnvConfig;
  getJsxConfig: () => Required<JsxConfig>;
  settings: ESLintReactSettingsNormalized;
};

/**
 * Builds a `RichContext` from a rule's `RuleContext`.
 * @param context The ESLint rule context.
 * @returns A `RichContext` wrapping the given rule context.
 */
export function buildRichContext<M extends string = string, O extends readonly unknown[] = readonly unknown[]>(context: RuleContext<M, O>): RichContext<M, O> {
  const src = context.sourceCode;
  let envConfig: EnvConfig | null = null;
  let jsxConfig: Required<JsxConfig> | null = null;
  return {
    _: context,
    ast: src.ast,
    src,
    report: (desc?: ReportDescriptor<M>) => {
      if (desc != null) context.report(desc);
    },
    getEnvConfig: () => envConfig ??= getEnvConfig(context),
    getJsxConfig: () => jsxConfig ??= getJsxConfig(context),
    getText: (...args) => src.getText(...args),
    hasText: (expr: RegExp | string) => {
      if (typeof expr === "string") return src.text.includes(expr);
      // Reset `lastIndex` so repeated calls with the same global/sticky regex stay consistent.
      expr.lastIndex = 0;
      return expr.test(src.text);
    },
    settings: getSettingsFromContext(context),
  };
}
