import plugin from "@eslint-react/eslint-plugin";
import { ESLint } from "eslint";
import fs from "node:fs";
import path from "node:path";
import { globSync } from "tinyglobby";

const fixturesDir =
  "test/fixtures/react-19.2.5/compiler/packages/babel-plugin-react-compiler/src/__tests__/fixtures/compiler";
const outputPath = "test/snapshots/react-compiler-fixtures-all-preset.jsonl";

async function main() {
  const files = globSync(["**/*.{js,jsx,ts,tsx}"], {
    cwd: fixturesDir,
    absolute: false,
  }).sort();

  console.log(`Found ${files.length} files to lint`);

  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      plugin.configs.all,
    ],
    cwd: process.cwd(),
  });

  const results = await eslint.lintFiles(files.map((f) => path.join(fixturesDir, f)));

  const lines: string[] = [];

  for (const result of results) {
    const relativePath = path.relative(fixturesDir, result.filePath);
    const record = {
      file: relativePath,
      messages: result.messages.map((msg) => ({
        ruleId: msg.ruleId,
        severity: msg.severity,
        message: msg.message,
        line: msg.line,
        column: msg.column,
        endLine: msg.endLine,
        endColumn: msg.endColumn,
      })),
    };
    lines.push(JSON.stringify(record));
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, lines.join("\n") + "\n");

  const totalErrors = results.reduce((sum, r) => sum + r.errorCount, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warningCount, 0);
  console.log(`Snapshot saved to ${outputPath}`);
  console.log(`Total files: ${files.length}`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Total warnings: ${totalWarnings}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
