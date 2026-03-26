import type { RuleDefinition } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";

function findParent({ parent }: TSESTree.Node, test: (n: TSESTree.Node) => boolean): TSESTree.Node | null {
  if (parent == null) return null;
  if (test(parent)) return parent;
  if (parent.type === "Program") return null;
  return findParent(parent, test);
}

function isFunction({ type }: TSESTree.Node) {
  return type === "FunctionDeclaration" || type === "FunctionExpression" || type === "ArrowFunctionExpression";
}

/** Disallow defining components or hooks inside other functions (factory pattern). */
export function componentHookFactories(): RuleDefinition {
  return {
    name: "component-hook-factories",
    make: (context, { collect }) => {
      const fc = collect.components(context);
      const hk = collect.hooks(context);
      return merge(
        fc.visitor,
        hk.visitor,
        {
          "Program:exit"(program) {
            const comps = fc.query.all(program);
            const hooks = hk.query.all(program);
            for (const { name, node, kind } of [...comps, ...hooks]) {
              if (name == null) continue;
              if (findParent(node, isFunction) == null) continue;
              context.report({
                node,
                message: `Don't define ${kind} "${name}" inside a function. Move it to the module level.`,
              });
            }
          },
        },
      );
    },
  };
}
