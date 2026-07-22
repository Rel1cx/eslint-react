import { createImplicitPropListener } from "@/utils/create-implicit-prop-listener";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return createImplicitPropListener(context, {
    name: "children",
    // Allow pass-through of React internally defined children
    // For react, react-dom the FQN is "React.DOMAttributes.children"
    // For PropsWithChildren the FQN is "React.PropsWithChildren.children"
    // For @rbxts/react the FQN is "React.Attributes.children"
    isAllowedProp: (fqn) => fqn.endsWith("attributes.children") || fqn.endsWith("propswithchildren.children"),
    // Allow when the children property's type is a React children type alias
    // e.g. React.ReactNode, React.ReactElement, React.ReactPortal, JSX.Element
    isAllowedType: (fqn) => RE_REACT_CHILDREN_TYPE.test(fqn) || fqn === "jsx.element",
    // Report implicit children prop usage when both checkers fail
    onImplicitProp(node) {
      context.report({
        messageId: "default",
        node,
      });
    },
  });
}
