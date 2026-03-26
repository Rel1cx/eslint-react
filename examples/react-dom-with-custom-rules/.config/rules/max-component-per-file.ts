import type { RuleDefinition } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";

/** Options for {@link maxComponentPerFile}. */
export type MaxComponentPerFileOptions = {
  /** The maximum number of components allowed per file. */
  max: number;
};

/** Prevent defining more than one component per file. */
export function maxComponentPerFile({ max }: MaxComponentPerFileOptions): RuleDefinition {
  return {
    name: "no-multi-comp",
    make: (context, { collect }) => {
      const { query, visitor } = collect.components(context);
      return merge(visitor, {
        "Program:exit"(program) {
          const components = query.all(program);
          for (const { node, name } of components.slice(max)) {
            context.report({
              node,
              message: `Declare only ${max} component${max !== 1 ? "s" : ""} per file. Found extra component "${
                name ?? "anonymous"
              }".`,
            });
          }
        },
      });
    },
  };
}
