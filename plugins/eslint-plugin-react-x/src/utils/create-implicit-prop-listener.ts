import * as core from "@eslint-react/core";
import { type RuleContext, type RuleListener } from "@eslint-react/eslint";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import type { TSESTree } from "@typescript-eslint/types";
import { ESLintUtils } from "@typescript-eslint/utils";
import { unionConstituents } from "ts-api-utils";
import ts from "typescript";

/**
 * Creates a listener that detects JSX spread attributes implicitly passing a given prop
 * (ex: 'children', 'key', 'ref') to a component.
 *
 * For each union constituent of the spread argument's type, the prop is reported unless:
 * 1. The prop symbol's fully qualified name is allowed (pass-through of React internally defined props)
 * 2. The fully qualified name of the prop's type symbol (or its alias) is allowed (React type aliases)
 *
 * @param context The ESLint rule context
 * @param options The prop name, the allow-list predicates (receive lowercased fully qualified names), and the report callback
 * @param options.name The name of the prop to detect
 * @param options.isAllowedProp A predicate that receives the prop symbol's lowercased fully qualified name and returns `true` if it is allowed
 * @param options.isAllowedType A predicate that receives the prop's type symbol's lowercased fully qualified name and returns `true` if it is allowed
 * @param options.onImplicitProp A callback invoked with the spread attribute node when an implicit prop is detected
 * @returns A rule listener reporting on JSX spread attributes
 */
export function createImplicitPropListener(
  context: RuleContext,
  options: {
    name: string;
    isAllowedProp: (fqn: string) => boolean;
    isAllowedType: (fqn: string) => boolean;
    onImplicitProp: (node: TSESTree.JSXSpreadAttribute) => void;
  },
): RuleListener {
  const { name, isAllowedProp, isAllowedType, onImplicitProp } = options;
  const services = ESLintUtils.getParserServices(context, false);
  const checker = services.program.getTypeChecker();
  const getFqn = (symbol: ts.Symbol) => core.getFullyQualifiedNameEx(checker, symbol).toLowerCase();
  return {
    JSXSpreadAttribute(node) {
      for (const type of unionConstituents(getConstrainedTypeAtLocation(services, node.argument))) {
        const prop = type.getProperty(name);
        if (prop == null) continue;
        if (isAllowedProp(getFqn(prop))) continue;
        const propType = checker.getTypeOfSymbol(prop);
        const propTypeSymbol = propType.aliasSymbol ?? propType.symbol;
        // TypeScript's type definition marks `Type.symbol` as required, but at runtime it can be `undefined` for certain internal types.
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (propTypeSymbol != null && isAllowedType(getFqn(propTypeSymbol))) continue;
        onImplicitProp(node);
      }
    },
  };
}
