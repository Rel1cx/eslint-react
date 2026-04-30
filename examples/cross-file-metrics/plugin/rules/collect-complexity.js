import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const METRICS_DIR = path.join(process.cwd(), "node_modules", ".tmp", "metrics");

function safeFilename(filename) {
  const hash = crypto.createHash("sha256").update(filename).digest("hex").slice(0, 16);
  const base = path.basename(filename).replace(/[^a-zA-Z0-9]/g, "_");
  return `${base}_${hash}`;
}

function calculateComplexity(node) {
  let complexity = 1;

  const traversers = {
    IfStatement() {
      complexity += 1;
    },
    SwitchCase(n) {
      if (n.test) complexity += 1;
    },
    ConditionalExpression() {
      complexity += 1;
    },
    LogicalExpression(n) {
      if (n.operator === "&&" || n.operator === "||") {
        complexity += 1;
      }
    },
    ForStatement() {
      complexity += 1;
    },
    ForInStatement() {
      complexity += 1;
    },
    ForOfStatement() {
      complexity += 1;
    },
    WhileStatement() {
      complexity += 1;
    },
    DoWhileStatement() {
      complexity += 1;
    },
    CatchClause() {
      complexity += 1;
    },
  };

  // Simple recursive walker (skips parent to avoid cycles)
  const visited = new Set();
  function walk(current) {
    if (!current || typeof current !== "object") return;
    if (visited.has(current)) return;
    visited.add(current);

    const handler = traversers[current.type];
    if (handler) handler(current);

    for (const key of Object.keys(current)) {
      if (key === "parent") continue;
      const child = current[key];
      if (child && typeof child === "object") {
        if (Array.isArray(child)) {
          for (const item of child) {
            walk(item);
          }
        } else {
          walk(child);
        }
      }
    }
  }

  walk(node);
  return complexity;
}

/** @type {import('eslint').Rule.RuleModule} */
const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Collect cyclomatic complexity per file and persist to disk for cross-file aggregation.",
    },
    messages: {},
    schema: [],
  },
  create(context) {
    return {
      "Program:exit"(node) {
        const complexity = calculateComplexity(node);
        const filename = context.filename || context.getFilename();
        const metric = {
          file: filename,
          complexity,
          timestamp: Date.now(),
        };

        fs.mkdirSync(METRICS_DIR, { recursive: true });
        fs.writeFileSync(
          path.join(METRICS_DIR, `${safeFilename(filename)}.json`),
          JSON.stringify(metric, null, 2),
        );
      },
    };
  },
};

export default rule;
