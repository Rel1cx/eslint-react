import { globSync } from "tinyglobby";
import { core, defineConfig } from "tsl";
import { noDuplicateExports, noDuplicateImports, noMultilineTemplateExpressionWithoutAutoDedent, nullish, } from "tsl-dx";
export default defineConfig({
    ignore: [
        ...globSync(["**/*.d.ts", "**/dist/**", "**/build/**"], { ignore: ["**/node_modules/**"] }),
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
