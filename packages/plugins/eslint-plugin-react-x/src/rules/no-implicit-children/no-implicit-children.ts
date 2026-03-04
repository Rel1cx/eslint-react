import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { getConstrainedTypeAtLocation } from "@typescript-eslint/type-utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { unionConstituents } from "ts-api-utils";

import { createRule, getFullyQualifiedNameEx } from "../../utils";

export const RULE_NAME = "no-implicit-children";

export const RULE_FEATURES = [
  "TSC",
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

const RE_REACT_CHILDREN_TYPE = /react\.(reactnode|reactelement|reactportal)$/i;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents implicitly passing the 'children' prop to components.",
    },
    messages: {
      default:
        "This spread attribute implicitly passes the 'children' prop to a component, this could lead to unexpected behavior. If you intend to pass the 'children' prop, use 'children={value}'.",
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
  return defineRuleListener(
    {
      JSXSpreadAttribute(node) {
        for (const type of unionConstituents(getConstrainedTypeAtLocation(services, node.argument))) {
          const children = type.getProperty("children");
          if (children == null) continue;
          // Allow pass-through of React internally defined children
          // For react, react-dom the FQN is "React.DOMAttributes.children"
          // For PropsWithChildren the FQN is "React.PropsWithChildren.children"
          // For @rbxts/react the FQN is "React.Attributes.children"
          const fqn = getFullyQualifiedNameEx(checker, children).toLowerCase();
          if (fqn.endsWith("attributes.children") || fqn.endsWith("propswithchildren.children")) continue;
          // Allow when the children property's type is a React children type alias
          // e.g. React.ReactNode, React.ReactElement, React.ReactPortal, JSX.Element
          const childrenType = checker.getTypeOfSymbol(children);
          const typeSymbol = childrenType.aliasSymbol ?? childrenType.symbol;
          if (typeSymbol != null) {
            const typeFqn = checker.getFullyQualifiedName(typeSymbol);
            if (RE_REACT_CHILDREN_TYPE.test(typeFqn) || /^JSX\.Element$/i.test(typeFqn)) continue;
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
