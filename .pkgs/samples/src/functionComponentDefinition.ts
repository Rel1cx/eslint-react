import type { RuleFunction } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";

/** Enforce arrow function definitions for function components. */
export function functionComponentDefinition(): RuleFunction {
  return (context, { collect, hint }) => {
    const { query, visitor } = collect.components(context, {
      hint: hint.component.Default & ~hint.component.DoNotIncludeFunctionDefinedAsObjectMethod,
    });
    return merge(
      visitor,
      {
        "Program:exit"(program) {
          for (const { node } of query.all(program)) {
            // Guard: must not already be arrow function
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
                    const typeParams = node.typeParameters != null ? src.getText(node.typeParameters) : "";
                    const params = `(${node.params.map((p) => src.getText(p)).join(", ")})`;
                    const returnType = node.returnType != null ? src.getText(node.returnType) : "";
                    const body = src.getText(node.body);

                    if (node.type === "FunctionDeclaration" && node.id != null) {
                      // dprint-ignore
                      return fixer.replaceText(node, `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`);
                    }

                    if (node.type === "FunctionExpression" && node.parent.type === "VariableDeclarator") {
                      // dprint-ignore
                      return fixer.replaceText(node, `${prefix}${typeParams}${params}${returnType} => ${body}`);
                    }

                    if (node.type === "FunctionExpression" && node.parent.type === "Property") {
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
