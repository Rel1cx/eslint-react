import type { RuleFunction } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";

/** Enforce destructuring assignment for component props. */
export function noDirectAccessProps(): RuleFunction {
  return (context, { collect }) => {
    const { query, visitor } = collect.components(context);

    return merge(visitor, {
      "Program:exit"(program) {
        for (const { node } of query.all(program)) {
          const [props] = node.params;
          // Guard: only check components with a plain identifier props parameter (e.g. `props`, not destructuring)
          if (props == null) continue;
          if (props.type !== "Identifier") continue;

          const propName = props.name;
          const propVariable = context.sourceCode.getScope(node).variables.find((v) => v.name === propName);
          const propReferences = propVariable?.references ?? [];

          // Report every member access on the props object (e.g. `props.foo`)
          for (const ref of propReferences) {
            const { parent } = ref.identifier;
            if (parent.type !== "MemberExpression") continue;
            context.report({
              message: "Use destructuring assignment for component props.",
              node: parent,
            });
          }
        }
      },
    });
  };
}
