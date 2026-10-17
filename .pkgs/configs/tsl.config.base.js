import { globSync } from "tinyglobby";
import { core, defineConfig, defineRule } from "tsl";
import { noDuplicateExports, noDuplicateImports, noMultilineTemplateExpressionWithoutAutoDedent, noUnsafeAs, nullish } from "tsl-dx";
import * as TextLint from "./textlint.js";
const defaultPatterns = TextLint.loadDefaults();
export const textlint = defineRule(() => ({
    name: "@local/configs/textlint",
    createData() {
        return { patterns: defaultPatterns };
    },
    visitor: {
        SourceFile(context, node) {
            for (const { message, range } of TextLint.lint(node.text, context.data.patterns)) {
                context.report({ message, ...range });
            }
        },
    },
}));
export function buildConfig(cwd) {
    return defineConfig({
        ignore: [
            ...globSync(["**/*.d.ts", "**/dist/**", "**/build/**"], { cwd, ignore: ["**/node_modules/**"] }),
            ".d.ts",
            "/dist/",
            "/build/",
            // The pattern definitions themselves match the patterns
            "textlint.base.json",
        ],
        overrides: [
            {
                files: [".test.ts", ".test.tsx"],
                rules: [
                    noUnsafeAs("off"),
                ],
            },
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
            nullish({
                runtimeLibrary: "@eslint-react/eff",
            }),
            noUnsafeAs(),
            noDuplicateImports(),
            noDuplicateExports(),
            noMultilineTemplateExpressionWithoutAutoDedent({
                dedentTagImportCallback: (name) => `import ${name} from "dedent";\n`,
                dedentTagNames: ["ts", "tsx", "dedent"],
            }),
            textlint(),
        ],
    });
}
