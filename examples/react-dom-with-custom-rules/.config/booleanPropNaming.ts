import { type RuleFunction, merge } from "@eslint-react/kit";
import { ESLintUtils } from "@typescript-eslint/utils";
import ts from "typescript";

/** Options for {@link booleanPropNaming}. */
export type booleanPropNamingOptions = {
  /** A regular expression that boolean prop names must match. */
  rule?: string;
};

/** Enforce boolean prop naming convention. */
export function booleanPropNaming(options?: booleanPropNamingOptions): RuleFunction {
  const { rule = "^(is|has|should)[A-Z]([A-Za-z0-9]?)+" } = options ?? {};
  const regex = new RegExp(rule);
  function isBooleanType(type: ts.Type): boolean {
    if (type.isUnion()) {
      return type.types.some(isBooleanType);
    }
    return !!(type.getFlags() & (ts.TypeFlags.Boolean | ts.TypeFlags.BooleanLiteral));
  }

  return (context, { collect }) => {
    const services = ESLintUtils.getParserServices(context, false);
    const checker = services.program.getTypeChecker();
    const { query, visitor } = collect.components(context);

    return merge(visitor, {
      "Program:exit"(program) {
        const components = query.all(program);
        for (const component of components) {
          const [props] = component.node.params;
          if (props == null) continue;

          const tsNode = services.esTreeNodeToTSNodeMap.get(props);
          const propsType = checker.getTypeAtLocation(tsNode);
          const declaredProps = propsType.getProperties();

          for (const prop of declaredProps) {
            const propType = checker.getTypeOfSymbolAtLocation(prop, tsNode);
            if (!isBooleanType(propType)) continue;
            if (regex.test(prop.name)) continue;

            const declaration = prop.getDeclarations()?.[0];
            if (declaration == null) continue;

            const declarationNode = services.tsNodeToESTreeNodeMap.get(declaration);
            if (declarationNode == null) continue;

            context.report({
              data: { name: prop.name, rule },
              message: `Boolean prop "{{name}}" should be named according to the pattern "{{rule}}".`,
              node: "key" in declarationNode ? declarationNode.key : declarationNode,
            });
          }
        }
      },
    });
  };
}
