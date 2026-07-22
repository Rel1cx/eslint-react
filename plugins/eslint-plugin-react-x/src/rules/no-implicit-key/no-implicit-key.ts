import { createImplicitPropListener } from "@/utils/create-implicit-prop-listener";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";

export const RULE_NAME = "no-implicit-key";

export const RULE_FEATURES = [
  "TSC",
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents implicitly passing the 'key' prop to components.",
    },
    messages: {
      default:
        "This spread attribute implicitly passes the 'key' prop to a component, this could lead to unexpected behavior. If you intend to pass the 'key' prop, use 'key={value}'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return createImplicitPropListener(context, {
    name: "key",
    // Allow pass-through of React internally defined keys
    // For react, react-dom, and @rbxts/react the FQN is "React.Attributes.key"
    // For preact and preact/compat the FQN is "preact.Attributes.key"
    // https://github.com/Rel1cx/eslint-react/issues/1472
    isAllowedProp: (fqn) => fqn.endsWith("react.attributes.key"),
    // Allow when the key property's type is React.Key (ex: `{ key: React.Key }`)
    isAllowedType: (fqn) => fqn.endsWith("react.key"),
    // Report implicit key prop usage when both checkers fail
    onImplicitProp(node) {
      context.report({ messageId: "default", node });
    },
  });
}
