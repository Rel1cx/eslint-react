// TODO: Refactor to use import() instead of fs to read rule metadata directly from modules

// import * as fs from "node:fs";
// import * as path from "node:path";

// const OVERVIEW_PATH = path.join(process.cwd(), "apps/website/content/docs/rules/overview.mdx");

// interface RuleInfo {
//   name: string;
//   hasFixable: boolean;
//   hasSuggestions: boolean;
//   description?: string;
// }

// /**
//  * Get rule metadata from TypeScript file
//  */
// function getRuleMetadata(rulePath: string): RuleInfo | null {
//   const tsPath = rulePath.replace(".mdx", ".ts");
//   if (!fs.existsSync(tsPath)) {
//     return null;
//   }

//   const content = fs.readFileSync(tsPath, "utf8");
//   const name = path.basename(tsPath, ".ts");

//   // Check if rule is fixable - look for fixable: "code" or fixable: 'code'
//   const fixableMatch = /fixable:\s*["']code["']/u.exec(content);
//   const hasFixable = fixableMatch !== null;
//   const hasSuggestions = content.includes("hasSuggestions: true");

//   // Extract description - handle both single and double quotes
//   const descMatch = /description:\s*["']([^"']+)["']/u.exec(content);
//   const description = descMatch?.[1];

//   return {
//     name,
//     hasFixable,
//     hasSuggestions,
//     description,
//   };
// }

// /**
//  * Get all rules with metadata from a package
//  */
// function getRulesWithMetadata(packagePath: string): RuleInfo[] {
//   const rulesDir = path.join(packagePath, "src", "rules");
//   if (!fs.existsSync(rulesDir)) {
//     return [];
//   }
//   const files = fs.readdirSync(rulesDir);
//   return files
//     .filter((f) => f.endsWith(".mdx"))
//     .map((f) => {
//       const filePath = path.join(rulesDir, f);
//       return getRuleMetadata(filePath);
//     })
//     .filter((r): r is RuleInfo => r !== null);
// }

// /**
//  * Get rule metadata from overview.mdx
//  */
// function getRuleFromOverview(ruleName: string, section: string): {
//   hasFixable: boolean;
//   hasCodemod: boolean;
//   isExperimental: boolean;
//   isDebug: boolean;
//   isTypeChecking: boolean;
//   isConfigurable: boolean;
//   rawFeatures: string;
// } | null {
//   const content = fs.readFileSync(OVERVIEW_PATH, "utf8");

//   const lines = content.split("\n");
//   let inSection = false;

//   for (const line of lines) {
//     if (line.startsWith(`## ${section}`)) {
//       inSection = true;
//       continue;
//     }
//     if (inSection && line.startsWith("## ") && line !== `## ${section}`) {
//       break;
//     }
//     if (inSection && line.includes(`[\`${ruleName}\`]`)) {
//       // The line structure: | Rule | ✅ (Severity) | 🌟 (Features) | Description | react-version |
//       const parts = line.split("|").map((p) => p.trim());
//       if (parts.length >= 4) {
//         const features = parts[3]; // Features column is the 4th (index 3)
//         return {
//           hasFixable: features.includes("🔧"),
//           hasCodemod: features.includes("🔄"),
//           isExperimental: features.includes("🧪"),
//           isDebug: features.includes("🐞"),
//           isTypeChecking: features.includes("💭"),
//           isConfigurable: features.includes("⚙️"),
//           rawFeatures: features,
//         };
//       }
//     }
//   }

//   return null;
// }

// /**
//  * Count rules from overview.mdx table
//  */
// function getRulesFromOverview(section: string): string[] {
//   const content = fs.readFileSync(OVERVIEW_PATH, "utf8");

//   const lines = content.split("\n");
//   const rules: string[] = [];
//   let inSection = false;

//   for (const line of lines) {
//     if (line.startsWith(`## ${section}`)) {
//       inSection = true;
//       continue;
//     }
//     if (inSection && line.startsWith("## ") && line !== `## ${section}`) {
//       break;
//     }
//     if (inSection && /^\| \[`([^`]+)`\]/u.test(line)) {
//       const match = /^\| \[`([^`]+)`\]/u.exec(line);
//       if (match?.[1]) {
//         rules.push(match[1]);
//       }
//     }
//   }

