// @ts-check

import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import { definePlugin, defineRuleListener } from "eslint-plugin-react-custom";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import TSCONFIG_APP from "./tsconfig.app.json" with { type: "json" };
import TSCONFIG_NODE from "./tsconfig.node.json" with { type: "json" };

const GLOB_TS = ["**/*.ts", "**/*.tsx"];

export default defineConfig(
  {
    files: GLOB_TS,
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
    ],
  },
  // base configuration for browser environment source files
  {
    files: TSCONFIG_APP.include,
    extends: [
      tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // base configuration for node environment source files (*.config.ts, etc.)
  {
    files: TSCONFIG_NODE.include,
    ignores: TSCONFIG_NODE.exclude,
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        projectService: false,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-console": "off",
    },
  },
  // react specific configurations
  {
    files: TSCONFIG_APP.include,
    extends: [
      eslintReact.configs["strict-type-checked"],
      eslintPluginReactHooks.configs.flat["recommended-latest"] ?? [],
      eslintPluginReactRefresh.configs.recommended,
    ],
  },
  // custom rules powered by eslint-plugin-react-custom
  {
    files: TSCONFIG_APP.include,
    plugins: {
      "react-custom": definePlugin([
        {
          name: "jsx-boolean-value",
          make: (context) => ({
            JSXAttribute(node) {
              const { value } = node;
              // Skip if the attribute has no value (ex: `<input disabled />`)
              if (value == null) return;
              // Skip if the value is not a JSX expression container (ex: `<input disabled="true" />`)
              if (value.type !== "JSXExpressionContainer") return;
              // Skip if the value is not a literal `true` (ex: `<input disabled={false} />` or `<input disabled={someVar} />`)
              if (value.expression.type !== "Literal" || value.expression.value !== true) return;
              // Report if the value is a literal `true`, and provide a fixer to remove the `={true}` part.
              context.report({
                node,
                message: `Omit the \`={true}\` for boolean attribute '${context.sourceCode.getText(node.name)}'.`,
                fix: (fixer) => fixer.removeRange([node.name.range[1], value.range[1]]),
              });
            },
          }),
        },
        {
          name: "jsx-fragment-syntax",
          make: (context, toolkit) => {
            const { jsxFragmentFactory } = {
              ...toolkit.getJsxConfigFromContext(context),
              ...toolkit.getJsxConfigFromAnnotation(context),
            };
            return {
              JSXFragment(node) {
                context.report({
                  node,
                  message:
                    `Use fragment component instead of fragment syntax (ex: <${jsxFragmentFactory}>...</${jsxFragmentFactory}> instead of <>...</>).`,
                  fix(fixer) {
                    const src = context.sourceCode;
                    const opening = `<${jsxFragmentFactory}>`;
                    const closing = `</${jsxFragmentFactory}>`;
                    return [
                      fixer.replaceText(node.openingFragment, opening),
                      fixer.replaceText(node.closingFragment, closing),
                    ];
                  },
                });
              },
            };
          },
        },
        {
          name: "function-component-definition",
          make: (context, toolkit) => {
            // Customize component detection with ComponentDetectionHint.
            // Here we also treat functions defined on object methods as components,
            // by removing DoNotIncludeFunctionDefinedAsObjectMethod from the default hint.
            const hint = toolkit.DEFAULT_COMPONENT_DETECTION_HINT
              & ~toolkit.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsObjectMethod;

            // Collect all function components detected in the file with the customized hint.
            const { ctx, visitor } = toolkit.useComponentCollector(context, { hint });

            // Merge two or more visitors into a single visitor by using defineRuleListener.
            return defineRuleListener(visitor, {
              "Program:exit"(program) {
                for (const { node } of ctx.getAllComponents(program)) {
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

                          // function Foo(params) { ... } → const Foo = (params) => { ... };
                          if (node.type === "FunctionDeclaration" && node.id) {
                            return fixer.replaceText(
                              node,
                              `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`,
                            );
                          }

                          // { Foo(params) { ... } } → { Foo: (params) => { ... } }
                          if (node.type === "FunctionExpression" && node.parent.type === "Property") {
                            return fixer.replaceText(
                              node.parent,
                              `${
                                src.getText(node.parent.key)
                              }: ${prefix}${typeParams}${params}${returnType} => ${body}`,
                            );
                          }

                          return null;
                        },
                      },
                    ],
                  });
                }
              },
            });
          },
        },
      ]),
    },
    rules: {
      "react-custom/jsx-boolean-value": "warn",
      "react-custom/jsx-fragment-syntax": "warn",
      "react-custom/function-component-definition": "error",
    },
  },
);
