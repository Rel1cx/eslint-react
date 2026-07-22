import { createImplicitPropListener } from "@/utils/create-implicit-prop-listener";
import { createRule } from "@/utils/create-rule";
import { type RuleContext, type RuleFeature, type RuleListener } from "@eslint-react/eslint";

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return createImplicitPropListener(context, {
    name: "ref",
    // Allow pass-through of React internally defined refs
    isAllowedProp: (fqn) => fqn.endsWith("attributes.ref"),
    // Allow when the ref property's type is a React ref type alias
    // e.g. React.Ref, React.LegacyRef, React.RefCallback, React.RefObject
    isAllowedType: (fqn) => RE_REACT_REF_TYPE.test(fqn),
    // Report implicit ref prop usage when both checkers fail
    onImplicitProp(node) {
      context.report({
        messageId: "default",
        node,
      });
    },
  });
}