//   return rules.sort();
// }

// // Main verification
// const categories = [
//   { name: "X Rules", package: "eslint-plugin-react-x" },
//   { name: "DOM Rules", package: "eslint-plugin-react-dom" },
//   { name: "Web API Rules", package: "eslint-plugin-react-web-api" },
//   { name: "Hooks Extra Rules", package: "eslint-plugin-react-hooks-extra" },
//   { name: "Naming Convention Rules", package: "eslint-plugin-react-naming-convention" },
//   { name: "Debug Rules", package: "eslint-plugin-react-debug" },
// ] as const;

// let hasErrors = false;
// let checkedCount = 0;
// let issueCount = 0;

// console.log("Verifying rules tables in overview.mdx...\n");

// // First, verify that all rules are present
// for (const cat of categories) {
//   const packagePath = path.join(process.cwd(), "packages/plugins", cat.package);
//   const rulesDir = path.join(packagePath, "src", "rules");

//   if (!fs.existsSync(rulesDir)) {
//     continue;
//   }

//   const files = fs.readdirSync(rulesDir);
//   const actualRules = files
//     .filter((f) => f.endsWith(".mdx"))
//     .map((f) => f.replace(".mdx", ""))
//     .sort();

//   const overviewRules = getRulesFromOverview(cat.name);

//   console.log(`=== ${cat.name} ===`);
//   console.log(`Actual rules count: ${actualRules.length}`);
//   console.log(`Overview rules count: ${overviewRules.length}`);

//   // Find missing rules in overview
//   const missingInOverview = actualRules.filter((r) => !overviewRules.includes(r));
//   if (missingInOverview.length > 0) {
//     console.log(`\n❌ Missing in overview.mdx:`);
//     for (const r of missingInOverview) console.log(`  - ${r}`);
//     hasErrors = true;
//     issueCount += missingInOverview.length;
//   }

//   // Find extra rules in overview
//   const extraInOverview = overviewRules.filter((r) => !actualRules.includes(r));
//   if (extraInOverview.length > 0) {
//     console.log(`\n❌ Extra in overview.mdx (not found in package):`);
//     for (const r of extraInOverview) console.log(`  - ${r}`);
//     hasErrors = true;
//     issueCount += extraInOverview.length;
//   }

//   if (missingInOverview.length === 0 && extraInOverview.length === 0) {
//     console.log("✅ All rules are present!");
//   }

//   console.log("");
// }

// // Second, verify metadata for rules (excluding Debug rules)
// console.log("\nVerifying rule metadata...\n");

// let metadataIssueCount = 0;

// for (const cat of categories) {
//   // Skip Debug rules as they don't have the same metadata structure
//   if (cat.name === "Debug Rules") {
//     continue;
//   }

//   const packagePath = path.join(process.cwd(), "packages/plugins", cat.package);
//   const rules = getRulesWithMetadata(packagePath);

//   console.log(`=== ${cat.name} ===`);
//   console.log(`Checking ${rules.length} rules...`);

//   let categoryIssues = 0;

//   for (const rule of rules) {
//     checkedCount++;
//     const overviewData = getRuleFromOverview(rule.name, cat.name);

//     if (!overviewData) {
//       console.log(`⚠️  ${rule.name}: Not found in overview`);
//       continue;
//     }

//     // Check fixable status
//     if (rule.hasFixable && !overviewData.hasFixable && !overviewData.hasCodemod) {
//       console.log(
//         `❌ ${rule.name}: Has fixable in code but missing 🔧 or 🔄 in overview (found: "${overviewData.rawFeatures}")`,
//       );
//       hasErrors = true;
//       categoryIssues++;
//       metadataIssueCount++;
//     }
//   }

//   if (categoryIssues === 0) {
//     console.log("✅ All rules have correct metadata!");
//   }

//   console.log("");
// }

// // Summary
// console.log("=== Summary ===");
// console.log(`Total rules checked for metadata: ${checkedCount}`);
// console.log(`Issues found: ${issueCount + metadataIssueCount}`);

// if (hasErrors) {
//   console.log(`\n❌ Verification failed! There are discrepancies in the overview.mdx file.`);
//   process.exit(1);
// } else {
//   console.log(`\n✅ All rules tables are correct!`);
//   process.exit(0);
// }
