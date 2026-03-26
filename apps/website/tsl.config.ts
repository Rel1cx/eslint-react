import { core, defineConfig } from "tsl";
import {
  noDuplicateExports,
  noDuplicateImports,
  noMultilineTemplateExpressionWithoutAutoDedent,
  nullish,
} from "tsl-dx";

export default defineConfig({
  rules: [
    ...core.all(),
    core.dotNotation("off"),
    core.noConfusingVoidExpression("off"),
    core.noRedundantTypeConstituents("off"),
    core.preferOptionalChain("off"),
    core.strictBooleanExpressions("off"),
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
