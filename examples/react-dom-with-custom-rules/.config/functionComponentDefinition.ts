import type { RuleFunction } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";

/** Enforce arrow function definitions for function components. */
export function functionComponentDefinition(): RuleFunction {
  return (context, { ast, collect, hint }) => {
    const { query, visitor } = collect.components(context, {
      hint: hint.component.Default & ~hint.component.DoNotIncludeFunctionDefinedAsObjectMethod,
    });
    return merge(
      visitor,
      {
        "Program:exit"(program) {
          // ─── Iterate all components ────────────────────
          for (const { node } of query.all(program)) {
            // › Guard: must not already be arrow function
            if (node.type === "ArrowFunctionExpression") continue;

            context.report({
              node,
              message: "Function components must be defined with arrow functions.",
              suggest: [
                {
                  desc: "Convert to arrow function.",
                  fix(fixer) {
                    const src = context.sourceCode;
                    if (node.generator) return null;

                    const prefix = node.async ? "async " : "";
                    const typeParams = node.typeParameters ? src.getText(node.typeParameters) : "";
                    const params = `(${node.params.map((p) => src.getText(p)).join(", ")})`;
                    const returnType = node.returnType ? src.getText(node.returnType) : "";
                    const body = src.getText(node.body);

                    // ─── Case: function declaration ──────────────
                    if (node.type === "FunctionDeclaration" && node.id) {
                      // dprint-ignore
                      return fixer.replaceText(node, `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`);
                    }

                    // ─── Case: function expression in variable ───
                    const unwrappedParent = ast.unwrap(node.parent);
                    // If unwrap stripped a wrapper, the result is the function expression itself.
                    // In that case we need to look at the wrapper's parent to find the declarator.
                    const parent = unwrappedParent === node ? ast.unwrap(node.parent.parent) : unwrappedParent;
                    if (node.type === "FunctionExpression" && parent.type === "VariableDeclarator") {
                      // dprint-ignore
                      return fixer.replaceText(node, `${prefix}${typeParams}${params}${returnType} => ${body}`);
                    }

                    // ─── Case: object method shorthand ───────────
                    if (node.type === "FunctionExpression" && parent.type === "Property") {
                      // dprint-ignore
                      return fixer.replaceText(node.parent, `${src.getText(node.parent.key)}: ${prefix}${typeParams}${params}${returnType} => ${body}`);
                    }

                    return null;
                  },
                },
              ],
            });
          }
        },
      },
    );
  };
}
