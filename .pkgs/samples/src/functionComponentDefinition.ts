import { type RuleFix, type RuleFixer, type RuleFunction, merge } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";

type RuleContext = Parameters<RuleFunction>[0];

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
            // Guard: must not already be an arrow function
            if (node.type === "ArrowFunctionExpression") continue;

            context.report({
              message: "Function components must be defined with arrow functions.",
              node,
              suggest: [
                {
                  desc: "Convert to arrow function.",
                  fix: buildFix(context, node),
                },
              ],
            });
          }
        },
      },
    );
  };
}

/**
 * Builds a fix that converts a function component into an arrow function
 * @param context The rule context
 * @param node The component function node
 * @returns A fixer function that applies the conversion, or yields null when the node cannot be converted
 */
function buildFix(context: RuleContext, node: TSESTree.FunctionDeclaration | TSESTree.FunctionExpression) {
  return (fixer: RuleFixer): RuleFix | null => {
    const src = context.sourceCode;
    // Guard: generator functions can't be converted to arrow functions
    if (node.generator) return null;

    const prefix = node.async ? "async " : "";
    const typeParams = node.typeParameters != null ? src.getText(node.typeParameters) : "";
    const params = `(${node.params.map((p) => src.getText(p)).join(", ")})`;
    const returnType = node.returnType != null ? src.getText(node.returnType) : "";
    const body = src.getText(node.body);

    // `function Foo() {}` -> `const Foo = () => {};`
    if (node.type === "FunctionDeclaration" && node.id != null) {
      // dprint-ignore
      return fixer.replaceText(node, `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`);
    }

    // `const Foo = function() {}` -> `const Foo = () => {};`
    if (node.type === "FunctionExpression" && node.parent.type === "VariableDeclarator") {
      // dprint-ignore
      return fixer.replaceText(node, `${prefix}${typeParams}${params}${returnType} => ${body}`);
    }

    // `{ Foo: function() {} }` -> `{ Foo: () => {} }`
    if (node.type === "FunctionExpression" && node.parent.type === "Property") {
      // dprint-ignore
      return fixer.replaceText(node.parent, `${src.getText(node.parent.key)}: ${prefix}${typeParams}${params}${returnType} => ${body}`);
    }

    return null;
  };
}
