import { isString, O } from "@eslint-react/eff";
import type { Scope } from "@typescript-eslint/scope-manager";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import { isMatching, match } from "ts-pattern";

import { findVariable } from "./find-variable";

/**
 * Check if an identifier is initialized from the given source
 * @param name The top-level identifier's name
 * @param source The import source to check against
 * @param initialScope Initial scope to search for the identifier
 * @returns Whether the identifier is initialized from the given source
 */
export function isInitializedFromSource(
  name: string,
  source: string,
  initialScope: Scope,
): boolean {
  const maybeLatestDef = O.flatMapNullable(findVariable(name, initialScope), (v) => v.defs.at(-1));
  if (O.isNone(maybeLatestDef)) return false;
  const latestDef = maybeLatestDef.value;
  const { node, parent } = latestDef;
  if (node.type === AST_NODE_TYPES.VariableDeclarator && node.init) {
    const { init } = node;
    // check for: `variable = Source.variable`
    if (init.type === AST_NODE_TYPES.MemberExpression && init.object.type === AST_NODE_TYPES.Identifier) {
      return isInitializedFromSource(init.object.name, source, initialScope);
    }
    // check for: `{ variable } = Source`
    if (init.type === AST_NODE_TYPES.Identifier) {
      return isInitializedFromSource(init.name, source, initialScope);
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
    return firstArg.value === source || firstArg.value.startsWith(`${source}/`);
  }
  // latest definition is an import declaration: import { variable } from 'source'
  return isMatching({ type: "ImportDeclaration", source: { value: source } }, parent);
}
