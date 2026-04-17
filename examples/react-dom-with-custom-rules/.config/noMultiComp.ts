import { type RuleFunction, merge } from "@eslint-react/kit";

/** Prevent defining more than one component per file. */
export function noMultiComp(): RuleFunction {
  return (context, { collect }) => {
    const { query, visitor } = collect.components(context);
    return merge(visitor, {
      "Program:exit"(program) {
        const components = query.all(program);
        for (const { node, name } of components.slice(1)) {
          context.report({
            node,
            message: `Declare only one component per file. Found extra component "${name ?? "anonymous"}".`,
          });
        }
      },
    });
  };
}
