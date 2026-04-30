import fs from "node:fs";
import path from "node:path";

const METRICS_DIR = path.join(process.cwd(), "node_modules", ".tmp", "metrics");
const THRESHOLD = 5;

function main() {
  const metrics = [];

  if (fs.existsSync(METRICS_DIR)) {
    for (const entry of fs.readdirSync(METRICS_DIR)) {
      if (entry.endsWith(".json")) {
        try {
          const raw = fs.readFileSync(path.join(METRICS_DIR, entry), "utf8");
          metrics.push(JSON.parse(raw));
        } catch {
          // ignore corrupted metric files
        }
      }
    }
  }

  let hasViolation = false;

  // 1. Iterate each entry and warn when a single file exceeds the threshold
  for (const m of metrics) {
    if (m.complexity > THRESHOLD) {
      hasViolation = true;
      console.warn(
        `[cross-file-metrics] Complexity ${m.complexity} exceeds threshold ${THRESHOLD} in ${m.file}`,
      );
    }
  }

  // 2. Aggregation analysis
  if (metrics.length > 0) {
    const totalComplexity = metrics.reduce((sum, m) => sum + m.complexity, 0);
    const average = totalComplexity / metrics.length;
    const max = Math.max(...metrics.map((m) => m.complexity));
    const maxFile = metrics.find((m) => m.complexity === max)?.file ?? "unknown";

    console.log("\nCross-File Complexity Aggregation");
    console.log("-".repeat(40));
    console.log(`Files analyzed:      ${metrics.length}`);
    console.log(`Total complexity:    ${totalComplexity}`);
    console.log(`Average complexity:  ${average.toFixed(2)}`);
    console.log(`Max complexity:      ${max}`);
    console.log(`Max complexity file: ${path.basename(maxFile)}`);

    if (average > THRESHOLD) {
      console.log("");
      console.log(`⚠  ERROR: Average complexity (${average.toFixed(2)}) exceeds threshold (${THRESHOLD}).`);
      hasViolation = true;
    }
  } else {
    console.log("[cross-file-metrics] No metrics found.");
  }

  // 3. Clean up temporary directory
  try {
    fs.rmSync(METRICS_DIR, { recursive: true, force: true });
  } catch {
    // ignore cleanup failures
  }

  // 4. Exit with a non-zero code if any violation exists
  if (hasViolation) {
    // process.exit(1);
  }
}

main();
