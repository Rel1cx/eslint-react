import { type RuleFunction, merge } from "@eslint-react/kit";
import { ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";

export type BooleanPropNamingOptions = {
  /** A regular expression that boolean prop names must match. */
  rule?: string;
};

const DEFAULT_RULE = "^(is|has|should)[A-Z]([A-Za-z0-9]?)+";

/**
 * Flattens a union type into its constituent types
 * @param t The type to flatten
 * @returns The flattened types
 */
function flattenTypes(t: ts.Type): ts.Type[] {
  return t.isUnion() ? t.types.flatMap(flattenTypes) : [t];
}

/**
 * Checks whether the given type is boolean or a union containing boolean
 * @param t The type to check
 * @returns True if the type is boolean-like, false otherwise
 */
function isBooleanLikeType(t: ts.Type) {
  return flattenTypes(t).some((t) => (t.getFlags() & ts.TypeFlags.BooleanLike) > 0);
}

/** Enforce boolean prop naming convention. */
export function booleanPropNaming(options?: BooleanPropNamingOptions): RuleFunction {
  const { rule = DEFAULT_RULE } = options ?? {};
  const regex = new RegExp(rule);

  return (context, { collect }) => {
    const srv = ESLintUtils.getParserServices(context, false);
    const chk = srv.program.getTypeChecker();
    const { query, visitor } = collect.components(context);

    return merge(visitor, {
      "Program:exit"(prog) {
        const comps = query.all(prog);

        for (const comp of comps) {
          const [propsParam] = comp.node.params;
          if (propsParam == null) continue;

          const tsNode = srv.esTreeNodeToTSNodeMap.get(propsParam);
          const propsType = chk.getTypeAtLocation(tsNode);
          const declaredProps = propsType.getProperties();

          for (const prop of declaredProps) {
            const propType = chk.getTypeOfSymbolAtLocation(prop, tsNode);

            // Guard: must be a boolean-like type
            if (!isBooleanLikeType(propType)) continue;

            // Guard: must not already match the naming pattern
            if (regex.test(prop.name)) continue;

            // Guard: must have a declaration to report on
            const decls = prop.getDeclarations();
            if (decls == null || decls.length === 0) continue;

            const [decl] = decls;
            if (decl == null) continue;

            // Report on the prop key when available
            const declNode = srv.tsNodeToESTreeNodeMap.get(decl);
            const node = "key" in declNode ? declNode.key : declNode;
            context.report({
              data: { name: prop.name, rule },
              message: `Boolean prop "{{name}}" should match "{{rule}}".`,
              node,
            });
          }
        }
      },
    });
  };
}
