import { core, defineConfig } from "tsl";
import {
  noDuplicateExports,
  noDuplicateImports,
  noMultilineTemplateExpressionWithoutAutoDedent,
  nullish,
} from "tsl-dx";

import { glob } from "../../../scripts/lib/glob";

export default defineConfig({
  ignore: [
    ...glob([
      "**/*.d.ts",
      "**/dist/**",
      "**/build/**",
      "src/rules/exhaustive-deps/*.ts",
      "src/rules/rules-of-hooks/*.ts",
    ]),
    ``,
  ],
  rules: [
    ...core.all(),
    core.strictBooleanExpressions({
      allowAny: false,
      allowNullableBoolean: false,
      allowNullableEnum: false,
      allowNullableNumber: false,
      allowNullableObject: false,
      allowNullableString: false,
      allowNumber: true,
      allowString: false,
    }),
    core.noConfusingVoidExpression("off"),
    core.preferOptionalChain("off"),
    core.switchExhaustivenessCheck("off"), // This rule has a issue with `switch (true)` statements
    // core.switchExhaustivenessCheck({
    //   considerDefaultExhaustiveForUnions: true,
    // }),
    nullish({
      runtimeLibrary: "@eslint-react/eff",
    }),
    noDuplicateImports(),
    noDuplicateExports(),
    noMultilineTemplateExpressionWithoutAutoDedent({
      dedentTagImportCallback: (name) => `import ${name} from "dedent";\n`,
      dedentTagNames: ["ts", "tsx", "dedent"],
    }),
  ],
});
