/// <reference types="node" />
import { globSync } from "tinyglobby";
import { type AST, type ReportDescriptor, type Rule, defineConfig, defineRule } from "tsl";
import { noDuplicateExports, noDuplicateImports, noMultilineTemplateExpressionWithoutAutoDedent, noUnsafeAs, nullish } from "tsl-dx";
import ts from "typescript";

// Enforces the layer dependency order documented in docs/rule-implementation-patterns-fact-based.md:
// <rule-name>.ts -> effects.ts -> origins.ts -> collect.ts -> helpers.ts (no cyclic or backward imports).
const factBasedLayerRanks: Record<string, number> = {
  helpers: 0,
  collect: 1,
  origins: 2,
  effects: 3,
};

type FactBasedLayerData = {
  diagnostics: ReportDescriptor[];
  visit: (spec: AST.Expression | undefined | null) => void;
};

const factBasedLayerOrder = defineRule((): Rule<FactBasedLayerData> => ({
  name: "react-x/factBasedLayerOrder",
  createData(context): FactBasedLayerData {
    const diagnostics: ReportDescriptor[] = [];
    const parts = context.sourceFile.fileName.split("/");
    const importerBase = parts.at(-1)?.replace(/\.tsx?$/, "");
    const dir = parts.at(-2);
    const getRank = (base: string) => base === dir ? 4 : factBasedLayerRanks[base];
    const importerRank = importerBase == null ? undefined : getRank(importerBase); // spec/test files are not part of the layering
    return {
      diagnostics,
      visit(spec) {
        if (spec == null) return;
        if (importerRank == null) return;
        if (spec.kind !== ts.SyntaxKind.StringLiteral) return;
        const target = spec.text;
        if (!target.startsWith("./")) return;
        const targetBase = target.slice(2).replace(/\.tsx?$/, "");
        const targetRank = getRank(targetBase);
        if (targetRank == null || targetRank < importerRank) return;
        diagnostics.push({
          node: spec,
          message:
            `Fact-based rule layers depend one way only (<rule-name>.ts -> effects.ts -> origins.ts -> collect.ts -> helpers.ts): '${importerBase}.ts' may not import from '${targetBase}'.`,
        });
      },
    };
  },
  visitor: {
    ImportDeclaration(context, node) {
      context.data.visit(node.moduleSpecifier);
    },
    ExportDeclaration(context, node) {
      context.data.visit(node.moduleSpecifier);
    },
    SourceFile_exit(context) {
      for (const diagnostic of context.data.diagnostics.splice(0)) context.report(diagnostic);
    },
  },
}));

export default defineConfig({
  ignore: [
    ...globSync([
      "**/*.d.ts",
      "**/dist/**",
      "**/build/**",
      "src/rules/exhaustive-deps/*.ts",
      "src/rules/rules-of-hooks/*.ts",
    ], { ignore: ["**/node_modules/**"] }),
  ],
  rules: [
    // core.strictBooleanExpressions({
    //   allowAny: false,
    //   allowNullableBoolean: false,
    //   allowNullableEnum: false,
    //   allowNullableNumber: false,
    //   allowNullableObject: false,
    //   allowNullableString: false,
    //   allowNumber: true,
    //   allowString: false,
    // }),
    // core.noConfusingVoidExpression("off"),
    // core.preferOptionalChain("off"),
    // core.switchExhaustivenessCheck("off"), // This rule has a issue with `switch (true)` statements
    // // core.switchExhaustivenessCheck({
    // //   considerDefaultExhaustiveForUnions: true,
    // // }),
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
  ],
  overrides: [
    {
      files: ["src/rules/"],
      rules: [factBasedLayerOrder()],
    },
  ],
});
