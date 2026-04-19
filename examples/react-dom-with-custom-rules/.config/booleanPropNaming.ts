import { type RuleFunction, merge } from "@eslint-react/kit";
import { ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";

// ── Options ───────────────────────────────────────────
export type BooleanPropNamingOptions = {
  /** A regular expression that boolean prop names must match. */
  rule?: string;
};

// ── Constants ─────────────────────────────────────────
const DEFAULT_RULE = "^(is|has|should)[A-Z]([A-Za-z0-9]?)+";
const BOOLEAN_LIKE = ts.TypeFlags.Boolean | ts.TypeFlags.BooleanLiteral;

// ── Type Utils ────────────────────────────────────────
const flattenTypes = (type: ts.Type): ts.Type[] =>
  type.isUnion() ? type.types.flatMap(flattenTypes) : [type];

const isBooleanType = (type: ts.Type): boolean =>
  flattenTypes(type).some(t => !!(t.getFlags() & BOOLEAN_LIKE));

// ── Rule ──────────────────────────────────────────────
/** Enforce boolean prop naming convention. */
export function booleanPropNaming(
  options?: BooleanPropNamingOptions,
): RuleFunction {
  const { rule = DEFAULT_RULE } = options ?? {};
  const regex = new RegExp(rule);

  // ── Listener ────────────────────────────────────────
  return (context, { collect }) => {
    const srv = ESLintUtils.getParserServices(context, false); // parser services
    const chk = srv.program.getTypeChecker();                  // type checker
    const { query, visitor } = collect.components(context);    // component utils

    return merge(visitor, {
      "Program:exit"(prog) {
        const comps = query.all(prog);

        // ── Each component ────────────────────────────
        for (const comp of comps) {
          const [propsParam] = comp.node.params;
          if (propsParam == null) continue; // no props

          const tsNode = srv.esTreeNodeToTSNodeMap.get(propsParam);
          const propsType = chk.getTypeAtLocation(tsNode);
          const declaredProps = propsType.getProperties();

          // ── Each prop ───────────────────────────────
          for (const prop of declaredProps) {
            const propType = chk.getTypeOfSymbolAtLocation(prop, tsNode);
            if (!isBooleanType(propType)) continue; // non-boolean
            if (regex.test(prop.name))    continue; // valid name

            const decls = prop.getDeclarations();
            if (decls == null)            continue; // no declarations

            const [decl] = decls;
            if (decl == null)             continue; // empty

            const declNode = srv.tsNodeToESTreeNodeMap.get(decl);
            if (declNode == null)         continue; // no estree node

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
