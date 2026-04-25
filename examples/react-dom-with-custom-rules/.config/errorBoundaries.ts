import { type RuleFunction, merge } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

function isJsxLike(node: TSESTree.Node | null): boolean {
  if (node == null) return false;
  return node.type === "JSXElement" || node.type === "JSXFragment";
}

/** Validates usage of Error Boundaries instead of try/catch for errors in child components. */
export function errorBoundaries(): RuleFunction {
  return (context, { ast, collect, is }) => {
    // Fast path: skip if `try` is not present in the file
    if (!context.sourceCode.text.includes("try")) return {};

    const fc = collect.components(context);
    const hk = collect.hooks(context);

    const reported = new Set<TSESTree.TryStatement>();
    const useCalls = new Set<TSESTree.CallExpression>();

    return merge(
      fc.visitor,
      hk.visitor,
      {
        CallExpression(node) {
          if (!is.useCall(node)) return;
          useCalls.add(node);
        },
        "Program:exit"(program) {
          const comps = fc.query.all(program);
          const hooks = hk.query.all(program);
          const funcs = [...comps, ...hooks];

          for (const call of useCalls) {
            const stmt = ast.findParent(call, (n) => n.type === "TryStatement");
            const func = ast.findParent(stmt, (n) => funcs.some((f) => f.node === n));
            if (stmt != null && func != null && !reported.has(stmt)) {
              context.report({
                node: stmt,
                message:
                  "Use an Error Boundary instead of try/catch around the 'use' hook. The 'use' hook suspends the component, and its errors can only be caught by Error Boundaries.",
              });
              reported.add(stmt);
            }
          }

          for (const { rets } of funcs) {
            for (const ret of rets) {
              if (ret == null) continue;
              if (!isJsxLike(ret)) continue;
              const stmt = ast.findParent(ret, (n) => n.type === "TryStatement");
              if (stmt != null && !reported.has(stmt)) {
                context.report({
                  node: stmt,
                  message:
                    "Use an Error Boundary to catch errors in child components. Try/catch can't catch errors during React's rendering process.",
                });
                reported.add(stmt);
              }
            }
          }
        },
      },
    );
  };
}
