import { type RuleFunction, merge } from "@eslint-react/kit";
import { ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";

export type BooleanPropNamingOptions = {
  /** A regular expression that boolean prop names must match. */
  rule?: string;
};

/** Enforce boolean prop naming convention. */
export function booleanPropNaming(options?: BooleanPropNamingOptions): RuleFunction {
  const DEFAULT_RULE = "^(is|has|should)[A-Z]([A-Za-z0-9]?)+";
  const BOOLEAN_LIKE = ts.TypeFlags.Boolean | ts.TypeFlags.BooleanLiteral;

  const { rule = DEFAULT_RULE } = options ?? {};
  const regex = new RegExp(rule);

  const flattenTypes = (type: ts.Type): ts.Type[] => type.isUnion() ? type.types.flatMap(flattenTypes) : [type];
  const isBooleanType = (type: ts.Type): boolean => flattenTypes(type).some(t => !!(t.getFlags() & BOOLEAN_LIKE));

  return (context, { collect }) => {
    const srv = ESLintUtils.getParserServices(context, false);
    const chk = srv.program.getTypeChecker();
    const { query, visitor } = collect.components(context);

    return merge(visitor, {
      "Program:exit"(prog) {
        const comps = query.all(prog);

        // ─── Iterate Components ────────────────────────
        for (const comp of comps) {
          const [propsParam] = comp.node.params;
          if (propsParam == null) continue;

          const tsNode = srv.esTreeNodeToTSNodeMap.get(propsParam);
          const propsType = chk.getTypeAtLocation(tsNode);
          const declaredProps = propsType.getProperties();

          // ─── Iterate Props ─────────────────────────────
          for (const prop of declaredProps) {
            const propType = chk.getTypeOfSymbolAtLocation(prop, tsNode);

            // › Filter: must be boolean
            if (!isBooleanType(propType)) continue;

            // › Filter: must match naming pattern
            if (regex.test(prop.name)) continue;

            const decls = prop.getDeclarations();
            if (decls == null || decls.length === 0) continue;

            const [decl] = decls;
            if (decl == null) continue;
            const declNode = srv.tsNodeToESTreeNodeMap.get(decl);
            if (declNode == null) continue;

            const node = "key" in declNode ? declNode.key : declNode;

            // › Report violation
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
