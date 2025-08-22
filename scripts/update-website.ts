import fs from "node:fs";
import path from "node:path";

import { glob } from "./utils/glob";

/**
 * Build script for processing and copying documentation to the website
 *
 * This script:
 * 1. Collects rule documentation from ESLint Plugins
 * 2. Copies them to the website with proper naming
 * 3. Processes the changelog
 * 4. Sets up dependencies for the website build
 */

// Find all rule documentation markdown files from the various plugins
const docs = glob(["packages/plugins/eslint-plugin-react-*/src/rules/*.md"]);

// TODO: Generate the meta.json file as well
// Process each documentation file:
// - Extract plugin name and rule name
// - Format destination path and rule title
// - Build arrays of file paths and rule metadata
const [
  files,
  // rules, // Currently commented out but would contain rule metadata
] = Array.from(docs).reduce<readonly [[string, string][], [string, string][]]>(
  ([files, rules], doc) => {
    const catename = /^packages\/plugins\/eslint-plugin-react-([^/]+)/u.exec(doc)?.[1] ?? "";
    const basename = path.parse(path.basename(doc)).name;

    // Special handling for "react-x" plugin (the core plugin)
    const isPluginX = catename === "x";

    // Format the rule name differently based on which plugin it belongs to
    const name = isPluginX
      ? basename // For react-x plugin: just use the rule name
      : `${catename}-${basename}`; // For other plugins: prefix with category

    // Format the rule title for display purposes
    const title = isPluginX
      ? basename // For react-x plugin: just use the rule name
      : `${catename}/${basename}`; // For other plugins: use category/rule format

    // Define destination path in the website content directory
    const dest = path.join("apps", "website", "content", "docs", "rules", `${name}.mdx`);

    // Add to our accumulator arrays
    return [[...files, [doc, dest]], [...rules, [name, title]]] as const;
  },
  [[], []],
);

// Copy all documentation files to their respective destinations in parallel
files.map(([src, dest]) => fs.copyFileSync(src, dest));

// Write rule metadata to a JSON file for the website
// fs.writeFileSync(path.join("apps", "website", "content", "docs", "rules", "data.json"), JSON.stringify(rules, null, 2));

// Process the changelog file by adding frontmatter for the documentation system
const changelog = [
  "---",
  "title: Changelog",
  "---",
  "",
  fs.readFileSync("CHANGELOG.md", "utf-8"),
].join("\n");

// Write the processed changelog to the website content directory
fs.writeFileSync(path.join("apps", "website", "content", "docs", "changelog.md"), changelog);
