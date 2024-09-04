import type { ESLintReactSettings } from "@eslint-react/shared";
import { isString, O } from "@eslint-react/tools";
import { findVariable } from "@eslint-react/var";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { isMatching, match } from "ts-pattern";

/**
 * Check if an identifier is initialized from React
 * @param name The top-level identifier's name
 * @param initialScope Initial scope to search for the identifier
 * @param settings ESLint React settings
 * @returns Whether the identifier is initialized from React
 */
export function isInitializedFromReact(
  name: string,
  initialScope: Scope,
  settings: Partial<Pick<ESLintReactSettings, "importSource" | "skipImportCheck">>,
): boolean {
  if (settings.skipImportCheck) return true;
  // Optimistic assertion when identifier is named react
  if (name.toLowerCase() === "react") return true;
  const { importSource = "react" } = settings;
  const maybeLatestDef = O.flatMapNullable(findVariable(name, initialScope), (v) => v.defs.at(-1));
  if (O.isNone(maybeLatestDef)) return false;
  const latestDef = maybeLatestDef.value;
  const { node, parent } = latestDef;
  if (node.type === AST_NODE_TYPES.VariableDeclarator && node.init) {
    const { init } = node;
    // check for: `variable = React.variable`
    if (init.type === AST_NODE_TYPES.MemberExpression && init.object.type === AST_NODE_TYPES.Identifier) {
      return isInitializedFromReact(init.object.name, initialScope, settings);
    }
    // check for: `{ variable } = React`
    if (init.type === AST_NODE_TYPES.Identifier) {
      return isInitializedFromReact(init.name, initialScope, settings);
    }
    const maybeRequireExpression = match(init)
      .with({
        type: AST_NODE_TYPES.CallExpression,
        callee: { type: AST_NODE_TYPES.Identifier, name: "require" },
      }, (exp) => O.some(exp))
      .with(
        {
          type: AST_NODE_TYPES.MemberExpression,
          object: {
            type: AST_NODE_TYPES.CallExpression,
            callee: { type: AST_NODE_TYPES.Identifier, name: "require" },
          },
        },
        ({ object }) => O.some(object),
      )
      .otherwise(O.none);
    if (O.isNone(maybeRequireExpression)) return false;
    const requireExpression = maybeRequireExpression.value;
    const [firstArg] = requireExpression.arguments;
    if (firstArg?.type !== AST_NODE_TYPES.Literal || !isString(firstArg.value)) return false;
    return firstArg.value === importSource || firstArg.value.startsWith(`${importSource}/`);
  }
  // latest definition is an import declaration: import { variable } from 'react'
  return isMatching({ type: "ImportDeclaration", source: { value: importSource } }, parent);
}
