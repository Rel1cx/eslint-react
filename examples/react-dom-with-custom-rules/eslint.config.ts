import eslintReact from "@eslint-react/eslint-plugin";
import eslintReactKit from "@eslint-react/kit";
import eslintJs from "@eslint/js";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

import TSCONFIG_APP from "./tsconfig.app.json" with { type: "json" };
import TSCONFIG_NODE from "./tsconfig.node.json" with { type: "json" };

import {
  checkedRequiresOnchangeOrReadonly,
  componentHookFactories,
  forbidComponentProps,
  // forbidDomProps,
  forbidElements,
  functionComponentDefinition,
  jsxBooleanValue,
  jsxFragments,
  jsxHandlerNames,
  jsxMaxDepth,
  jsxNoBind,
  jsxNoDuplicateProps,
  // jsxNoLiterals,
  jsxPascalCase,
  jsxPropsNoSpreadMulti,
  jsxPropsNoSpreading,
  maxComponentPerFile,
  noAdjacentInlineElements,
  noCircularEffect,
  noMultiComp,
  noUnnecessaryUsePrefix,
  version,
} from "./.config";

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
      eslintPluginReactHooks.configs.flat["recommended-latest"] ?? [],
      eslintPluginReactRefresh.configs.recommended,
      eslintReact.configs["strict-type-checked"],
      {
        ...eslintReactKit()
          .use(checkedRequiresOnchangeOrReadonly)
          .use(componentHookFactories)
          .use(forbidComponentProps, { forbidden: ["className", "style"] })
          // .use(forbidDomProps, { forbidden: ["style", "className"] })
          .use(forbidElements, {
            forbidden: new Map(
              [
                ["button", "Use <Button> from '@/components/ui' instead."],
                ["input", "Use <Input> from '@/components/ui' instead."],
              ],
            ),
          })
          .use(functionComponentDefinition)
          .use(jsxBooleanValue)
          .use(jsxFragments)
          .use(jsxHandlerNames, { eventHandlerPrefix: "handle", eventHandlerPropPrefix: "on" })
          .use(jsxMaxDepth, { max: 4 })
          .use(jsxNoBind)
          .use(jsxNoDuplicateProps)
          // .use(jsxNoLiterals, { noStrings: false })
          .use(jsxPascalCase)
          .use(jsxPropsNoSpreadMulti)
          .use(jsxPropsNoSpreading)
          .use(maxComponentPerFile, { max: 100 })
          .use(noAdjacentInlineElements)
          .use(noCircularEffect)
          .use(noMultiComp)
          .use(noUnnecessaryUsePrefix)
          .use(version, "19")
          .getConfig(),
        files: TSCONFIG_APP.include,
      },
    ],
  },
);
