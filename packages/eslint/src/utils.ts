import type { TSESTree } from "@typescript-eslint/types";
import type { ParserServicesWithTypeInformation } from "@typescript-eslint/utils";
import * as ESLintUtils from "@typescript-eslint/utils/eslint-utils";
import type { ReportDescriptor, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type ts from "typescript";
import type { RuleContext } from "./types";

function getDocsUrl(ruleName: string) {
  return `https://eslint-react.xyz/docs/rules/${ruleName}`;
}

/** The rule creator that generates documentation URLs for ESLint React rules. */
export const createRule = ESLintUtils.RuleCreator(getDocsUrl);

/**
 * Merge the rule options supplied by the user with the rule's default options.
 *
 * Properties whose value is `null` or `undefined` keep the default value.
 *
 * @param options The rule options supplied by the user.
 * @param defaults The rule's default options.
 * @returns The merged rule options.
 */
export function complete<O extends object, D extends NoInfer<O>>(options: Partial<O> | null | undefined, defaults: D): O & Omit<D, keyof O> {
  const result: O & Omit<D, keyof O> = { ...defaults };
  for (const key in options) {
    const value = options[key];
    if (value != null) Reflect.set(result, key, value);
  }
  return result;
}

/**
 * Gets the source text of the given node or token.
 * Can be used as `(context, node)` to get the text directly,
 * or as `(context)` to get a `(node) => string` function (ex: for use in array callbacks).
 * @param context The ESLint rule context.
 * @param node The node or token to get the text of.
 * @returns The source text of the node, or a function that returns it.
 */
export function getText(context: RuleContext, node: TSESTree.Node | TSESTree.Token): string;
export function getText(context: RuleContext): (node: TSESTree.Node | TSESTree.Token) => string;
export function getText(context: RuleContext, ...rest: [] | [TSESTree.Node | TSESTree.Token]) {
  if (rest.length === 1) return context.sourceCode.getText(rest[0]);
  return (node: TSESTree.Node | TSESTree.Token) => context.sourceCode.getText(node);
}

/**
 * Creates a report function for the given rule context.
 * @param context The ESLint rule context.
 * @returns A function that can be used to report violations.
 */
export function report(context: RuleContext) {
  return (desc?: null | ReportDescriptor<string>) => {
    if (desc == null) return;
    context.report(desc);
  };
}

/**
 * Resolves the given node's type. Will return the type's generic constraint, if it has one.
 *
 * Warning - if the type is generic and does _not_ have a constraint, the type will be
 * returned as-is, rather than returning an `unknown` type. This can be checked
 * for by checking for the type flag ts.TypeFlags.TypeParameter.
 *
 * Adapted from `getConstrainedTypeAtLocation` in `@typescript-eslint/type-utils`
 * (MIT License, Copyright (c) 2019 typescript-eslint and other contributors,
 * https://github.com/typescript-eslint/typescript-eslint) so that consumers don't
 * need to load `@typescript-eslint/type-utils`, whose entry point eagerly loads
 * the `eslint` package.
 * @see https://github.com/typescript-eslint/typescript-eslint/issues/10438
 */
export function getConstrainedTypeAtLocation(services: ParserServicesWithTypeInformation, node: TSESTree.Node): ts.Type {
  const nodeType = services.getTypeAtLocation(node);
  const constrained = services.program
    .getTypeChecker()
    .getBaseConstraintOfType(nodeType);

  return constrained ?? nodeType;
}

/**
 * Merge multiple visitor objects into a single visitor object.
 *
 * @param base The base visitor object (target of merge).
 * @param rest The additional visitor objects to merge (one or more).
 * @returns The merged visitor object.
 *
 * @example
 * ```typescript
 * const visitor1 = { Identifier: () => console.log(1) };
 * const visitor2 = { Identifier: () => console.log(2) };
 * const merged = merge(visitor1, visitor2);
 * // When encountering Identifier nodes, outputs 1 then 2
 * ```
 */
export function merge(base: RuleListener, ...rest: RuleListener[]): RuleListener {
  for (const r of rest) {
    for (const key in r) {
      const existing = base[key];
      base[key] = existing != null
        ? (...args) => {
          existing(...args);
          r[key]?.(...args);
        }
        : r[key];
    }
  }
  return base;
}
