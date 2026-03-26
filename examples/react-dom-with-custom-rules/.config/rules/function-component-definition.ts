import type { RuleDefinition } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";

/** Enforce arrow function definitions for function components. */
export function functionComponentDefinition(): RuleDefinition {
  return {
    name: "function-component-definition",
    make: (context, { collect }) => {
      const { query, visitor } = collect.components(context);
      return merge(
        visitor,
        {
          "Program:exit"(program) {
            for (const { node } of query.all(program)) {
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

                      // function Foo(params) { ... } -> const Foo = (params) => { ... };
                      if (node.type === "FunctionDeclaration" && node.id) {
                        // dprint-ignore
                        return fixer.replaceText(node, `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`);
                      }

                      // const Foo = function(params) { ... } -> const Foo = (params) => { ... }
                      if (node.type === "FunctionExpression" && node.parent.type === "VariableDeclarator") {
                        // dprint-ignore
                        return fixer.replaceText(node, `${prefix}${typeParams}${params}${returnType} => ${body}`);
                      }

                      // { Foo(params) { ... } } -> { Foo: (params) => { ... } }
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
    },
  };
}
