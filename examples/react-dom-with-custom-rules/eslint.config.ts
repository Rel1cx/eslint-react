import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig as defineReactConfig, merge } from "@eslint-react/kit";
import eslintJs from "@eslint/js";
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
  // custom rules powered by @eslint-react/kit
  {
    files: TSCONFIG_APP.include,
    extends: [
      defineReactConfig(
        // Components: Enforce arrow function definitions
        {
          name: "function-component-definition",
          make: (ctx, kit) => {
            // Customize component detection with hint flags.
            // Also treat functions defined on object methods as components,
            // by removing DoNotIncludeFunctionDefinedAsObjectMethod from the default hint.
            const hint = kit.hint.defaultComponent
              & ~kit.hint.component.DoNotIncludeFunctionDefinedAsObjectMethod;

            // Create a collector with the customized hint.
            const { query, visitor } = kit.collect.components(ctx, { hint });

            // Merge the collector's visitor with inspection logic.
            return merge(
              visitor,
              {
                "Program:exit"(program) {
                  for (const { node } of query.all(program)) {
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

                            // function Foo(params) { ... } -> const Foo = (params) => { ... };
                            if (node.type === "FunctionDeclaration" && node.id) {
                              // dprint-ignore
                              return fixer.replaceText(node, `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`);
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
        },
        // Hooks: Warn on custom hooks with no hook calls
        {
          name: "no-unnecessary-use-prefix",
          make: (ctx, kit) => {
            const { query, visitor } = kit.collect.hooks(ctx);

            return merge(visitor, {
              "Program:exit"(program) {
                for (const hook of query.all(program)) {
                  if (hook.hookCalls.length === 0) {
                    ctx.report({
                      node: hook.node,
                      message:
                        `Custom hook "${hook.name}" doesn't call any hooks. A custom hook should use at least one hook, otherwise it's just a regular function.`,
                    });
                  }
                }
              },
            });
          },
        },
        // Multiple Collectors: No component/hook factories
        {
          name: "component-hook-factories",
          make: (ctx, kit) => {
            const fc = kit.collect.components(ctx);
            const hk = kit.collect.hooks(ctx);

            return merge(fc.visitor, hk.visitor, {
              "Program:exit"(program) {
                for (const { kind, name, node } of [...fc.query.all(program), ...hk.query.all(program)]) {
                  if (name == null) continue;
                  if (kit.find.parent(node, kit.is.function) == null) continue;
                  ctx.report({
                    node,
                    message: `Don't define ${kind} "${name}" inside a function. Move it to the module level.`,
                  });
                }
              },
            });
          },
        },
      ),
    ],
  },
);
