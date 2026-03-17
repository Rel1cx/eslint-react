import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import { definePlugin, defineRuleListener } from "eslint-plugin-react-kit";
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
  // custom rules powered by eslint-plugin-react-kit
  {
    files: TSCONFIG_APP.include,
    plugins: {
      local: definePlugin(
        // Function Component Definition - Enforce arrow functions for components
        {
          name: "function-component-definition",
          make: (ctx, kit) => {
            // Customize component detection with ComponentDetectionHint.
            // Here we also treat functions defined on object methods as components,
            // by removing DoNotIncludeFunctionDefinedAsObjectMethod from the default hint.
            const hint = kit.DEFAULT_COMPONENT_DETECTION_HINT
              & ~kit.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsObjectMethod;

            // Collect all function components detected in the file with the customized hint.
            const { api, visitor } = kit.getComponentCollector(ctx, { hint });

            // Merge two or more visitors into a single visitor by using defineRuleListener.
            return defineRuleListener(
              visitor,
              {
                "Program:exit"(program) {
                  for (const { node } of api.getAllComponents(program)) {
                    if (node.type === "ArrowFunctionExpression") continue;
                    ctx.report({
                      node,
                      message: "Function components must be defined with arrow functions.",
                      suggest: [
                        {
                          desc: "Convert to arrow function.",
                          fix(fixer) {
                            const src = ctx.sourceCode;
                            if (node.generator) return null;
                            const prefix = node.async ? "async " : "";
                            const typeParams = node.typeParameters ? src.getText(node.typeParameters) : "";
                            const params = `(${node.params.map((p) => src.getText(p)).join(", ")})`;
                            const returnType = node.returnType ? src.getText(node.returnType) : "";
                            const body = src.getText(node.body);

                            // function Foo(params) { ... } → const Foo = (params) => { ... };
                            if (node.type === "FunctionDeclaration" && node.id) {
                              // dprint-ignore
                              return fixer.replaceText(node, `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`);
                            }

                            // { Foo(params) { ... } } → { Foo: (params) => { ... } }
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
        },
      ),
    },
    rules: {
      "local/function-component-definition": "error",
    },
  },
);
