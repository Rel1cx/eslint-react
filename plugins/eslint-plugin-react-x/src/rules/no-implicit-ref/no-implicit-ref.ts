import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { unionConstituents } from "ts-api-utils";

import { createRule } from "../../utils/create-rule";

export const RULE_NAME = "no-implicit-ref";

export const RULE_FEATURES = [
  "TSC",
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

const RE_REACT_REF_TYPE = /react\.(ref|legacyref|refcallback|refobject)$/i;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents implicitly passing the 'ref' prop to components.",
    },
    messages: {
      default:
        "This spread attribute implicitly passes the 'ref' prop to a component, this could lead to unexpected behavior. If you intend to pass the 'ref' prop, use 'ref={value}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  const services = ESLintUtils.getParserServices(context, false);
  const checker = services.program.getTypeChecker();
  return merge(
    {
      JSXSpreadAttribute(node) {
        for (const type of unionConstituents(getConstrainedTypeAtLocation(services, node.argument))) {
          const ref = type.getProperty("ref");
          if (ref == null) continue;
          // Allow pass-through of React internally defined refs
          if (core.getFullyQualifiedNameEx(checker, ref).toLowerCase().endsWith("attributes.ref")) continue;
          // Allow when the ref property's type is a React ref type alias
          // e.g. React.Ref, React.LegacyRef, React.RefCallback, React.RefObject
          const refType = checker.getTypeOfSymbol(ref);
          const typeSymbol = refType.aliasSymbol ?? refType.symbol;
          if (typeSymbol != null) {
            const typeFqn = checker.getFullyQualifiedName(typeSymbol);
            if (RE_REACT_REF_TYPE.test(typeFqn)) continue;
          }
          context.report({
            messageId: "default",
            node,
          });
        }
      },
    },
  );
}
